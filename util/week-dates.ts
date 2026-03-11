import { format, parseISO, startOfWeek, subWeeks } from "date-fns";

/**
 * A week range with display label and ISO weekStartDate for API calls.
 */
export interface WeekRange {
  /** Human-readable label, e.g. "Feb 23 - Mar 1, 2026" */
  label: string;
  /** ISO date string for API weekStartDate param, e.g. "2026-02-23" */
  weekStartDate: string;
}

/**
 * Generate the last N weekly ranges ending at the most recent Sunday.
 * Weeks run Sunday→Saturday.
 *
 * @param count Number of week ranges to generate (default: 6)
 * @returns Array of WeekRange objects, most recent first
 */
export function getWeekRanges(count: number = 6): WeekRange[] {
  // Most recent Monday (start of current week, week starts on Monday)
  const now = new Date();
  const latestMonday = startOfWeek(now, { weekStartsOn: 1 });

  const ranges: WeekRange[] = [];

  for (let i = 0; i < count; i++) {
    const weekStart = subWeeks(latestMonday, i);
    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6);

    const weekStartDate = format(weekStart, "yyyy-MM-dd");

    // Format the label
    let label: string;
    if (weekStart.getMonth() === weekEnd.getMonth()) {
      // Same month: "Feb 23 - Mar 1, 2026" — actually same month: "Jan 5 - 11, 2026"
      label = `${format(weekStart, "MMM d")} - ${format(weekEnd, "d, yyyy")}`;
    } else if (weekStart.getFullYear() === weekEnd.getFullYear()) {
      // Cross month same year: "Feb 23 - Mar 1, 2026"
      label = `${format(weekStart, "MMM d")} - ${format(weekEnd, "MMM d, yyyy")}`;
    } else {
      // Cross year: "Dec 29, 2025 - Jan 4, 2026"
      label = `${format(weekStart, "MMM d, yyyy")} - ${format(weekEnd, "MMM d, yyyy")}`;
    }

    ranges.push({ label, weekStartDate });
  }

  return ranges;
}

/**
 * Get the most recent weekStartDate string for API calls.
 */
export function getLatestWeekStartDate(): string {
  return getWeekRanges(1)[0].weekStartDate;
}
