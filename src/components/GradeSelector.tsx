"use client";

import { GradeLetter } from "@/lib/types";
import { GRADE_OPTIONS, GRADE_LABELS, getGradeColor } from "@/lib/gradeUtils";

interface GradeSelectorProps {
  value: GradeLetter | null;
  onChange: (grade: GradeLetter) => void;
  disabled?: boolean;
  subjectCode: string;
}

export default function GradeSelector({
  value,
  onChange,
  disabled = false,
  subjectCode,
}: GradeSelectorProps) {
  const borderColor = value ? getGradeColor(value) : "rgba(255,255,255,0.1)";

  return (
    <div className="grade-selector-wrapper">
      <div
        className="grade-indicator"
        style={{ backgroundColor: value ? getGradeColor(value) : "transparent" }}
      />
      <select
        id={`grade-${subjectCode}`}
        value={value || ""}
        onChange={(e) => onChange(e.target.value as GradeLetter)}
        disabled={disabled}
        className="grade-select"
        style={{
          borderColor,
          color: value ? getGradeColor(value) : "rgba(255,255,255,0.4)",
        }}
        aria-label={`Grade for ${subjectCode}`}
      >
        <option value="" disabled>
          Select
        </option>
        {GRADE_OPTIONS.map((g) => (
          <option key={g} value={g}>
            {GRADE_LABELS[g]}
          </option>
        ))}
      </select>
    </div>
  );
}
