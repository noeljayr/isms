import { create } from "zustand";

interface ViewStudentModalState {
  viewStudentModalActive: boolean;
  setViewStudentModalActive: () => void;
}

const useViewStudentModalStore = create<ViewStudentModalState>((set) => ({
  viewStudentModalActive: false,
  setViewStudentModalActive: () =>
    set((state) => ({ viewStudentModalActive: !state.viewStudentModalActive })),
}));

export default useViewStudentModalStore;
