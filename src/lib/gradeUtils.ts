import { GradeLetter } from "./types";

/**
 * Grade points mapping (Anna University style).
 * Only O through C are passing grades.
 */
export const GRADE_POINTS: Record<GradeLetter, number> = {
  O: 10,
  "A+": 9,
  A: 8,
  "B+": 7,
  B: 6,
  C: 5,
  U: 0,
  SA: 0,
  W: 0,
};

/** All available grade options for dropdowns */
export const GRADE_OPTIONS: GradeLetter[] = [
  "O",
  "A+",
  "A",
  "B+",
  "B",
  "C",
  "U",
  "SA",
  "W",
];

/** Set of passing grades — only these contribute credits to the denominator */
export const PASSING_GRADES: Set<GradeLetter> = new Set([
  "O",
  "A+",
  "A",
  "B+",
  "B",
  "C",
]);

/**
 * Grade display labels for the UI
 */
export const GRADE_LABELS: Record<GradeLetter, string> = {
  O: "O – Outstanding",
  "A+": "A+ – Excellent",
  A: "A – Very Good",
  "B+": "B+ – Good",
  B: "B – Average",
  C: "C – Satisfactory",
  U: "U – Re-appearance",
  SA: "SA – Shortage of Attendance",
  W: "W – Withdrawal",
};

/**
 * Returns a CSS color class for each grade, used for visual indicators.
 */
export function getGradeColor(grade: GradeLetter | null): string {
  switch (grade) {
    case "O":
      return "#10b981"; // emerald-500
    case "A+":
      return "#3b82f6"; // blue-500
    case "A":
      return "#6366f1"; // indigo-500
    case "B+":
      return "#8b5cf6"; // violet-500
    case "B":
      return "#f59e0b"; // amber-500
    case "C":
      return "#f97316"; // orange-500
    case "U":
    case "SA":
    case "W":
      return "#ef4444"; // red-500
    default:
      return "#6b7280"; // gray-500
  }
}

/**
 * Computes GPA using integer-scaled arithmetic to avoid floating-point issues.
 *
 * - credits are scaled by ×10 (so 1.5 → 15, 3 → 30, 4 → 40)
 * - gradePoints are integers (10, 9, ..., 0)
 * - weighted = scaledCredits × gradePoints
 * - Only passing grades contribute credits to the denominator
 *
 * @returns GPA as a 2-decimal-place string (e.g., "8.45")
 */
export function computeGpa(
  entries: { credits: number; grade: GradeLetter }[]
): string {
  let sumWeighted = 0;
  let sumScaledCredits = 0;

  for (const { credits, grade } of entries) {
    const gp = GRADE_POINTS[grade];
    const scaledCredits = Math.round(credits * 10);

    if (gp > 0) {
      sumWeighted += scaledCredits * gp;
      sumScaledCredits += scaledCredits;
    }
  }

  if (sumScaledCredits === 0) return "0.00";

  const raw = Math.round((sumWeighted * 100) / sumScaledCredits);
  const gpa = raw / 100;
  return gpa.toFixed(2);
}

/**
 * Computes earned credits (only passing grades count).
 */
export function computeEarnedCredits(
  entries: { credits: number; grade: GradeLetter }[]
): number {
  let earned = 0;
  for (const { credits, grade } of entries) {
    if (PASSING_GRADES.has(grade)) {
      earned += credits;
    }
  }
  return earned;
}

/**
 * Returns the CGPA color based on the value, for visual theming.
 */
export function getCgpaColor(cgpa: number): string {
  if (cgpa >= 9.0) return "#10b981"; // emerald
  if (cgpa >= 8.0) return "#3b82f6"; // blue
  if (cgpa >= 7.0) return "#8b5cf6"; // violet
  if (cgpa >= 6.0) return "#f59e0b"; // amber
  if (cgpa >= 5.0) return "#f97316"; // orange
  return "#ef4444"; // red
}
