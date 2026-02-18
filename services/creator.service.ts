import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

export interface CreatorSocialHandles {
  instagram?: string;
  tiktok?: string;
  youtube?: string;
  x?: string;
  twitter?: string;
  facebook?: string;
}

export interface CreatorVerification {
  verificationCodeSentAt?: string;
  verificationAttempts?: number;
  verificationMethod?: string;
  verifiedAt?: string | null;
}

export interface CreatorMetadata {
  isActive?: boolean;
  addedBy?: string;
  addedFrom?: string;
  lastValidated?: string;
  validationAttempts?: number;
}

export interface CreatorProfileDto {
  _id: string;
  name: string;
  country: string;
  category: string;
  isClaimed: boolean;
  isVerified: boolean;
  claimedBy?: string | null;
  claimedAt?: string | null;
  socialHandles?: CreatorSocialHandles;
  verification?: CreatorVerification;
  followers?: string[];
  followerCount?: number;
  metadata?: CreatorMetadata;
  lastRankedAt?: string | null;
  currentRank?: number | null;
  rankMovement?: string | null;
  createdAt?: string;
  updatedAt?: string;
  isFollowing?: boolean;
}

export interface CreatorProfileResponse {
  success: boolean;
  message: string;
  data: CreatorProfileDto;
}

export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface CreatorListResponseData {
  success: boolean;
  data: CreatorProfileDto[];
  pagination: PaginationMeta;
}

export interface CreatorListResponse {
  success: boolean;
  message: string;
  data: CreatorListResponseData;
}

export interface CreatorListFilters {
  page?: number;
  limit?: number;
  country?: string;
  category?: string;
}

/**
 * Creator Service
 */
export class CreatorService {
  /**
   * Get current creator profile
   * Requires authentication
   */
  public static async getProfile(): Promise<CreatorProfileResponse> {
    const response: AxiosResponse<CreatorProfileResponse> =
      await axiosInstance.get("/creator/me");
    return response.data;
  }

  /**
   * Get creator profile by ID
   * Public endpoint - no authentication required
   */
  public static async getProfileById(
    creatorId: string,
  ): Promise<CreatorProfileResponse> {
    const response: AxiosResponse<CreatorProfileResponse> =
      await axiosInstance.get(`/creator/${creatorId}/profile`);
    return response.data;
  }

  /**
   * Get all creators with pagination
   */
  public static async getAllCreators(
    filters?: CreatorListFilters,
  ): Promise<CreatorListResponse> {
    const response: AxiosResponse<CreatorListResponse> =
      await axiosInstance.get("/creator/all-creators", {
        params: filters,
      });
    return response.data;
  }
}
