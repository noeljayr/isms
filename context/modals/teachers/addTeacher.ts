import { create } from "zustand";

interface AddTeacherModalState {
  teacherModalActive: boolean;
  setTeacherModalActive: () => void;
  addTeacherChange: boolean;
  setAddTeacherChange: () => void;
}

export const useTeacherModalStore = create<AddTeacherModalState>((set) => ({
  teacherModalActive: false,
  setTeacherModalActive: () =>
    set((state) => ({ teacherModalActive: !state.teacherModalActive })),
  addTeacherChange: false,
  setAddTeacherChange: () =>
    set((state) => ({ addTeacherChange: !state.addTeacherChange })),
}));

interface ImportTeachersModalState {
  importTeachersModalActive: boolean;
  setImportTeachersModalActive: () => void;
}

export const useImportTeachesrModalStore = create<ImportTeachersModalState>(
  (set) => ({
    importTeachersModalActive: false,
    setImportTeachersModalActive: () =>
      set((state) => ({
        importTeachersModalActive: !state.importTeachersModalActive,
      })),
  })
);
