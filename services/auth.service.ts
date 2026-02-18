import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type { UserData } from "@/store/user-store";

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  errorCode?: string;
  appErrorCode?: string;
}

export interface AuthUser {
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

export interface CreatorSocialHandles {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  x?: string;
  twitter?: string;
  facebook?: string;
}

export interface CreatorProfile {
  _id: string;
  name: string;
  country: string;
  category: string;
  isClaimed?: boolean;
  isVerified?: boolean;
  claimedBy?: string | null;
  claimedAt?: string | null;
  socialHandles?: CreatorSocialHandles;
  verification?: {
    verificationCodeSentAt?: string;
    verificationAttempts?: number;
    verificationMethod?: string;
    verifiedAt?: string | null;
  };
  followers?: string[];
  followerCount?: number;
  metadata?: {
    isActive?: boolean;
    addedBy?: string;
    addedFrom?: string;
    lastValidated?: string;
    validationAttempts?: number;
  };
  lastRankedAt?: string | null;
  currentRank?: number | null;
  rankMovement?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthSessionPayload {
  user?: AuthUser;
  creator?: CreatorProfile;
  accessToken?: string;
  verificationCode?: string;
  message?: string;
}

export interface SignupUserDto {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  displayName?: string;
  termsAndConditionsAccepted: boolean;
}

export interface SignupCreatorDto extends SignupUserDto {
  country: string;
  category: string;
  socialHandles?: CreatorSocialHandles;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RequestEmailVerificationDto {
  email: string;
}

export interface VerifyEmailOtpDto {
  email: string;
  code: number | string;
}

export interface ResetPasswordDto {
  email: string;
  code: number | string;
  password: string;
  confirmPassword: string;
}

export interface VerifyCreatorDto {
  creatorId: string;
  code: string;
}

const splitName = (fullName?: string) => {
  if (!fullName) {
    return { firstName: "", lastName: "" };
  }

  const parts = fullName.trim().split(/\s+/);
  const firstName = parts.shift() || "";
  return { firstName, lastName: parts.join(" ") };
};

export const mapAuthToUserData = (
  user?: AuthUser,
  creator?: CreatorProfile,
): UserData | null => {
  if (!user && !creator) return null;

  const fullName = user?.fullName || creator?.name || "";
  const { firstName, lastName } = splitName(fullName);

  return {
    id: creator?._id || user?._id || user?.id || "",
    first_name: firstName,
    last_name: lastName,
    email: user?.email || "",
    display_name: user?.displayName || creator?.name || firstName,
    country: creator?.country || "",
    category: creator?.category || "",
    role: user?.role,
    avatar: user?.profileImage || undefined,
    tiktok_handle: creator?.socialHandles?.tiktok,
    instagram_handle: creator?.socialHandles?.instagram,
    youtube_handle: creator?.socialHandles?.youtube,
    x_twitter_handle:
      creator?.socialHandles?.x || creator?.socialHandles?.twitter,
    is_verified: creator?.isVerified ?? user?.emailVerified ?? false,
    is_claimed: creator?.isClaimed ?? false,
    created_at: creator?.createdAt || user?.createdAt || "",
    updated_at: creator?.updatedAt || user?.updatedAt || "",
  };
};

/**
 * Auth Service for authentication
 */
export class AuthService {
  /**
   * Register a new user
   */
  public static async signupUser(
    dto: SignupUserDto,
  ): Promise<ApiResponse<AuthSessionPayload>> {
    const response: AxiosResponse<ApiResponse<AuthSessionPayload>> =
      await axiosInstance.post("/auth/user/signup", dto);
    return response.data;
  }

  /**
   * Register a new creator
   */
  public static async signupCreator(
    dto: SignupCreatorDto,
  ): Promise<ApiResponse<AuthSessionPayload>> {
    const response: AxiosResponse<ApiResponse<AuthSessionPayload>> =
      await axiosInstance.post("/auth/creator/signup", dto);
    return response.data;
  }

  /**
   * Login
   */
  public static async login(
    dto: LoginDto,
  ): Promise<ApiResponse<AuthSessionPayload>> {
    const response: AxiosResponse<ApiResponse<AuthSessionPayload>> =
      await axiosInstance.post("/auth/login", dto);
    return response.data;
  }

  /**
   * Request email verification
   */
  public static async requestEmailVerification(
    dto: RequestEmailVerificationDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const response: AxiosResponse<ApiResponse<{ message: string }>> =
      await axiosInstance.post("/auth/verify-email", dto);
    return response.data;
  }

  /**
   * Verify email with OTP
   */
  public static async verifyEmailOtp(
    dto: VerifyEmailOtpDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const response: AxiosResponse<ApiResponse<{ message: string }>> =
      await axiosInstance.post("/auth/verify-email/otp", dto);
    return response.data;
  }

  /**
   * Forgot password
   */
  public static async forgotPassword(
    dto: RequestEmailVerificationDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const response: AxiosResponse<ApiResponse<{ message: string }>> =
      await axiosInstance.post("/auth/forgot-password", dto);
    return response.data;
  }

  /**
   * Reset password
   */
  public static async resetPassword(
    dto: ResetPasswordDto,
  ): Promise<ApiResponse<{ message: string }>> {
    const response: AxiosResponse<ApiResponse<{ message: string }>> =
      await axiosInstance.post("/auth/reset-password", dto);
    return response.data;
  }

  /**
   * Verify creator profile with verification code
   */
  public static async verifyCreator(
    dto: VerifyCreatorDto,
  ): Promise<ApiResponse<{ message: string; creator?: CreatorProfile }>> {
    const response: AxiosResponse<
      ApiResponse<{ message: string; creator?: CreatorProfile }>
    > = await axiosInstance.post(`/creator/${dto.creatorId}/verify`, {
      code: dto.code,
    });
    return response.data;
  }

  /**
   * Logout (client-side cookie cleanup)
   */
  public static logout(): void {
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
  }
}
