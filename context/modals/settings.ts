import { create } from "zustand";

interface SettingsModal {
  settingsModalActive: boolean;
  setSettingsModalActive: () => void;
  settingsChange: boolean;
  setSettingsChange: () => void;
}

const useSettingsModalStore = create<SettingsModal>((set) => ({
  settingsModalActive: false,
  setSettingsModalActive: () =>
    set((state) => ({ settingsModalActive: !state.settingsModalActive })),
  settingsChange: false,
  setSettingsChange: () =>
    set((state) => ({ settingsChange: !state.settingsChange })),
}));

export default useSettingsModalStore;
