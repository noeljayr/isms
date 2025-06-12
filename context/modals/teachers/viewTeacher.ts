import { create } from "zustand";

interface ViewTeacherState {
  viewTeacherModalActive: boolean;
  setViewTeacherModalActive: () => void;
  viewTeacherId: string | null,
  setViewTeacherId: (studentId: string | null) => void;
}

const useViewTeacherModalStore = create<ViewTeacherState>((set) => ({
  viewTeacherModalActive: false,
  setViewTeacherModalActive: () =>
    set((state) => ({ viewTeacherModalActive: !state.viewTeacherModalActive })),
  viewTeacherId: null,
  setViewTeacherId: (id) => set((state) => ({ viewTeacherId: id })),
}));

export default useViewTeacherModalStore;
