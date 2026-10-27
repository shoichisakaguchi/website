/**
 * What a visitor reads for a summit's phase.
 *
 * The phase names are editorial states (Keystatic labels the field "Phase
 * (Editor Only)"). "Preview" in particular reads as "draft" to someone who
 * does not know that, when it actually means the dates are announced.
 */
const PHASE_LABELS: Record<string, string> = {
    Preview: 'Upcoming',
};

export function phaseLabel(phase: string): string {
    return PHASE_LABELS[phase] ?? phase;
}
