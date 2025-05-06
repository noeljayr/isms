import { create } from "zustand";

interface AddGuardianModalState {
  guardianModalActive: boolean;
  setGuardianModalActive: () => void;
  addGuardianChange: boolean;
  setAddGuardianChange: () => void;
}

const useGuardianModalStore = create<AddGuardianModalState>((set) => ({
  guardianModalActive: false,
  setGuardianModalActive: () =>
    set((state) => ({ guardianModalActive: !state.guardianModalActive })),
  addGuardianChange: false,
  setAddGuardianChange: () =>
    set((state) => ({ addGuardianChange: !state.addGuardianChange })),
}));

export default useGuardianModalStore;
