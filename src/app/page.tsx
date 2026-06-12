"use client";

import { useState, useCallback, useMemo } from "react";
import { GradeLetter } from "@/lib/types";
import {
  MECH_2022_CURRICULUM,
  TOTAL_SEMESTERS,
  getGradableSubjects,
} from "@/lib/curriculum";
import { computeGpa, computeEarnedCredits, GRADE_OPTIONS } from "@/lib/gradeUtils";
import Header from "@/components/Header";
import CgpaDisplay from "@/components/CgpaDisplay";
import SemesterCard from "@/components/SemesterCard";

export default function Home() {
  const [studentName, setStudentName] = useState("");
  const [regNo, setRegNo] = useState("");
  const [grades, setGrades] = useState<Record<string, GradeLetter>>({});

  const handleGradeChange = useCallback(
    (code: string, grade: GradeLetter) => {
      setGrades((prev) => ({ ...prev, [code]: grade }));
    },
    []
  );

  // Compute overall CGPA
  const { cgpa, totalCredits, earnedCredits, semestersWithGrades } =
    useMemo(() => {
      const allGradable = MECH_2022_CURRICULUM.filter(
        (s) => !s.excludedFromCgpa && s.credits > 0
      );

      const totalCredits = allGradable.reduce((sum, s) => sum + s.credits, 0);

      const entriesWithGrades = allGradable
        .filter((s) => grades[s.code])
        .map((s) => ({
          credits: s.credits,
          grade: grades[s.code],
        }));

      const cgpa =
        entriesWithGrades.length > 0 ? computeGpa(entriesWithGrades) : null;
      const earnedCredits =
        entriesWithGrades.length > 0
          ? computeEarnedCredits(entriesWithGrades)
          : 0;

      // Count semesters that have at least one grade
      const semestersWithGrades = new Set(
        allGradable
          .filter((s) => grades[s.code])
          .map((s) => s.semester)
      ).size;

      return { cgpa, totalCredits, earnedCredits, semestersWithGrades };
    }, [grades]);

  // Fill all with a specific grade
  const fillAll = useCallback((grade: GradeLetter) => {
    const newGrades: Record<string, GradeLetter> = {};
    MECH_2022_CURRICULUM.forEach((s) => {
      if (!s.excludedFromCgpa && s.credits > 0) {
        newGrades[s.code] = grade;
      }
    });
    setGrades(newGrades);
  }, []);

  const resetAll = useCallback(() => {
    setGrades({});
  }, []);

  // Fill semester with grade
  const fillSemester = useCallback(
    (semester: number, grade: GradeLetter) => {
      const subjects = getGradableSubjects(semester);
      setGrades((prev) => {
        const next = { ...prev };
        subjects.forEach((s) => {
          next[s.code] = grade;
        });
        return next;
      });
    },
    []
  );

  return (
    <div className="app-container">
      {/* Background decorations */}
      <div className="bg-orb bg-orb-1" />
      <div className="bg-orb bg-orb-2" />
      <div className="bg-orb bg-orb-3" />

      <div className="content-wrapper">
        <Header
          studentName={studentName}
          regNo={regNo}
          onNameChange={setStudentName}
          onRegNoChange={setRegNo}
        />

        {/* CGPA Hero Section */}
        <section className="cgpa-section">
          <CgpaDisplay
            cgpa={cgpa}
            totalCredits={totalCredits}
            earnedCredits={earnedCredits}
            semestersWithGrades={semestersWithGrades}
            totalSemesters={TOTAL_SEMESTERS}
          />
        </section>

        {/* Quick Actions */}
        <section className="quick-actions">
          <div className="quick-actions-left">
            <span className="quick-actions-label">Quick Fill:</span>
            {GRADE_OPTIONS.filter((g) => !["U", "SA", "W"].includes(g)).map(
              (g) => (
                <button
                  key={g}
                  className="quick-fill-btn"
                  onClick={() => fillAll(g)}
                  title={`Fill all subjects with grade ${g}`}
                >
                  {g}
                </button>
              )
            )}
          </div>
          <button className="reset-btn" onClick={resetAll}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M2 2V6H6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2.5 10A6 6 0 1 0 3.8 4.2L2 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Reset All
          </button>
        </section>

        {/* Semester Cards */}
        <section className="semesters-grid">
          {Array.from({ length: TOTAL_SEMESTERS }, (_, i) => i + 1).map(
            (sem) => (
              <SemesterCard
                key={sem}
                semester={sem}
                grades={grades}
                onGradeChange={handleGradeChange}
                defaultExpanded={sem === 1}
              />
            )
          )}
        </section>

        {/* Footer */}
        <footer className="app-footer">
          <p>
            B.E. Mechanical Engineering · Regulation 2022 · Anna University ·
            ACGCET
          </p>
          <p className="footer-note">
            Grade points and curriculum as per Anna University guidelines.
            NCC &amp; Mandatory courses are excluded from CGPA calculation.
          </p>
        </footer>
      </div>
    </div>
  );
}
