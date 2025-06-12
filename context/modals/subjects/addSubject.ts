import { create } from "zustand";

interface AddSubjectModal {
  subjectModalActive: boolean;
  setSubjectModalActive: () => void;
  addSubjectChange: boolean;
  setAddSubjectChange: () => void;
}

const useSubjectModalStore = create<AddSubjectModal>((set) => ({
  subjectModalActive: false,
  setSubjectModalActive: () =>
    set((state) => ({ subjectModalActive: !state.subjectModalActive })),
  addSubjectChange: false,
  setAddSubjectChange: () =>
    set((state) => ({ addSubjectChange: !state.addSubjectChange })),
}));

export default useSubjectModalStore;
