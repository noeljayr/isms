import { create } from "zustand";

interface State {
  viewSubjectModalActive: boolean;
  setViewSubjectModalActive: () => void;
  viewSubjectId: string | null,
  setViewSubjectId: (studentId: string | null) => void;
}

const useViewSubjectModalStore = create<State>((set) => ({
  viewSubjectModalActive: false,
  setViewSubjectModalActive: () =>
    set((state) => ({ viewSubjectModalActive: !state.viewSubjectModalActive })),
  viewSubjectId: null,
  setViewSubjectId: (id) => set((state) => ({ viewSubjectId: id })),
}));

export default useViewSubjectModalStore;
