"use client";

import { useEffect, useState } from "react";
import { getCgpaColor } from "@/lib/gradeUtils";

interface CgpaDisplayProps {
  cgpa: string | null;
  totalCredits: number;
  earnedCredits: number;
  semestersWithGrades: number;
  totalSemesters: number;
}

export default function CgpaDisplay({
  cgpa,
  totalCredits,
  earnedCredits,
  semestersWithGrades,
  totalSemesters,
}: CgpaDisplayProps) {
  const cgpaValue = cgpa ? parseFloat(cgpa) : 0;
  const cgpaColor = cgpa ? getCgpaColor(cgpaValue) : "rgba(255,255,255,0.2)";
  const progress = cgpaValue / 10;

  // Animated counter
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!cgpa) {
      setDisplayValue(0);
      return;
    }

    const target = cgpaValue;
    const duration = 600;
    const startTime = Date.now();
    const startValue = displayValue;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const t = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      const current = startValue + (target - startValue) * eased;
      setDisplayValue(current);

      if (t < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cgpa]);

  // Circumference for the ring
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - progress * circumference;

  return (
    <div className="cgpa-display">
      <div className="cgpa-ring-wrapper">
        {/* Animated circular progress */}
        <svg
          viewBox="0 0 200 200"
          className="cgpa-ring-svg"
        >
          {/* Background ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.05)"
            strokeWidth="8"
          />
          {/* Gradient definition */}
          <defs>
            <linearGradient id="cgpa-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={cgpaColor} stopOpacity="1" />
              <stop offset="100%" stopColor={cgpaColor} stopOpacity="0.4" />
            </linearGradient>
          </defs>
          {/* Progress ring */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="url(#cgpa-gradient)"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={cgpa ? strokeDashoffset : circumference}
            transform="rotate(-90 100 100)"
            className="cgpa-ring-progress"
          />
          {/* Glow effect */}
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke={cgpaColor}
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={cgpa ? strokeDashoffset : circumference}
            transform="rotate(-90 100 100)"
            opacity="0.3"
            filter="blur(4px)"
          />
        </svg>

        {/* Center content */}
        <div className="cgpa-center">
          <span className="cgpa-label-top">CGPA</span>
          <span className="cgpa-number" style={{ color: cgpaColor }}>
            {cgpa ? displayValue.toFixed(2) : "—"}
          </span>
          <span className="cgpa-scale">out of 10.00</span>
        </div>
      </div>

      {/* Stats row */}
      <div className="cgpa-stats">
        <div className="cgpa-stat">
          <span className="stat-value" style={{ color: cgpaColor }}>
            {earnedCredits}
          </span>
          <span className="stat-label">Credits Earned</span>
        </div>
        <div className="cgpa-stat-divider" />
        <div className="cgpa-stat">
          <span className="stat-value">{totalCredits}</span>
          <span className="stat-label">Total Credits</span>
        </div>
        <div className="cgpa-stat-divider" />
        <div className="cgpa-stat">
          <span className="stat-value" style={{ color: cgpaColor }}>
            {semestersWithGrades}
          </span>
          <span className="stat-label">
            / {totalSemesters} Semesters
          </span>
        </div>
      </div>
    </div>
  );
}
