import { create } from "zustand";

interface AddClassModalState {
  classModalActive: boolean;
  setClassModalActive: () => void;
  addClassesChange: boolean;
  setAddClassesChange: () => void;
}

const useClassModalStore = create<AddClassModalState>((set) => ({
  classModalActive: false,
  setClassModalActive: () =>
    set((state) => ({ classModalActive: !state.classModalActive })),
  addClassesChange: false,
  setAddClassesChange: () =>
    set((state) => ({ addClassesChange: !state.addClassesChange })),
}));

export default useClassModalStore;
