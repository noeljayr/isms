import { create } from "zustand";

interface AddClassModalState {
  classModalActive: boolean;
  setClassModalActive: () => void;
}

const useClassModalStore = create<AddClassModalState>((set) => ({
  classModalActive: false,
  setClassModalActive: () =>
    set((state) => ({ classModalActive: !state.classModalActive })),
}));

export default useClassModalStore;
