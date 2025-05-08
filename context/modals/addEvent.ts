import { create } from "zustand";

interface EventModal {
  eventModalActive: boolean;
  setEventModalActive: () => void;
  addEventChange: boolean;
  setAddEventChange: () => void;
}

const useEventModalStore = create<EventModal>((set) => ({
  eventModalActive: false,
  setEventModalActive: () =>
    set((state) => ({ eventModalActive: !state.eventModalActive })),
  addEventChange: false,
  setAddEventChange: () =>
    set((state) => ({ addEventChange: !state.addEventChange })),
}));

export default useEventModalStore;
