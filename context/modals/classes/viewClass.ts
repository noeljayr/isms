import { create } from "zustand";

interface ClassModalState {
  viewClassModalActive: boolean;
  setViewClassModalActive: () => void;
  viewClassId: string | null;
  setViewClassId: (id: string) => void;
}

const useViewClassModalStore = create<ClassModalState>((set) => ({
  viewClassModalActive: false,
  setViewClassModalActive: () =>
    set((state) => ({ viewClassModalActive: !state.viewClassModalActive })),
  viewClassId: null,
  setViewClassId: (id) => set((state) => ({ viewClassId: id })),
}));

export default useViewClassModalStore;
