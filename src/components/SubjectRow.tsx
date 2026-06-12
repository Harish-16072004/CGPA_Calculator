"use client";

import { SubjectDefinition, GradeLetter } from "@/lib/types";
import { CATEGORY_COLORS } from "@/lib/curriculum";
import { getGradeColor, GRADE_POINTS, PASSING_GRADES } from "@/lib/gradeUtils";
import GradeSelector from "./GradeSelector";

interface SubjectRowProps {
  subject: SubjectDefinition;
  grade: GradeLetter | null;
  onGradeChange: (code: string, grade: GradeLetter) => void;
  index: number;
}

export default function SubjectRow({
  subject,
  grade,
  onGradeChange,
  index,
}: SubjectRowProps) {
  const isExcluded = subject.excludedFromCgpa || subject.credits === 0;
  const categoryColor = CATEGORY_COLORS[subject.category] || CATEGORY_COLORS.OTHER;

  const gradePoints = grade ? GRADE_POINTS[grade] : null;
  const isPassing = grade ? PASSING_GRADES.has(grade) : null;

  return (
    <div
      className={`subject-row ${isExcluded ? "subject-row-excluded" : ""}`}
      style={{ animationDelay: `${index * 30}ms` }}
    >
      {/* Subject Code */}
      <div className="subject-code">{subject.code}</div>

      {/* Subject Title */}
      <div className="subject-title">
        <span className="subject-title-text">{subject.title}</span>
        <span
          className="category-badge"
          style={{
            backgroundColor: categoryColor.bg,
            color: categoryColor.text,
          }}
        >
          {subject.category}
        </span>
      </div>

      {/* Credits */}
      <div className="subject-credits">
        <span className="credits-value">{subject.credits}</span>
        <span className="credits-label">cr</span>
      </div>

      {/* Grade Selector */}
      <div className="subject-grade">
        {isExcluded ? (
          <span className="excluded-badge">Excluded</span>
        ) : (
          <GradeSelector
            value={grade}
            onChange={(g) => onGradeChange(subject.code, g)}
            subjectCode={subject.code}
          />
        )}
      </div>

      {/* Grade Points Display */}
      <div className="subject-points">
        {!isExcluded && grade && (
          <span
            className="points-value"
            style={{
              color: getGradeColor(grade),
              opacity: isPassing ? 1 : 0.5,
            }}
          >
            {gradePoints}
          </span>
        )}
      </div>
    </div>
  );
}
