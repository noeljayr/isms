import { create } from "zustand";

interface ViewStudentModalState {
  viewStudentModalActive: boolean;
  setViewStudentModalActive: () => void;
}

const useViewStudentModalStore = create<ViewStudentModalState>((set) => ({
  viewStudentModalActive: true,
  setViewStudentModalActive: () =>
    set((state) => ({ viewStudentModalActive: !state.viewStudentModalActive })),
}));

export default useViewStudentModalStore;
