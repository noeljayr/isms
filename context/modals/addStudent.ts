import { create } from "zustand";

interface AddStudentModalState {
  studentModalActive: boolean;
  setStudentModalActive: () => void;
}

export const useStudentModalStore = create<AddStudentModalState>((set) => ({
  studentModalActive: false,
  setStudentModalActive: () =>
    set((state) => ({ studentModalActive: !state.studentModalActive })),
}));


interface ImportStudentsModalState {
  importStudentsModalActive: boolean;
  setImportStudentModalActive: () => void;
}

export const useImportStudentModalStore = create<ImportStudentsModalState>((set) => ({
  importStudentsModalActive: false,
  setImportStudentModalActive: () =>
    set((state) => ({ importStudentsModalActive: !state.importStudentsModalActive })),
}));


