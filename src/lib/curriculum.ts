import { SubjectDefinition } from "./types";

/**
 * Complete curriculum for B.E. Mechanical Engineering
 * Regulation 2022, ACGCET
 *
 * 58 subjects across 8 semesters.
 * NCC and mandatory (MC) courses are marked excludedFromCgpa.
 */
export const MECH_2022_CURRICULUM: SubjectDefinition[] = [
  // ──────────────────────────────────────────────────────
  // SEMESTER I (11 rows, 10 credited + 1 excluded)
  // ──────────────────────────────────────────────────────
  { code: "22IPM01", title: "Induction Programme", category: "OTHER", credits: 0, semester: 1, excludedFromCgpa: true },
  { code: "22HSE11", title: "Professional English-I", category: "HSMC", credits: 3, semester: 1 },
  { code: "22MAB12", title: "Matrices and Calculus", category: "BSC", credits: 4, semester: 1 },
  { code: "22PHB14", title: "Engineering Physics", category: "BSC", credits: 3, semester: 1 },
  { code: "22CYB15", title: "Engineering Chemistry", category: "BSC", credits: 3, semester: 1 },
  { code: "22EEG16", title: "Basic Electrical, Electronics and Instrumentation Engineering", category: "ESC", credits: 3, semester: 1 },
  { code: "22HST17", title: "தமிழர் மரபு / Heritage of Tamils", category: "HSMC", credits: 1, semester: 1 },
  { code: "22EEL18", title: "Basic Electrical and Electronics Engineering Laboratory", category: "ESC", credits: 1.5, semester: 1 },
  { code: "22PHL19", title: "Physics Laboratory", category: "BSC", credits: 1.5, semester: 1 },
  { code: "22CYL1A", title: "Chemistry Laboratory", category: "BSC", credits: 1.5, semester: 1 },
  { code: "22HSL1B", title: "English Laboratory", category: "EEC", credits: 1.5, semester: 1 },

  // ──────────────────────────────────────────────────────
  // SEMESTER II (10 credited + NCC excluded)
  // ──────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────
  // SEMESTER III (9 credited)
  // ──────────────────────────────────────────────────────
  { code: "22MAB31", title: "Transforms and Partial Differential Equations", category: "BSC", credits: 4, semester: 3 },
  { code: "22MEG32", title: "Engineering Mechanics", category: "ESC", credits: 3, semester: 3 },
  { code: "22MEC33", title: "Engineering Thermodynamics", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEG34", title: "Fluid Mechanics and Machinery", category: "ESC", credits: 4, semester: 3 },
  { code: "22MEC35", title: "Engineering Materials and Metallurgy", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEC36", title: "Manufacturing Processes", category: "PCC", credits: 3, semester: 3 },
  { code: "22MEL37", title: "Computer Aided Machine Drawing", category: "ESC", credits: 2, semester: 3 },
  { code: "22MEL38", title: "Manufacturing Technology Laboratory", category: "PCC", credits: 2, semester: 3 },
  { code: "22MEZ39", title: "Professional Development", category: "EEC", credits: 1, semester: 3 },

  // ──────────────────────────────────────────────────────
  // SEMESTER IV (9 credited + NCC excluded)
  // ──────────────────────────────────────────────────────
  { code: "22MEC41", title: "Theory of Machines", category: "PCC", credits: 4, semester: 4 },
  { code: "22MEC42", title: "Thermal Engineering", category: "PCC", credits: 4, semester: 4 },
  { code: "22MEC43", title: "Hydraulics and Pneumatics", category: "PCC", credits: 3, semester: 4 },
  { code: "22MEC44", title: "Manufacturing Technology", category: "PCC", credits: 3, semester: 4 },
  { code: "22MEC45", title: "Strength of Materials", category: "PCC", credits: 3, semester: 4 },
  { code: "22CYB46", title: "Environmental Sciences And Sustainability", category: "BSC", credits: 2, semester: 4 },
  { code: "22NCC02", title: "NCC Credit Course Level 2", category: "NCC", credits: 3, semester: 4, isNccCourse: true, excludedFromCgpa: true },
  { code: "22MEL47", title: "Strength of Materials and Fluid Machinery Laboratory", category: "PCC", credits: 2, semester: 4 },
  { code: "22MEL48", title: "Thermal Engineering Laboratory", category: "PCC", credits: 2, semester: 4 },

  // ──────────────────────────────────────────────────────
  // SEMESTER V (9 credited + MC excluded)
  // ──────────────────────────────────────────────────────
  { code: "22MEC51", title: "Design of Machine Elements", category: "PCC", credits: 4, semester: 5 },
  { code: "22MEC52", title: "Metrology and Measurements", category: "PCC", credits: 3, semester: 5 },
  { code: "22MEV51", title: "Professional Elective I", category: "PEC", credits: 3, semester: 5 },
  { code: "22MEV52", title: "Professional Elective II", category: "PEC", credits: 3, semester: 5 },
  { code: "22MEV53", title: "Professional Elective III", category: "PEC", credits: 3, semester: 5 },
  { code: "22UGM51", title: "Mandatory Course – I", category: "MC", credits: 0, semester: 5, excludedFromCgpa: true },
  { code: "22MEZ53", title: "Summer Internship– I", category: "EEC", credits: 1, semester: 5 },
  { code: "22MEL54", title: "Theory of Machines Laboratory", category: "PCC", credits: 2, semester: 5 },
  { code: "22MEL55", title: "Metallurgy and Metrology Laboratory", category: "PCC", credits: 2, semester: 5 },

  // ──────────────────────────────────────────────────────
  // SEMESTER VI (10 credited + MC & NCC excluded)
  // ──────────────────────────────────────────────────────
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

  // ──────────────────────────────────────────────────────
  // SEMESTER VII (10 credited)
  // ──────────────────────────────────────────────────────
  { code: "22HSM71", title: "Human values and Ethics", category: "HSMC", credits: 2, semester: 7 },
  { code: "22MEH72", title: "Industrial Management", category: "HSMC", credits: 3, semester: 7 },
  { code: "22MEC73", title: "Mechatronics and IoT", category: "PCC", credits: 3, semester: 7 },
  { code: "22MEC74", title: "Computer Integrated Manufacturing", category: "PCC", credits: 3, semester: 7 },
  { code: "22OEX72", title: "Open Elective – II", category: "OEC", credits: 3, semester: 7 },
  { code: "22OEX73", title: "Open Elective – III", category: "OEC", credits: 3, semester: 7 },
  { code: "22OEX74", title: "Open Elective – IV", category: "OEC", credits: 3, semester: 7 },
  { code: "22MEL75", title: "Mechatronics & Automation Laboratory", category: "PCC", credits: 2, semester: 7 },
  { code: "22MEZ76", title: "Summer Internship– II", category: "EEC", credits: 1, semester: 7 },

  // ──────────────────────────────────────────────────────
  // SEMESTER VIII (1 credited)
  // ──────────────────────────────────────────────────────
  { code: "22MEZ81", title: "Project Work / Internship", category: "EEC", credits: 10, semester: 8 },
];

/** Total number of semesters */
export const TOTAL_SEMESTERS = 8;

/**
 * Get all subjects for a given semester.
 */
export function getSemesterSubjects(semester: number): SubjectDefinition[] {
  return MECH_2022_CURRICULUM.filter((s) => s.semester === semester);
}

/**
 * Get subjects that count towards GPA for a semester.
 * Excludes NCC, MC, and 0-credit courses.
 */
export function getGradableSubjects(semester: number): SubjectDefinition[] {
  return MECH_2022_CURRICULUM.filter(
    (s) => s.semester === semester && !s.excludedFromCgpa && s.credits > 0
  );
}

/**
 * Get total credits for a semester (only gradable subjects).
 */
export function getSemesterTotalCredits(semester: number): number {
  return getGradableSubjects(semester).reduce((sum, s) => sum + s.credits, 0);
}

/**
 * Category color mapping for badges.
 */
export const CATEGORY_COLORS: Record<string, { bg: string; text: string }> = {
  HSMC: { bg: "rgba(99, 102, 241, 0.15)", text: "#818cf8" },
  BSC: { bg: "rgba(59, 130, 246, 0.15)", text: "#60a5fa" },
  ESC: { bg: "rgba(16, 185, 129, 0.15)", text: "#34d399" },
  PCC: { bg: "rgba(139, 92, 246, 0.15)", text: "#a78bfa" },
  EEC: { bg: "rgba(236, 72, 153, 0.15)", text: "#f472b6" },
  OEC: { bg: "rgba(245, 158, 11, 0.15)", text: "#fbbf24" },
  PEC: { bg: "rgba(20, 184, 166, 0.15)", text: "#2dd4bf" },
  MC: { bg: "rgba(107, 114, 128, 0.15)", text: "#9ca3af" },
  NCC: { bg: "rgba(107, 114, 128, 0.15)", text: "#9ca3af" },
  OTHER: { bg: "rgba(107, 114, 128, 0.15)", text: "#9ca3af" },
};
