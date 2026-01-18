import { create } from "zustand";

interface ThemeState {
  backgroundColor: string;
  setBackgroundColor: (color: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  backgroundColor: "#121416",
  setBackgroundColor: (color: string) => set({ backgroundColor: color }),
}));
