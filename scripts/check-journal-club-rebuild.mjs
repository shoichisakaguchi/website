#!/usr/bin/env node

/**
 * Scheduled rebuild trigger for the homepage "Next Meeting" card.
 *
 * The homepage is prerendered, so its `now` is frozen at build time. When a
 * Journal Club event ends in real time, the live site does not update until a
 * new build runs. Normal content edits trigger a build via GitHub push, but the
 * "event just ended" moment has no commit, so nothing rebuilds.
 *
 * This script is meant to run on a schedule (every ~15 min) on an always-on
 * machine. Each run it checks whether any event's end time fell within the
 * window since the last run; if so it POSTs the Cloudflare Deploy Hook to
 * rebuild the current `main` with no commit (history stays clean).
 *
 * End time = start + durationMinutes (default 60). The same durationMinutes is
 * read by src/components/JournalClubHome.astro, so the trigger and the site
 * agree on when an event becomes "past".
 *
 * Env:
 *   RDRP_DEPLOY_HOOK_URL  Cloudflare Pages Deploy Hook URL (required to fire).
 *   RDRP_JC_STATE_FILE    Path to last-check timestamp file
 *                         (default: ~/.cache/rdrp-jc-rebuild/last-check).
 *
 * Flags:
 *   --pull      git pull --rebase before reading content (use in the scheduler).
 *   --dry-run   Do everything except POST and state write; print the decision.
 *   --list      Print every event's computed start/end (UTC) and status; exit.
 *   --help
 */

import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.join(__dirname, "..");
const journalClubDir = path.join(repoRoot, "src/content/journal-club");

const DEFAULT_DURATION_MINUTES = 60;

const args = new Set(process.argv.slice(2));
const flags = {
    pull: args.has("--pull"),
    dryRun: args.has("--dry-run"),
    list: args.has("--list"),
    help: args.has("--help") || args.has("-h"),
};

const stateFile =
    process.env.RDRP_JC_STATE_FILE ||
    path.join(os.homedir(), ".cache", "rdrp-jc-rebuild", "last-check");
const deployHookUrl = process.env.RDRP_DEPLOY_HOOK_URL || "";

// --- Frontmatter parsing (regex, matching repo convention) ----------------

const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---(?:\n|$)/;

function field(fm, key) {
    const lines = fm.split("\n");
    const idx = lines.findIndex((l) => new RegExp(`^${key}:\\s*`).test(l));
    if (idx === -1) return null;
    const raw = lines[idx].replace(new RegExp(`^${key}:\\s*`), "").trim();

    // Block scalar (| or >, with optional chomping): value is on indented lines.
    if (/^[|>][-+]?$/.test(raw)) {
        const collected = [];
        for (let i = idx + 1; i < lines.length; i++) {
            if (/^\s+\S/.test(lines[i])) collected.push(lines[i].trim());
            else if (lines[i].trim() === "") collected.push("");
            else break;
        }
        return collected.join(" ").trim() || null;
    }

    // Strip surrounding single/double quotes if present.
    return raw.replace(/^['"]|['"]$/g, "").trim() || null;
}

// --- Timezone-aware wall time -> UTC --------------------------------------

// Offset (ms) between wall-clock time in `tz` and UTC at the given instant.
function tzOffsetMs(utcMs, tz) {
    const dtf = new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        hour12: false,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
    });
    const parts = Object.fromEntries(
        dtf.formatToParts(new Date(utcMs)).map((p) => [p.type, p.value]),
    );
    let hour = Number(parts.hour);
    if (hour === 24) hour = 0; // some engines emit 24 for midnight
    const asUtc = Date.UTC(
        Number(parts.year),
        Number(parts.month) - 1,
        Number(parts.day),
        hour,
        Number(parts.minute),
        Number(parts.second),
    );
    return asUtc - utcMs;
}

// Interpret `${dateStr}T${timeStr}` as wall-clock time in `tz`; return UTC Date.
function zonedWallTimeToUtc(dateStr, timeStr, tz) {
    const [y, mo, d] = dateStr.split("-").map(Number);
    const [h, mi] = timeStr.split(":").map(Number);
    const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
    // One refinement pass handles DST/offset correctly away from transitions.
    const offset = tzOffsetMs(guess, tz);
    return new Date(guess - offset);
}

// --- Build event list with start/end instants -----------------------------

async function loadEvents() {
    const entries = await fs.readdir(journalClubDir, { withFileTypes: true });
    const files = entries
        .filter((e) => e.isFile() && e.name.endsWith(".mdoc"))
        .map((e) => e.name)
        .sort();

    const events = [];
    for (const file of files) {
        const content = await fs.readFile(path.join(journalClubDir, file), "utf8");
        const fmMatch = content.match(FRONTMATTER_RE);
        if (!fmMatch) continue;
        const fm = fmMatch[1];

        const title = field(fm, "title") || file;
        const date = field(fm, "date");
        const localDate = field(fm, "localDate");
        const localTime = field(fm, "localTime");
        const eventTz = field(fm, "eventTz") || "Asia/Tokyo";
        const startUtcRaw = field(fm, "startDateTimeUtc");
        const durRaw = field(fm, "durationMinutes");
        const durationMinutes = durRaw ? Number(durRaw) : DEFAULT_DURATION_MINUTES;
        const durationMs =
            (Number.isFinite(durationMinutes) ? durationMinutes : DEFAULT_DURATION_MINUTES) *
            60 *
            1000;

        let start = null;
        let end = null;
        let hasTime = false;

        if (startUtcRaw) {
            start = new Date(startUtcRaw);
            end = new Date(start.getTime() + durationMs);
            hasTime = true;
        } else if (localDate && localTime) {
            start = zonedWallTimeToUtc(localDate, localTime, eventTz);
            end = new Date(start.getTime() + durationMs);
            hasTime = true;
        } else if (date) {
            // Date-only fallback: start of day -> end of day (UTC), matching the site.
            start = new Date(`${date}T00:00:00.000Z`);
            end = new Date(`${date}T23:59:59.999Z`);
            hasTime = false;
        } else {
            continue;
        }

        if (!start || Number.isNaN(start.getTime())) continue;
        events.push({ file, title, start, end, hasTime, durationMinutes });
    }
    return events;
}

// --- State (last-check timestamp) -----------------------------------------

async function readLastCheck() {
    try {
        const raw = (await fs.readFile(stateFile, "utf8")).trim();
        const t = new Date(raw);
        return Number.isNaN(t.getTime()) ? null : t;
    } catch {
        return null;
    }
}

async function writeLastCheck(when) {
    await fs.mkdir(path.dirname(stateFile), { recursive: true });
    await fs.writeFile(stateFile, when.toISOString() + "\n", "utf8");
}

// --- Deploy hook ----------------------------------------------------------

async function fireDeployHook() {
    const res = await fetch(deployHookUrl, { method: "POST" });
    if (!res.ok) {
        throw new Error(`Deploy hook returned HTTP ${res.status} ${res.statusText}`);
    }
}

// --- Main -----------------------------------------------------------------

function help() {
    console.log(
        `Usage: node scripts/check-journal-club-rebuild.mjs [--pull] [--dry-run] [--list]\n\n` +
            `  --pull     git pull --rebase before reading content\n` +
            `  --dry-run  decide but do not POST the deploy hook or write state\n` +
            `  --list     print all events (UTC start/end + status) and exit\n\n` +
            `Env: RDRP_DEPLOY_HOOK_URL (required to fire), RDRP_JC_STATE_FILE\n`,
    );
}

async function main() {
    if (flags.help) {
        help();
        return;
    }

    if (flags.pull) {
        try {
            execFileSync("git", ["-C", repoRoot, "pull", "--rebase", "--quiet"], {
                stdio: "inherit",
            });
        } catch (e) {
            console.error("git pull failed:", e.message);
            process.exitCode = 1;
            return;
        }
    }

    const now = new Date();
    const events = await loadEvents();

    if (flags.list) {
        const sorted = [...events].sort((a, b) => a.start - b.start);
        for (const ev of sorted) {
            const status =
                now < ev.start ? "upcoming" : now < ev.end ? "live" : "past";
            console.log(
                `${status.padEnd(8)} start=${ev.start.toISOString()} end=${ev.end.toISOString()} ` +
                    `dur=${ev.durationMinutes}m  ${ev.title}`,
            );
        }
        console.log(`\nnow=${now.toISOString()}`);
        return;
    }

    const lastCheck = await readLastCheck();

    // First run: record now and do not fire (avoid rebuilding for past events).
    if (!lastCheck) {
        if (!flags.dryRun) await writeLastCheck(now);
        console.log(
            `Initialized state at ${now.toISOString()} (no rebuild on first run).`,
        );
        return;
    }

    // Events whose end fell within (lastCheck, now] just transitioned to past.
    const justEnded = events.filter(
        (ev) => ev.end > lastCheck && ev.end <= now,
    );

    if (justEnded.length === 0) {
        if (!flags.dryRun) await writeLastCheck(now);
        console.log(
            `No event ended since ${lastCheck.toISOString()}. No rebuild. (now=${now.toISOString()})`,
        );
        return;
    }

    console.log(`Event(s) ended since ${lastCheck.toISOString()}:`);
    for (const ev of justEnded) {
        console.log(`  - ${ev.title} (ended ${ev.end.toISOString()})`);
    }

    if (flags.dryRun) {
        console.log(
            deployHookUrl
                ? "[dry-run] Would POST the deploy hook and advance state."
                : "[dry-run] Would POST the deploy hook, but RDRP_DEPLOY_HOOK_URL is unset.",
        );
        return;
    }

    if (!deployHookUrl) {
        console.error(
            "An event ended but RDRP_DEPLOY_HOOK_URL is unset; not firing. State not advanced (will retry).",
        );
        process.exitCode = 1;
        return;
    }

    try {
        await fireDeployHook();
        await writeLastCheck(now);
        console.log("Deploy hook fired; rebuild triggered. State advanced.");
    } catch (e) {
        // Leave state unchanged so the next run retries.
        console.error("Deploy hook failed:", e.message);
        console.error("State not advanced; will retry on next run.");
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
