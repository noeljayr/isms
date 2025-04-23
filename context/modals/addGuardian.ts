import { create } from "zustand";

interface AddGuardianModalState {
  guardianModalActive: boolean;
  setGuardianModalActive: () => void;
}

const useGuardianModalStore = create<AddGuardianModalState>((set) => ({
  guardianModalActive: false,
  setGuardianModalActive: () =>
    set((state) => ({ guardianModalActive: !state.guardianModalActive })),
}));

export default useGuardianModalStore;
