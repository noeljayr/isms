import { create } from "zustand";

export const years = ["2025", "2024", "2023"];

interface ActiveYearStore {
  activeYear: string;
  setActiveYear: (year: string) => void;
}

const useActiveYearStore = create<ActiveYearStore>((set) => ({
  activeYear: years[0],
  setActiveYear: (year) => set((state) => ({ activeYear: year })),
}));

export default useActiveYearStore;
