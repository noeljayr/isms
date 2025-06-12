import { create } from "zustand";
import { StudentTypes } from "@/types/StudentTypes";

interface StudentData {
  studentsData: StudentTypes[];
  setStudentsData: (students: StudentTypes[]) => void;
  studentCount: number;
  setStudentCount: (count: number) => void;
}

export const useStudentData = create<StudentData>((set) => ({
  studentsData: [],
  setStudentsData: (studentsData) =>
    set((state) => ({ studentsData: studentsData })),
  studentCount: 0,
  setStudentCount: (studentCount) =>
    set((state) => ({ studentCount: studentCount })),
}));
