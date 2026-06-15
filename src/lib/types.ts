export type GradeLetter =
  | "O"
  | "A+"
  | "A"
  | "B+"
  | "B"
  | "C"
  | "U"
  | "SA"
  | "W";

export type SubjectCategory =
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

export interface SubjectDefinition {
  code: string;
  title: string;
  category: SubjectCategory;
  credits: number;
  semester: number;
  isSkillBased?: boolean;
  isNccCourse?: boolean;
  excludedFromCgpa?: boolean;
  defaultGrade?: GradeLetter;
}

export interface SubjectGradeEntry {
  subjectCode: string;
  grade: GradeLetter;
}

export interface SemesterResult {
  semester: number;
  gpa: string;
  totalCredits: number;
  earnedCredits: number;
  subjectCount: number;
  gradedCount: number;
}

export interface CgpaResult {
  cgpa: string;
  totalCredits: number;
  earnedCredits: number;
  semesterResults: SemesterResult[];
}
