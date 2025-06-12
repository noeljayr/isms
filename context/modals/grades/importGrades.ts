import { create } from "zustand";


interface State {
  importGradesModalActive: boolean;
  setImportGradesModalActive: () => void;
}

export const useImportGradesModalStore = create<State>(
  (set) => ({
    importGradesModalActive: false,
    setImportGradesModalActive: () =>
      set((state) => ({
        importGradesModalActive: !state.importGradesModalActive,
      })),
  })
);
