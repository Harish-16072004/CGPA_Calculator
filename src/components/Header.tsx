"use client";

interface HeaderProps {
  studentName: string;
  regNo: string;
  onNameChange: (name: string) => void;
  onRegNoChange: (regNo: string) => void;
}

export default function Header({
  studentName,
  regNo,
  onNameChange,
  onRegNoChange,
}: HeaderProps) {
  return (
    <header className="app-header">
      <div className="header-brand">
        <div className="header-logo">
          <svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="2"
              y="2"
              width="36"
              height="36"
              rx="8"
              fill="url(#logo-gradient)"
              fillOpacity="0.15"
              stroke="url(#logo-gradient)"
              strokeWidth="1.5"
            />
            <text
              x="20"
              y="26"
              textAnchor="middle"
              fill="url(#logo-gradient)"
              fontSize="16"
              fontWeight="700"
              fontFamily="Inter, sans-serif"
            >
              GPA
            </text>
            <defs>
              <linearGradient
                id="logo-gradient"
                x1="0"
                y1="0"
                x2="40"
                y2="40"
              >
                <stop stopColor="#818cf8" />
                <stop offset="1" stopColor="#c084fc" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="header-text">
          <h1 className="header-title">CGPA Calculator</h1>
          <p className="header-subtitle">
            B.E. Mechanical Engineering · Reg. 2022 · ACGCET
          </p>
        </div>
      </div>

      <div className="header-inputs">
        <div className="header-input-group">
          <label htmlFor="student-name" className="header-input-label">
            Student Name
          </label>
          <input
            id="student-name"
            type="text"
            value={studentName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="Enter your name"
            className="header-input"
          />
        </div>
        <div className="header-input-group">
          <label htmlFor="reg-no" className="header-input-label">
            Register No.
          </label>
          <input
            id="reg-no"
            type="text"
            value={regNo}
            onChange={(e) => onRegNoChange(e.target.value)}
            placeholder="e.g., 922022104001"
            className="header-input"
          />
        </div>
      </div>
    </header>
  );
}
