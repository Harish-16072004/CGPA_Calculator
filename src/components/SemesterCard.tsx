"use client";

import { useState } from "react";
import { GradeLetter } from "@/lib/types";
import { getSemesterSubjects, getSemesterTotalCredits } from "@/lib/curriculum";
import { computeGpa, computeEarnedCredits } from "@/lib/gradeUtils";
import SubjectRow from "./SubjectRow";

interface SemesterCardProps {
  semester: number;
  grades: Record<string, GradeLetter>;
  onGradeChange: (code: string, grade: GradeLetter) => void;
  defaultExpanded?: boolean;
}

export default function SemesterCard({
  semester,
  grades,
  onGradeChange,
  defaultExpanded = false,
}: SemesterCardProps) {
  const [expanded, setExpanded] = useState(defaultExpanded);

  const allSubjects = getSemesterSubjects(semester);
  const gradableSubjects = allSubjects.filter(
    (s) => !s.excludedFromCgpa && s.credits > 0
  );
  const totalCredits = getSemesterTotalCredits(semester);

  // Count how many gradable subjects have grades
  const gradedCount = gradableSubjects.filter(
    (s) => grades[s.code]
  ).length;
  const totalGradable = gradableSubjects.length;
  const progress = totalGradable > 0 ? gradedCount / totalGradable : 0;

  // Compute GPA for this semester
  const entries = gradableSubjects
    .filter((s) => grades[s.code])
    .map((s) => ({
      credits: s.credits,
      grade: grades[s.code],
    }));

  const gpa = entries.length > 0 ? computeGpa(entries) : null;
  const earnedCredits =
    entries.length > 0 ? computeEarnedCredits(entries) : 0;

  const gpaValue = gpa ? parseFloat(gpa) : 0;
  const gpaColor =
    gpaValue >= 9
      ? "#10b981"
      : gpaValue >= 8
      ? "#3b82f6"
      : gpaValue >= 7
      ? "#8b5cf6"
      : gpaValue >= 6
      ? "#f59e0b"
      : gpaValue >= 5
      ? "#f97316"
      : gpaValue > 0
      ? "#ef4444"
      : "rgba(255,255,255,0.3)";

  return (
    <div className="semester-card">
      {/* Card Header */}
      <button
        className="semester-header"
        onClick={() => setExpanded(!expanded)}
        aria-expanded={expanded}
        id={`semester-${semester}-header`}
      >
        <div className="semester-header-left">
          <div className="semester-number">
            <span className="semester-label">Semester</span>
            <span className="semester-num">{semester}</span>
          </div>
          <div className="semester-meta">
            <span className="semester-subjects-count">
              {allSubjects.length} subjects
            </span>
            <span className="semester-credits-total">{totalCredits} credits</span>
          </div>
        </div>

        <div className="semester-header-right">
          {/* Progress Ring */}
          <div className="progress-ring-container">
            <svg viewBox="0 0 36 36" className="progress-ring">
              <path
                className="progress-ring-bg"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="progress-ring-fill"
                strokeDasharray={`${progress * 100}, 100`}
                style={{ stroke: gpaColor }}
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="progress-text">
              {gradedCount}/{totalGradable}
            </span>
          </div>

          {/* GPA Display */}
          {gpa && (
            <div className="semester-gpa" style={{ color: gpaColor }}>
              <span className="gpa-label">GPA</span>
              <span className="gpa-value">{gpa}</span>
            </div>
          )}

          {/* Expand Icon */}
          <div className={`expand-icon ${expanded ? "expanded" : ""}`}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M5 7.5L10 12.5L15 7.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </button>

      {/* Expandable Content */}
      {expanded && (
        <div className="semester-content">
          {/* Column Headers */}
          <div className="subject-header-row">
            <div className="subject-code">Code</div>
            <div className="subject-title">Subject</div>
            <div className="subject-credits">Credits</div>
            <div className="subject-grade">Grade</div>
            <div className="subject-points">Points</div>
          </div>

          {/* Subject Rows */}
          {allSubjects.map((subject, i) => (
            <SubjectRow
              key={subject.code}
              subject={subject}
              grade={grades[subject.code] || null}
              onGradeChange={onGradeChange}
              index={i}
            />
          ))}

          {/* Semester Summary */}
          {gradedCount > 0 && (
            <div className="semester-summary">
              <div className="summary-item">
                <span className="summary-label">Earned Credits</span>
                <span className="summary-value">
                  {earnedCredits} / {totalCredits}
                </span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Semester GPA</span>
                <span className="summary-value" style={{ color: gpaColor }}>
                  {gpa}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
