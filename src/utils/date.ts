/**
 * Format a date as "Jan 15, 2026"
 */
export function formatDate(date: Date): string {
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });
}

/**
 * Format a summit's date range: "May 11-12, 2025", or "Feb 28 - Mar 2, 2027"
 * when it crosses a month.
 *
 * Dates come from `z.coerce.date()` on a plain YYYY-MM-DD string, so they are
 * UTC midnight. Read them with the UTC getters: any negative local offset
 * would otherwise render the day before.
 */
export function formatDateRange(start: Date, end?: Date): string {
    const month = (d: Date) =>
        d.toLocaleDateString('en-US', { month: 'short', timeZone: 'UTC' });
    const day = (d: Date) => d.getUTCDate();
    const year = (d: Date) => d.getUTCFullYear();

    if (!end || start.getTime() === end.getTime()) {
        return `${month(start)} ${day(start)}, ${year(start)}`;
    }
    if (year(start) === year(end) && month(start) === month(end)) {
        return `${month(start)} ${day(start)}-${day(end)}, ${year(start)}`;
    }
    if (year(start) === year(end)) {
        return `${month(start)} ${day(start)} - ${month(end)} ${day(end)}, ${year(start)}`;
    }
    return `${month(start)} ${day(start)}, ${year(start)} - ${month(end)} ${day(end)}, ${year(end)}`;
}
