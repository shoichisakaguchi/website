export type JournalClubTimezoneOption = {
    value: string;
    label: string;
};

// Fixed display/order for Journal Club timezones (North America -> Europe -> Asia -> Oceania)
export const JOURNAL_CLUB_TIMEZONES: JournalClubTimezoneOption[] = [
    { value: 'America/Los_Angeles', label: 'Pacific Time (San Francisco)' },
    { value: 'America/Toronto', label: 'Eastern Time (Toronto)' },
    { value: 'Europe/London', label: 'UK Time (London)' },
    { value: 'Europe/Paris', label: 'Central European (Paris)' },
    { value: 'Europe/Vilnius', label: 'Eastern European (Vilnius)' },
    { value: 'Asia/Tokyo', label: 'Japan (Tokyo)' },
    { value: 'Australia/Sydney', label: 'Australian Eastern (Sydney)' },
];

// Legacy values kept for backward compatibility (do not show in public display)
export const JOURNAL_CLUB_TIMEZONES_LEGACY: JournalClubTimezoneOption[] = [
    { value: 'America/Santiago', label: 'Legacy: Chile (Santiago)' },
    { value: 'UTC', label: 'Legacy: UTC' },
];

export const JOURNAL_CLUB_TIMEZONE_OPTIONS = JOURNAL_CLUB_TIMEZONES;
export const JOURNAL_CLUB_TIMEZONE_OPTIONS_WITH_LEGACY = [
    ...JOURNAL_CLUB_TIMEZONES,
    ...JOURNAL_CLUB_TIMEZONES_LEGACY,
];

export const JOURNAL_CLUB_TIMEZONE_DISPLAY = JOURNAL_CLUB_TIMEZONES.map((tz) => ({
    name: tz.value,
    label: tz.label,
}));
