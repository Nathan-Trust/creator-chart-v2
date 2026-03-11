import { create } from "zustand";
import { persist } from "zustand/middleware";
import { getWeekRanges, type WeekRange } from "@/util/week-dates";

export type Category =
  | "COMEDY"
  | "LIFESTYLE"
  | "TECH"
  | "MUSIC"
  | "GAMING"
  | "BUSINESS"
  | "EDUCATION";

/**
 * Static list of available countries.
 * When the active-countries endpoint is available, replace this with API data.
 */
export const AVAILABLE_COUNTRIES = ["Global", "Nigeria"] as const;

/**
 * Available week ranges for the week selector.
 */
export const AVAILABLE_WEEKS: WeekRange[] = getWeekRanges(12);

/**
 * Map display country names → two-letter API codes.
 * "Global" maps to undefined (no country filter).
 */
export const COUNTRY_CODE_MAP: Record<string, string | undefined> = {
  Global: undefined,
  Nigeria: "NG",
};

/** Convert the store's display country name to the API country code. */
export function getApiCountryCode(displayName: string): string | undefined {
  return COUNTRY_CODE_MAP[displayName];
}

interface FilterState {
  country: string;
  category: Category;
  weekStartDate: string;
  weekLabel: string;
  setCountry: (country: string) => void;
  setCategory: (category: Category) => void;
  setWeek: (week: WeekRange) => void;
  setFilters: (country: string, category: Category) => void;
}

export const useFilterStore = create<FilterState>()(
  persist(
    (set) => ({
      country: "Nigeria",
      category: "COMEDY",
      weekStartDate: AVAILABLE_WEEKS[0].weekStartDate,
      weekLabel: AVAILABLE_WEEKS[0].label,
      setCountry: (country: string) => {
        set({ country });
        // Update URL params
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("country", country);
          window.history.replaceState({}, "", url.toString());
        }
      },
      setCategory: (category: Category) => {
        set({ category });
        // Update URL params
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("category", category);
          window.history.replaceState({}, "", url.toString());
        }
      },
      setWeek: (week: WeekRange) => {
        set({ weekStartDate: week.weekStartDate, weekLabel: week.label });
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("week", week.weekStartDate);
          window.history.replaceState({}, "", url.toString());
        }
      },
      setFilters: (country: string, category: Category) => {
        set({ country, category });
        // Update URL params
        if (typeof window !== "undefined") {
          const url = new URL(window.location.href);
          url.searchParams.set("country", country);
          url.searchParams.set("category", category);
          window.history.replaceState({}, "", url.toString());
        }
      },
    }),
    {
      name: "creator-charts-filters", // localStorage key
    },
  ),
);

// Helper to sync URL params to store on page load
export const syncFiltersFromURL = () => {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const country = params.get("country");
    const category = params.get("category") as Category | null;
    const week = params.get("week");

    const store = useFilterStore.getState();

    if (country) {
      store.setCountry(country);
    }
    if (category) {
      store.setCategory(category);
    }
    if (week) {
      const match = AVAILABLE_WEEKS.find((w) => w.weekStartDate === week);
      if (match) {
        store.setWeek(match);
      }
    }
  }
};
