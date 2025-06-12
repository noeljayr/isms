import { create } from "zustand";
import { StudentTypes } from "@/types/StudentTypes";

interface GuardianData {
  guardiansData: StudentTypes[];
  setGuardiansData: (students: StudentTypes[]) => void;
  guardianCount: number;
  setGuardianCount: (count: number) => void;
}

export const useGuardianData = create<GuardianData>((set) => ({
  guardiansData: [],
  setGuardiansData: (guardiansData) =>
    set((state) => ({ guardiansData: guardiansData })),
  guardianCount: 0,
  setGuardianCount: (guardianCount) =>
    set((state) => ({ guardianCount: guardianCount })),
}));
