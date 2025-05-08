import { create } from "zustand";

interface ViewGuardiansModalState {
  viewGuardiansModalActive: boolean;
  setViewGuardianModalActive: () => void;
  viewGuardiansId: string | null,
  setViewGuardiansId: (studentId: string | null) => void;
}

const useViewGuardiansModalStore = create<ViewGuardiansModalState>((set) => ({
  viewGuardiansModalActive: false,
  setViewGuardianModalActive: () =>
    set((state) => ({ viewGuardiansModalActive: !state.viewGuardiansModalActive })),
  viewGuardiansId: null,
  setViewGuardiansId: (id) => set((state) => ({ viewGuardiansId: id })),
}));

export default useViewGuardiansModalStore;
