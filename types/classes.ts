export interface SubClassTypes {
  name: string;
  students: number;
  teachers: number;
}

// Type for a class
export interface ClassTypes {
  name: string;
  subClasses: SubClassTypes[];
  totalStudent: number;
  totalTeachers: number;
  attandanceRate: number;
}
