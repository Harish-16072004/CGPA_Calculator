# CGPA Calculator App – AI IDE Specification (Updated)

This document describes a full-stack CGPA calculation application for B.E. Mechanical Engineering (Reg. 2022, ACGCET) using the attached curriculum and grading schema. It includes all 58 credited subjects with their codes and credits, and clarifies how to avoid floating-point precision issues during GPA/CGPA calculation so that users only select grades.

---

## Tech Stack

- Frontend: Next.js 15 (App Router) with TypeScript and Tailwind CSS for responsive UI
- Backend: Next.js Route Handlers (server actions) with TypeScript
- Database: SQLite (via Prisma ORM) for local/simple deployments; easily swappable to PostgreSQL
- Auth (optional extension): NextAuth.js with Credentials or OAuth providers
- Deployment target: Vercel (primary) or Dockerized Node.js server

Use clean, modular architecture with React Server Components where possible and client components only for interactive forms and charts.[file:5]

---

## Floating-Point Handling Requirements

To avoid floating-point issues (for example, 7.43000000002 instead of 7.43):

- Perform all intermediate calculations using integers by scaling values by 100.
  - Example: treat grade points as integers (10, 9, 8, …) and credits as integers or integers×10 for half credits (e.g., 1.5 credits stored as 15).
- For each subject:
  - `scaledCredits = credits * 10` (so 1.5 → 15, 3 → 30, 4 → 40).
  - `gradePoints` remain as integers (10, 9, 8, 7, 6, 5, 0).
  - `weighted = scaledCredits * gradePoints`.
- For a semester:
  - `sumWeighted = Σ weighted`.
  - `sumScaledCredits = Σ scaledCredits` (only for passed subjects).
  - GPA as a precise decimal string:
    - `raw = (sumWeighted * 100) / sumScaledCredits` (integer division giving GPA×100).
    - `gpa = raw / 100` as a fixed 2-decimal string using integer math (e.g., `const gpa = (raw / 100).toFixed(2)` after converting to Number once).
- For CGPA:
  - Use the same pattern by aggregating all subjects or semester-level `sumWeighted` and `sumScaledCredits`.
- Never directly rely on JavaScript floating-point for division results without rounding.
  - Wrap the calculation in a helper: `computeGpa(semesterSubjects): string` which always returns a 2-decimal-place string.

Expose utility functions in a shared module, e.g., `lib/gradeUtils.ts`.

---

## Grade Points Mapping (Anna University Style)

Hard-code or store the following mapping between letter grade and grade points:

- O (Outstanding) → 10
- A+ (Excellent) → 9
- A (Very Good) → 8
- B+ (Good) → 7
- B (Average) → 6
- C (Satisfactory) → 5
- U (Re-appearance) → 0 (subject considered failed, DO NOT count credits towards denominator)
- SA (Shortage of Attendance) → 0 (subject considered failed, DO NOT count credits towards denominator)
- W (Withdrawal) → 0 (subject considered not taken, DO NOT count credits towards denominator)

Validation rules:
- Only subjects with passing grades (O, A+, A, B+, B, C) contribute credits to the denominator.
- Failed/withdrawn subjects can be displayed but should not increase the earned-credit sum or denominator.

---

## Data Model

Define TypeScript types/interfaces so that users only enter grades; all subject metadata is preconfigured.

```ts
export type GradeLetter = "O" | "A+" | "A" | "B+" | "B" | "C" | "U" | "SA" | "W";

export interface SubjectDefinition {
  code: string;
  title: string;
  category:
    | "HSMC"
    | "BSC"
    | "ESC"
    | "PCC"
    | "EEC"
    | "OEC"
    | "PEC"
    | "MC"
    | "NCC"
    | "OTHER";
  credits: number; // actual credit value, e.g. 3, 4, 1.5, 2
  semester: number; // 1 to 8
  isSkillBased?: boolean;
  isNccCourse?: boolean;
  excludedFromCgpa?: boolean;
}

export interface SubjectGradeEntry {
  subjectCode: string;
  grade: GradeLetter;
}

export interface SemesterRecord {
  semester: number;
  subjects: SubjectGradeEntry[];
  gpa: string; // stored as fixed 2-decimal string, e.g. "7.43"
}

export interface StudentRecord {
  id: string;
  name: string;
  regNo?: string;
  semesterRecords: SemesterRecord[];
  currentCgpa: string; // fixed 2-decimal string
}
```

Utility for grade → points and GPA:

```ts
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

export function computeGpa(entries: { credits: number; grade: GradeLetter }[]): string {
  let sumWeighted = 0; // Σ (scaledCredits * gradePoint)
  let sumScaledCredits = 0; // Σ scaledCredits for passed subjects

  for (const { credits, grade } of entries) {
    const gp = GRADE_POINTS[grade];
    const scaledCredits = Math.round(credits * 10); // 1.5 -> 15

    if (gp > 0) {
      sumWeighted += scaledCredits * gp;
      sumScaledCredits += scaledCredits;
    }
  }

  if (sumScaledCredits === 0) return "0.00";

  const raw = Math.round((sumWeighted * 100) / sumScaledCredits); // GPA * 100 as integer
  const gpa = raw / 100;
  return gpa.toFixed(2);
}
```

Use the same approach to compute CGPA by flattening all subjects across semesters or aggregating semester-level totals.

---

## Curriculum Seed Data – All Subjects (58)

Pre-populate all credited subjects so that the UI needs only grade input per subject. Use the exact subject codes and credits from the Mechanical Engineering 2022 Regulations curriculum. NCC and non-credit courses are marked to be excluded from CGPA.

```ts
export const MECH_2022_CURRICULUM: SubjectDefinition[] = [
  // SEMESTER I (11 rows, 10 credited)
  { code: "22IPM01", title: "Induction Programme", category: "OTHER", credits: 0, semester: 1, excludedFromCgpa: true },
  { code: "22HSE11", title: "Professional English-I", category: "HSMC", credits: 3, semester: 1 },
  { code: "22MAB12", title: "Matrices and Calculus", category: "BSC", credits: 4, semester: 1 },
  { code: "22PHB14", title: "Engineering Physics", category: "BSC", credits: 3, semester: 1 },
  { code: "22CYB15", title: "Engineering Chemistry", category: "BSC", credits: 3, semester: 1 },
  {
    code: "22EEG16",
    title: "Basic Electrical, Electronics and Instrumentation Engineering",
    category: "ESC",
    credits: 3,
    semester: 1,
  },
  { code: "22HST17", title: "தமிழர் மரபு / Heritage of Tamils", category: "HSMC", credits: 1, semester: 1 },
  { code: "22EEL18", title: "Basic Electrical and Electronics Engineering Laboratory", category: "ESC", credits: 1.5, semester: 1 },
  { code: "22PHL19", title: "Physics Laboratory", category: "BSC", credits: 1.5, semester: 1 },
  { code: "22CYL1A", title: "Chemistry Laboratory", category: "BSC", credits: 1.5, semester: 1 },
  { code: "22HSL1B", title: "English Laboratory", category: "EEC", credits: 1.5, semester: 1 },

  // SEMESTER II (10 credited + NCC non-credit for CGPA)
  { code: "22HSE21", title: "Professional English-II", category: "HSMC", credits: 2, semester: 2 },
  { code: "22MAB22", title: "Statistics and Numerical Methods", category: "BSC", credits: 4, semester: 2 },
  { code: "22PHB2B", title: "Material Science", category: "BSC", credits: 4, semester: 2 },
  { code: "22CSG16", title: "Problem Solving and Python Programming", category: "ESC", credits: 3, semester: 2 },
  { code: "22MEG24", title: "Engineering Graphics", category: "ESC", credits: 4, semester: 2 },
  { code: "22HST26", title: "தமிழரும் தொழில்நுட்பமும் / Tamils and Technology", category: "HSMC", credits: 1, semester: 2 },
  { code: "22NCC01", title: "NCC Credit Course Level 1", category: "NCC", credits: 2, semester: 2, isNccCourse: true, excludedFromCgpa: true },
  { code: "22EPL27", title: "Engineering Practices Laboratory", category: "ESC", credits: 2, semester: 2 },
  { code: "22CSL18", title: "Problem Solving and Python Programming Laboratory", category: "ESC", credits: 1.5, semester: 2 },
  { code: "22HSL29", title: "Communication Laboratory / Foreign Language", category: "EEC", credits: 1.5, semester: 2 },

  // SEMESTER III (9 credited)
  { code: "22MAB31", title: "Transforms and Partial Differential Equations", category: "BSC", credits: 4, semester: 3 },
  { code: "22MEG32", title: "Engineering Mechanics", category: "ESC", credits: 3, semester: 3 },
  { code: "22MEC33", title: "Engineering Thermodynamics", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEG34", title: "Fluid Mechanics and Machinery", category: "ESC", credits: 4, semester: 3 },
  { code: "22MEC35", title: "Engineering Materials and Metallurgy", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEC36", title: "Manufacturing Processes", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEL37", title: "Computer Aided Machine Drawing", category: "ESC", credits: 2, semester: 3 },
  { code: "22MEL38", title: "Manufacturing Technology Laboratory", category: "PCC", credits: 2, semester: 3 },
  { code: "22MEZ39", title: "Professional Development", category: "EEC", credits: 1, semester: 3 },

  // SEMESTER IV (9 credited + NCC excluded)
  { code: "22MEC41", title: "Theory of Machines", category: "PCC", credits: 4, semester: 4 },
  { code: "22MEC42", title: "Thermal Engineering", category: "PCC", credits: 4, semester: 4 },
  { code: "22MEC43", title: "Hydraulics and Pneumatics", category: "PCC", credits: 3, semester: 4 },
  { code: "22MEC44", title: "Manufacturing Technology", category: "PCC", credits: 3, semester: 4 },
  { code: "22MEC45", title: "Strength of Materials", category: "PCC", credits: 3, semester: 4 },
  { code: "22CYB46", title: "Environmental Sciences And Sustainability", category: "BSC", credits: 2, semester: 4 },
  { code: "22NCC02", title: "NCC Credit Course Level 2", category: "NCC", credits: 3, semester: 4, isNccCourse: true, excludedFromCgpa: true },
  {
    code: "22MEL47",
    title: "Strength of Materials and Fluid Machinery Laboratory",
    category: "PCC",
    credits: 2,
    semester: 4,
  },
  { code: "22MEL48", title: "Thermal Engineering Laboratory", category: "PCC", credits: 2, semester: 4 },

  // SEMESTER V (9 credited, MC non-credit)
  { code: "22MEC51", title: "Design of Machine Elements", category: "PCC", credits: 4, semester: 5 },
  { code: "22MEC52", title: "Metrology and Measurements", category: "PCC", credits: 3, semester: 5 },
  { code: "22MEV51", title: "Professional Elective I", category: "PEC", credits: 3, semester: 5 },
  { code: "22MEV52", title: "Professional Elective II", category: "PEC", credits: 3, semester: 5 },
  { code: "22MEV53", title: "Professional Elective III", category: "PEC", credits: 3, semester: 5 },
  { code: "22UGM51", title: "Mandatory Course – I", category: "MC", credits: 0, semester: 5, excludedFromCgpa: true },
  { code: "22MEZ53", title: "Summer Internship– I", category: "EEC", credits: 1, semester: 5 },
  { code: "22MEL54", title: "Theory of Machines Laboratory", category: "PCC", credits: 2, semester: 5 },
  { code: "22MEL55", title: "Metallurgy and Metrology Laboratory", category: "PCC", credits: 2, semester: 5 },

  // SEMESTER VI (10 credited incl. NCC excluded)
  { code: "22MEC61", title: "Heat and Mass Transfer", category: "PCC", credits: 4, semester: 6 },
  { code: "22MEV61", title: "Professional Elective IV", category: "PEC", credits: 3, semester: 6 },
  { code: "22MEV62", title: "Professional Elective V", category: "PEC", credits: 3, semester: 6 },
  { code: "22MEV63", title: "Professional Elective VI", category: "PEC", credits: 3, semester: 6 },
  { code: "22MEV64", title: "Professional Elective VII", category: "PEC", credits: 3, semester: 6 },
  { code: "22OEX61", title: "Open Elective – I", category: "OEC", credits: 3, semester: 6 },
  { code: "22UGM61", title: "Mandatory Course – II", category: "MC", credits: 0, semester: 6, excludedFromCgpa: true },
  { code: "22NCC03", title: "NCC Credit Course Level 3", category: "NCC", credits: 3, semester: 6, isNccCourse: true, excludedFromCgpa: true },
  { code: "22MEL62", title: "CAD/CAM/CAE Laboratory", category: "PCC", credits: 2, semester: 6 },
  { code: "22MEL63", title: "Heat Transfer Laboratory", category: "PCC", credits: 2, semester: 6 },

  // SEMESTER VII (10 credited)
  { code: "22HSM71", title: "Human values and Ethics", category: "HSMC", credits: 2, semester: 7 },
  { code: "22MEH72", title: "Industrial Management", category: "HSMC", credits: 3, semester: 7 },
  { code: "22MEC73", title: "Mechatronics and IoT", category: "PCC", credits: 3, semester: 7 },
  { code: "22MEC74", title: "Computer Integrated Manufacturing", category: "PCC", credits: 3, semester: 7 },
  { code: "22OEX72", title: "Open Elective – II", category: "OEC", credits: 3, semester: 7 },
  { code: "22OEX73", title: "Open Elective – III", category: "OEC", credits: 3, semester: 7 },
  { code: "22OEX74", title: "Open Elective – IV", category: "OEC", credits: 3, semester: 7 },
  { code: "22MEL75", title: "Mechatronics & Automation Laboratory", category: "PCC", credits: 2, semester: 7 },
  { code: "22MEZ76", title: "Summer Internship– II", category: "EEC", credits: 1, semester: 7 },

  // SEMESTER VIII (1 credited row set)
  { code: "22MEZ81", title: "Project Work / Internship", category: "EEC", credits: 10, semester: 8 },
];
```

Note: This list contains all 58 credited and recorded curriculum items, with NCC and mandatory courses marked so they can be excluded from CGPA calculations while still appearing in the UI.

---

## Functional Requirements

- UI auto-populates subject rows based on `semester` field from `MECH_2022_CURRICULUM`.
- For each subject row, students only choose a `GradeLetter` from a dropdown.
- GPA/CGPA are computed on the fly using `computeGpa` and rendered as fixed 2-decimal strings.
- NCC and mandatory courses appear in the UI but do not contribute to GPA/CGPA.

The rest of the requirements (pages, components, auth, testing, and non-functional constraints) remain as described in the original specification.
