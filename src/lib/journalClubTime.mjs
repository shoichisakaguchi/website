/**
 * Single source of truth for Journal Club event timing.
 *
 * Three places need to agree on when an event starts and ends: the homepage
 * "Next Meeting" card, the event detail page, and the scheduled rebuild
 * trigger. They used to carry three copies of the conversion, and two of them
 * used a technique whose result depended on the timezone of the machine
 * running the build:
 *
 *     new Date(`${dateStr}T${timeStr}:00`)   // parsed in the HOST's timezone
 *
 * That happens to give the right answer for most inputs, but it diverges
 * around daylight-saving transitions, and the divergence changes with the host
 * timezone — so a local `npm run dev` on a JST machine could show a different
 * time than the UTC production build for the same entry.
 *
 * This module resolves the wall-clock time in the event's own timezone via
 * Intl.DateTimeFormat, which does not consult the host timezone at all.
 *
 * Plain .mjs (not .ts) so the Node script under scripts/ can import it
 * directly, the same file the Astro pages use.
 */

/** Fallback event length, in minutes, when an entry does not set one. */
export const DEFAULT_DURATION_MINUTES = 60;

/**
 * Offset in ms between wall-clock time in `tz` and UTC at the given instant.
 * @param {number} utcMs
 * @param {string} tz IANA timezone name
 * @returns {number}
 */
export function tzOffsetMs(utcMs, tz) {
    const parts = Object.fromEntries(
        new Intl.DateTimeFormat("en-US", {
            timeZone: tz,
            hour12: false,
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        })
            .formatToParts(new Date(utcMs))
            .map((p) => [p.type, p.value]),
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

/**
 * Interpret `${dateStr}T${timeStr}` as wall-clock time in `tz` and return the
 * corresponding UTC instant. Independent of the host timezone.
 *
 * @param {string} dateStr "YYYY-MM-DD"
 * @param {string} timeStr "HH:mm"
 * @param {string} tz IANA timezone name
 * @returns {Date}
 */
export function zonedWallTimeToUtc(dateStr, timeStr, tz) {
    const [y, mo, d] = dateStr.split("-").map(Number);
    const [h, mi] = timeStr.split(":").map(Number);
    const guess = Date.UTC(y, mo - 1, d, h, mi, 0);
    // One refinement pass is correct away from transitions; inside a DST gap or
    // overlap it lands on the offset in effect at `guess`, deterministically.
    return new Date(guess - tzOffsetMs(guess, tz));
}

/**
 * @typedef {Object} EventTimeInput
 * @property {string} [startDateTimeUtc] Explicit UTC instant (wins if present).
 * @property {Date|string} [localDate] Event date in its own timezone.
 * @property {string} [localTime] "HH:mm" in its own timezone.
 * @property {string} [eventTz] IANA timezone, defaults to Asia/Tokyo.
 * @property {Date|string} [date] Date-only fallback.
 * @property {number} [durationMinutes] Event length, defaults to 60.
 */

/**
 * @typedef {Object} EventTimes
 * @property {Date} start
 * @property {Date} end
 * @property {boolean} hasTime False when only a date was available.
 */

/** @param {Date|string|undefined} v @returns {string|null} "YYYY-MM-DD" */
function toDateStr(v) {
    if (!v) return null;
    if (v instanceof Date) return v.toISOString().split("T")[0];
    const s = String(v).trim();
    return s ? s.split("T")[0] : null;
}

/**
 * Resolve an entry's start and end instants. Returns null when the entry
 * carries no usable date at all.
 *
 * @param {EventTimeInput} data
 * @returns {EventTimes|null}
 */
export function resolveEventTimes(data) {
    const rawDuration = Number(data.durationMinutes);
    const durationMs =
        (Number.isFinite(rawDuration) && rawDuration > 0
            ? rawDuration
            : DEFAULT_DURATION_MINUTES) *
        60 *
        1000;

    const explicitUtc =
        typeof data.startDateTimeUtc === "string" && data.startDateTimeUtc.trim()
            ? data.startDateTimeUtc.trim()
            : null;
    if (explicitUtc) {
        const start = new Date(explicitUtc);
        if (!Number.isNaN(start.getTime())) {
            return { start, end: new Date(start.getTime() + durationMs), hasTime: true };
        }
    }

    const localDateStr = toDateStr(data.localDate);
    const localTime = typeof data.localTime === "string" ? data.localTime.trim() : "";
    if (localDateStr && localTime) {
        const start = zonedWallTimeToUtc(
            localDateStr,
            localTime,
            data.eventTz || "Asia/Tokyo",
        );
        if (!Number.isNaN(start.getTime())) {
            return { start, end: new Date(start.getTime() + durationMs), hasTime: true };
        }
    }

    // Date-only fallback: the whole UTC day counts as the event window.
    const dateStr = toDateStr(data.date);
    if (dateStr) {
        const start = new Date(`${dateStr}T00:00:00.000Z`);
        if (!Number.isNaN(start.getTime())) {
            return {
                start,
                end: new Date(`${dateStr}T23:59:59.999Z`),
                hasTime: false,
            };
        }
    }

    return null;
}
