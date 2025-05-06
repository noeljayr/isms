export interface SubClassTypes {
  id: string;
  name: string;
  students: number;
  teachers: number;
}

// Type for a class
export interface ClassTypes {
  id: string
  name: string;
  // subClasses: SubClassTypes[];
  totalStudent: number;
  totalTeachers: number;
  attandanceRate: number;
}
