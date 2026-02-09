export type SortableCollection = "posts" | "journal-club" | "summits";

const FALLBACK_DATE = new Date("1970-01-01T00:00:00Z");

function toValidDate(value: unknown): Date | null {
    if (value instanceof Date && !Number.isNaN(value.valueOf())) {
        return value;
    }
    if (typeof value === "string") {
        const trimmed = value.trim();
        if (!trimmed) return null;
        const parsed = new Date(trimmed);
        if (!Number.isNaN(parsed.valueOf())) {
            return parsed;
        }
    }
    return null;
}

function yearToDate(year: unknown): Date | null {
    if (typeof year !== "string") return null;
    const match = year.match(/(\d{4})/);
    if (!match) return null;
    const parsed = new Date(`${match[1]}-01-01T00:00:00Z`);
    return Number.isNaN(parsed.valueOf()) ? null : parsed;
}

export function getSortDate(collection: SortableCollection, data: Record<string, unknown>): Date {
    switch (collection) {
        case "posts":
            return toValidDate(data.publishedDate) || FALLBACK_DATE;
        case "journal-club":
            return (
                toValidDate(data.startDateTimeUtc) ||
                toValidDate(data.localDate) ||
                toValidDate(data.date) ||
                FALLBACK_DATE
            );
        case "summits":
            return (
                toValidDate(data.startDate) ||
                toValidDate(data.endDate) ||
                yearToDate(data.year) ||
                FALLBACK_DATE
            );
        default:
            return FALLBACK_DATE;
    }
}

export function sortEntriesByDateDesc<T extends { data: Record<string, unknown> }>(
    entries: T[],
    collection: SortableCollection,
): T[] {
    return entries
        .map((entry, index) => ({
            entry,
            index,
            sortDate: getSortDate(collection, entry.data),
        }))
        .sort((a, b) => {
            const diff = b.sortDate.valueOf() - a.sortDate.valueOf();
            return diff !== 0 ? diff : a.index - b.index;
        })
        .map(({ entry }) => entry);
}
