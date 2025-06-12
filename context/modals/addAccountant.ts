import { create } from "zustand";

interface AddAccountantModalState {
  accountantModalActive: boolean;
  setAddAccountantModalActive: () => void;
}

export const useAccountantModalStore = create<AddAccountantModalState>((set) => ({
  accountantModalActive: false,
  setAddAccountantModalActive: () =>
    set((state) => ({ accountantModalActive: !state.accountantModalActive })),
}));

interface ImportAccountantsModalState {
  importAccountantModalActive: boolean;
  setImportAccountantModalActive: () => void;
}

export const useImportAccountantModalStore = create<ImportAccountantsModalState>(
  (set) => ({
    importAccountantModalActive: false,
    setImportAccountantModalActive: () =>
      set((state) => ({
        importAccountantModalActive: !state.importAccountantModalActive,
      })),
  })
);
