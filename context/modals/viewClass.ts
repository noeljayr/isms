import { create } from "zustand";

interface ClassClassModalState {
  viewClassModalActive: boolean;
  setViewClassModalActive: () => void;
}

const useViewClassModalStore = create<ClassClassModalState>((set) => ({
  viewClassModalActive: false,
  setViewClassModalActive: () =>
    set((state) => ({ viewClassModalActive: !state.viewClassModalActive })),
}));

export default useViewClassModalStore;
