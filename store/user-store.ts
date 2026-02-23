/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import Cookies from "js-cookie";
import { decrypt, encrypt } from "@/services/encryption";
import { CreatorChartsRoutes } from "@/routes";

/**
 * Creator Data - matches CreatorDataDto from backend
 */

export interface UserData {
  _id?: string;
  id?: string;
  fullName?: string;
  displayName?: string;
  email: string;
  emailVerified?: boolean;
  preferredCurrency?: string;
  authProvider?: string;
  profileImage?: string | null;
  role?: string;
  status?: string;
  assignedCountries?: string[];
  assignedCategories?: string[];
  claimedCreatorId?: string | null;
  following?: string[];
  followingRequests?: string[];
  security?: {
    loginAttempts?: number;
    twoFactorEnabled?: boolean;
    notificationPreferences?: {
      email?: boolean;
      push?: boolean;
      sms?: boolean;
      creatorUpdates?: boolean;
    };
  };
  preferences?: {
    timezone?: string;
    language?: string;
    dateFormat?: string;
    theme?: string;
  };
  activity?: {
    createdCreatorsCount?: number;
    activityLog?: unknown[];
    notificationsCount?: number;
    lastActivity?: string;
  };
  creatorProfile?: {
    isCreatorVerified?: boolean;
    totalFollowers?: number;
    totalFollowing?: number;
  };
  accountClosedReason?: string | null;
  isDeleted?: boolean;
  isActive?: boolean;
  isOnline?: boolean;
  lastSeen?: string | null;
  termsAndConditionsAccepted?: boolean;
  loginAttempts?: number;
  isFirstLogin?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface UserAuthDetails {
  email: string;
  password: string;
}

interface UserState {
  userData: UserData | null;
  userAuthDetails: UserAuthDetails | null;
  preSaveUserData: Record<string, unknown> | null;
  token: string | null;
  isAuthenticated: boolean;
  saveUserToken: (token: string) => void;
  saveUserData: (data: UserData) => void;
  saveUserAuthDetails: (details: UserAuthDetails) => void;
  removeUserAuthDetails: () => void;
  rememberUserDetails: (details: Record<string, unknown>) => void;
  removeRememberUserDetails: () => void;
  removeUserData: () => void;
  loadUserData: () => void;
  logout: () => void;
}

const currentDate = new Date();
const newDate = new Date(currentDate);
newDate.setHours(currentDate.getHours() + 24); // 24-hour expiration

// Check if we're in browser environment
const isBrowser = typeof window !== "undefined";

// Function to save encrypted data in cookies
const saveToCookies = (
  key: string,
  data: Record<string, unknown> | UserData | UserAuthDetails | string | boolean,
): void => {
  if (!isBrowser) return;

  const encryptedData = encrypt(JSON.stringify(data));

  // Check cookie size before setting
  if (encryptedData.length > 3500) {
    console.warn(
      `⚠️ Cookie ${key} is too large:`,
      encryptedData.length,
      "bytes",
    );
  }

  Cookies.set(key, encryptedData, {
    httpOnly: false,
    expires: newDate,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

// Function to save data without encryption
const saveToCookiesWithoutEncryption = (key: string, data: string): void => {
  if (!isBrowser) return;

  Cookies.set(key, data, {
    httpOnly: false,
    expires: newDate,
    path: "/",
    secure: true,
    sameSite: "strict",
  });
};

// Function to get decrypted data from cookies
const getFromCookies = (key: string): Record<string, unknown> | null => {
  if (!isBrowser) return null;

  try {
    const cookieData = decrypt(Cookies.get(key));
    if (cookieData) {
      if (typeof cookieData == "string") {
        try {
          return JSON.parse(cookieData);
        } catch {
          return { value: cookieData };
        }
      } else {
        return cookieData;
      }
    }
  } catch (error) {
    console.error("Error reading cookie:", key, error);
  }
  return null;
};

// Function to get raw cookie data
const getRawCookie = (key: string): string | null => {
  if (!isBrowser) return null;
  return Cookies.get(key) || null;
};

// Function to remove data from cookies
const removeFromCookies = (key: string): void => {
  if (!isBrowser) return;
  Cookies.remove(key);
};

// Safe initialization functions
const initializeUserData = (): UserData | null => {
  if (!isBrowser) return null;
  return (getFromCookies("creator-charts:user") as unknown as UserData) ?? null;
};

const initializeToken = (): string | null => {
  if (!isBrowser) return null;
  const rawToken = getRawCookie("creator-charts:token");
  return rawToken ? decrypt(rawToken) : null;
};

// Zustand store using cookies
export const useStore = create<UserState>((set, get) => ({
  userData: initializeUserData(),
  userAuthDetails: null,
  preSaveUserData: null,
  token: initializeToken(),

  // Computed property for authentication status
  get isAuthenticated() {
    const state = get();
    return !!(state.userData && state.token);
  },

  saveUserData: (data: UserData) => {
    saveToCookies("creator-charts:user", data);
    set({ userData: data });
  },

  saveUserAuthDetails: (data: UserAuthDetails) => {
    saveToCookies("creator-charts:auth", data);
    set({ userAuthDetails: data });
  },

  removeUserAuthDetails: () => {
    removeFromCookies("creator-charts:auth");
    set({ userAuthDetails: null });
  },

  saveUserToken: (data: string) => {
    saveToCookies("creator-charts:token", data);
    set({ token: data });
  },

  rememberUserDetails: (data: Record<string, unknown>) => {
    saveToCookies("rememberMe", data);
    set({ preSaveUserData: data });
  },

  removeRememberUserDetails: () => {
    removeFromCookies("rememberMe");
    set({ preSaveUserData: null });
  },

  removeUserData: () => {
    removeFromCookies("creator-charts:user");
    set({ userData: null });
  },

  loadUserData: () => {
    if (!isBrowser) return;

    const userData = getFromCookies("creator-charts:user") as UserData | null;
    const token = initializeToken();

    console.log("🔄 Loading user data from cookies:", {
      hasUserData: !!userData,
      hasToken: !!token,
      userEmail: userData?.email || "none",
      displayName: userData?.displayName || userData?.fullName || "none",
    });

    set({
      userData,
      token,
    });
  },

  logout: () => {
    removeFromCookies("creator-charts:user");
    removeFromCookies("creator-charts:token");
    removeFromCookies("creator-charts:auth");
    set({
      userData: null,
      token: null,
      preSaveUserData: null,
      userAuthDetails: null,
    });
    // Redirect to sign-in page
    if (isBrowser) {
      window.location.href = CreatorChartsRoutes.SIGN_IN;
    }
  },
}));
