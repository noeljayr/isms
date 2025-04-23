import { create } from "zustand";

interface AddStudentModalState {
  studentModalActive: boolean;
  setStudentModalActive: () => void;
}

const useStudentModalStore = create<AddStudentModalState>((set) => ({
  studentModalActive: false,
  setStudentModalActive: () =>
    set((state) => ({ studentModalActive: !state.studentModalActive })),
}));

export default useStudentModalStore;
