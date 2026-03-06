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

export interface CreatorPerformance30d {
  average_views?: number;
  views_trend?: string;
  engagement_rate?: number;
  engagement_trend?: string;
  growth_30d?: number;
  growth_trend?: string;
  posts_30d?: number;
  posts_per_day?: number;
}

export interface CreatorChartPerformance {
  peak_rank?: number;
  peak_rank_scope?: string;
  weeks_on_chart?: number;
  top_10_appearances?: number;
  peak_cpi_score?: number;
  cpi_change?: number;
}

export interface CreatorPlatformMetrics {
  fullName?: string;
  biography?: string;
  avatarUrl?: string;
  verified?: boolean;
  followers?: number;
  subscribers?: number;
  posts?: number;
  videos?: number;
  views?: number;
  tweets?: number;
  [key: string]: unknown;
}

export interface CreatorProfileDto {
  _id: string;
  name: string;
  displayName?: string;
  country: string;
  category: string;
  isVerifiedBadgeActive?: boolean;
  subscriptionTier?: string;
  debutEntryPosition?: number | null;
  debutEntryDate?: string | null;
  firstCPIAt?: string | null;
  firstRank?: number | null;
  firstRankAt?: string | null;
  peakCPI?: number | null;
  peakCPIAchievedAt?: string | null;
  peakRank?: number | null;
  peakRankAchievedAt?: string | null;
  currentRank?: number | null;
  currentCPI?: number | null;
  LW?: number | null;
  WOC?: number | null;
  rankMovement?: string | null;
  lastRankedAt?: string | null;
  isClaimed?: boolean;
  isVerified?: boolean;
  claimedBy?: string | null;
  claimedAt?: string | null;
  socialHandles?: CreatorSocialHandles;
  profileImageUrl?: string | null;
  bio?: string | null;
  website?: string | null;
  verification?: CreatorVerification;
  followers?: string[];
  followerCount?: number;
  metadata?: CreatorMetadata;
  createdAt?: string;
  updatedAt?: string;
  isFollowing?: boolean;
  instagramMetrics?: CreatorPlatformMetrics;
  tiktokMetrics?: CreatorPlatformMetrics;
  youtubeMetrics?: CreatorPlatformMetrics;
  xMetrics?: CreatorPlatformMetrics;
  facebookMetrics?: CreatorPlatformMetrics;
  performance_30d?: CreatorPerformance30d;
  chart_performance?: CreatorChartPerformance;
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
  weekStartDate?: string;
}

export interface UpdateCreatorProfileDto {
  name?: string;
  displayName?: string;
  country?: string;
  category?: string;
  socialHandles?: CreatorSocialHandles;
  profileImageUrl?: string;
  bio?: string;
  website?: string;
}

export interface UpdateCreatorProfileResponse {
  success: boolean;
  message: string;
  data: {
    success: boolean;
    message: string;
    creator: CreatorProfileDto;
  };
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
      await axiosInstance.get("/creators/profile/me");
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
      await axiosInstance.get(`/creators/${creatorId}`);
    return response.data;
  }

  /**
   * Get all creators with optional filters
   */
  public static async getAll(
    filters?: CreatorListFilters,
  ): Promise<CreatorListResponse> {
    const response: AxiosResponse<CreatorListResponse> =
      await axiosInstance.get("/creators", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Update authenticated creator's profile
   */
  public static async updateProfile(
    dto: UpdateCreatorProfileDto,
  ): Promise<UpdateCreatorProfileResponse> {
    const response: AxiosResponse<UpdateCreatorProfileResponse> =
      await axiosInstance.patch("/creators/profile/me", dto);
    return response.data;
  }
}
