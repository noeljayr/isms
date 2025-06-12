import { create } from "zustand";

interface ViewStudentModalState {
  viewStudentModalActive: boolean;
  setViewStudentModalActive: () => void;
  viewStudentId: string | null,
  setViewStudentId: (studentId: string | null) => void;
}

const useViewStudentModalStore = create<ViewStudentModalState>((set) => ({
  viewStudentModalActive: false,
  setViewStudentModalActive: () =>
    set((state) => ({ viewStudentModalActive: !state.viewStudentModalActive })),
  viewStudentId: null,
  setViewStudentId: (id) => set((state) => ({ viewStudentId: id })),
}));

export default useViewStudentModalStore;
