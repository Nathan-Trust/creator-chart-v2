/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

/**
 * Creator Registration DTO
 */
export interface RegisterCreatorDto {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  display_name: string;
  country: "Nigeria" | "Ghana" | "South_Africa" | "Kenya";
  category:
    | "COMEDY"
    | "LIFESTYLE"
    | "TECH"
    | "MUSIC"
    | "GAMING"
    | "BUSINESS"
    | "EDUCATION";
  avatar?: string;
  tiktok_handle?: string;
  instagram_handle?: string;
  youtube_handle?: string;
  x_twitter_handle?: string;
}

/**
 * Creator Login DTO
 */
export interface LoginCreatorDto {
  email: string;
  password: string;
}

/**
 * Request Verification DTO
 */
export interface RequestVerificationDto {
  platform: "tiktok" | "instagram" | "youtube" | "x_twitter";
}

/**
 * Verify Profile DTO
 */
export interface VerifyProfileDto {
  platform: "tiktok" | "instagram" | "youtube" | "x_twitter";
  verification_code: string;
}

/**
 * API Response wrapper
 */
export interface ApiResponse<T> {
  message: string;
  data?: T;
}

/**
 * Auth Service for Creator authentication
 */
export class AuthService {
  /**
   * Register a new creator
   */
  public static async register(
    dto: RegisterCreatorDto,
  ): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
      "/creators/register",
      dto,
    );
    return response.data;
  }

  /**
   * Login creator
   * Sets JWT token in HTTP-only cookie
   */
  public static async login(dto: LoginCreatorDto): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
      "/creators/login",
      dto,
    );
    return response.data;
  }

  /**
   * Request profile verification
   * Generates a verification code that must be added to the creator's bio
   */
  public static async requestVerification(
    dto: RequestVerificationDto,
  ): Promise<ApiResponse<{ verification_code: string; expires_at: string }>> {
    const response: AxiosResponse<
      ApiResponse<{ verification_code: string; expires_at: string }>
    > = await axiosInstance.post("/creators/request-verification", dto);
    return response.data;
  }

  /**
   * Verify profile with verification code
   */
  public static async verifyProfile(
    dto: VerifyProfileDto,
  ): Promise<ApiResponse<any>> {
    const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
      "/creators/verify-profile",
      dto,
    );
    return response.data;
  }

  /**
   * Logout creator (client-side cookie cleanup)
   */
  public static logout(): void {
    // The JWT is in HTTP-only cookie, so we just redirect
    // The server will handle cookie invalidation
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
  }
}
