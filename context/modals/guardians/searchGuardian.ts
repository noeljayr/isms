import { create } from "zustand";

interface SearchGuardian {
  searchGuardianModalActive: boolean;
  setSeachsearchGuardianModalActive: () => void;
  updateStudentGuardianChange: boolean;
  setUpdateStudentGuardianChange: () => void;
}

const useSearchGuardianModalStore = create<SearchGuardian>((set) => ({
  searchGuardianModalActive: true,
  setSeachsearchGuardianModalActive: () =>
    set((state) => ({
      searchGuardianModalActive: !state.searchGuardianModalActive,
    })),
  updateStudentGuardianChange: false,
  setUpdateStudentGuardianChange: () =>
    set((state) => ({
      updateStudentGuardianChange: !state.updateStudentGuardianChange,
    })),
}));

export default useSearchGuardianModalStore;
