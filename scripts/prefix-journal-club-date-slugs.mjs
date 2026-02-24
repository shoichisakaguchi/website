#!/usr/bin/env node

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const journalClubDir = path.join(__dirname, "../src/content/journal-club");

const DATE_PREFIX_RE = /^\d{4}-\d{2}-\d{2}-(.+)$/;
const FRONTMATTER_RE = /^---\n([\s\S]*?)\n---(?:\n|$)/;
const DATE_LINE_RE = /^date:\s*([0-9]{4}-[0-9]{2}-[0-9]{2})\s*$/m;

function getMode() {
    if (process.argv.includes("--apply")) return "apply";
    return "check";
}

function getBaseSlug(stem) {
    const match = stem.match(DATE_PREFIX_RE);
    return match ? match[1] : stem;
}

function hasDatePrefix(stem) {
    return DATE_PREFIX_RE.test(stem);
}

function getDateFromFrontmatter(content) {
    const frontmatterMatch = content.match(FRONTMATTER_RE);
    if (!frontmatterMatch) return null;
    const dateMatch = frontmatterMatch[1].match(DATE_LINE_RE);
    return dateMatch ? dateMatch[1] : null;
}

async function main() {
    const mode = getMode();
    const entries = await fs.readdir(journalClubDir, { withFileTypes: true });
    const files = entries
        .filter((entry) => entry.isFile() && entry.name.endsWith(".mdoc"))
        .map((entry) => entry.name)
        .sort();

    const plannedRenames = [];
    const skipped = [];
    const errors = [];

    for (const file of files) {
        const currentPath = path.join(journalClubDir, file);
        const content = await fs.readFile(currentPath, "utf8");
        const date = getDateFromFrontmatter(content);

        if (!date) {
            skipped.push(`${file} (missing date in frontmatter)`);
            continue;
        }

        const stem = file.slice(0, -".mdoc".length);

        // Keep existing prefixed slugs stable to avoid URL churn.
        if (hasDatePrefix(stem)) {
            continue;
        }

        const baseSlug = getBaseSlug(stem);
        const targetFile = `${date}-${baseSlug}.mdoc`;

        if (targetFile === file) continue;

        const targetPath = path.join(journalClubDir, targetFile);
        try {
            await fs.access(targetPath);
            errors.push(`${file} -> ${targetFile} (target already exists)`);
            continue;
        } catch {
            // target does not exist, rename is safe
        }

        plannedRenames.push({ from: file, to: targetFile });
    }

    if (plannedRenames.length > 0) {
        console.log(`${mode === "apply" ? "Applying" : "Planned"} renames:`);
        for (const rename of plannedRenames) {
            console.log(`  ${rename.from} -> ${rename.to}`);
        }
    } else {
        console.log("No slug renames needed.");
    }

    if (skipped.length > 0) {
        console.log("\nSkipped:");
        for (const line of skipped) {
            console.log(`  ${line}`);
        }
    }

    if (errors.length > 0) {
        console.error("\nErrors:");
        for (const line of errors) {
            console.error(`  ${line}`);
        }
    }

    if (mode === "apply" && plannedRenames.length > 0) {
        for (const rename of plannedRenames) {
            await fs.rename(
                path.join(journalClubDir, rename.from),
                path.join(journalClubDir, rename.to),
            );
        }
        console.log(`\nRenamed ${plannedRenames.length} file(s).`);
    }

    if (errors.length > 0) {
        process.exitCode = 1;
        return;
    }

    if (mode === "check" && plannedRenames.length > 0) {
        process.exitCode = 1;
    }
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
