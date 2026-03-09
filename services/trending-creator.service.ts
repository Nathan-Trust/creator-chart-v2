import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type { PaginatedApiResponse, PaginationParams } from "@/models/api";

// ---------------------------------------------------------------------------
// DTOs matching actual backend response shapes
// ---------------------------------------------------------------------------

/**
 * Minimal social-metrics shape – only the avatar URL is needed for display.
 */
export interface TrendingCreatorSocialMetricsDto {
  avatarUrl?: string;
  [key: string]: unknown;
}

/**
 * Creator info nested inside a trending-creator entry.
 *
 * The backend may populate the full creator document (including platform
 * metrics with avatar URLs) or return a lean subset.  Optional fields let us
 * gracefully pick up whatever is available.
 */
export interface TrendingCreatorInfoDto {
  _id?: string;
  name: string;
  displayName: string;
  verified: boolean;
  avatarUrl?: string;
  instagramMetrics?: TrendingCreatorSocialMetricsDto;
  xMetrics?: TrendingCreatorSocialMetricsDto;
  youtubeMetrics?: TrendingCreatorSocialMetricsDto;
  tiktokMetrics?: TrendingCreatorSocialMetricsDto;
  facebookMetrics?: TrendingCreatorSocialMetricsDto;
}

/**
 * Stats for a trending-creator entry
 */
export interface TrendingCreatorStatsDto {
  rankChange: number;
  cpiChange: number;
  cpi: number;
  followerGrowth: number;
  engagementVelocity: number;
  WOC: number;
  lastWeekRank: number | null;
  peakRank: number;
  totalWeeksOnChart: number;
  debutEntryRank: number;
  debutEntryDate: string;
}

/**
 * A single entry in the GET /trending-creators response
 */
export interface TrendingCreatorEntryDto {
  _id?: string;
  creatorId?: string;
  rank: number;
  creator: TrendingCreatorInfoDto;
  subtitle: string;
  country: string;
  change: string;
  badge: string;
  stats: TrendingCreatorStatsDto;
}

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

/**
 * Trending Creators query filters
 */
export interface TrendingCreatorsFilters extends PaginationParams {
  country?: string;
  weekStartDate?: string;
}

// ---------------------------------------------------------------------------
// Response type aliases
// ---------------------------------------------------------------------------

export type GetTrendingCreatorsResponse =
  PaginatedApiResponse<TrendingCreatorEntryDto>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Trending Creator Service
 *
 * Endpoints:
 *  - GET /trending-creators              → paginated trending creators
 */
export class TrendingCreatorService {
  /**
   * Get published trending creators (optionally filtered by country / week)
   */
  public static async getTrendingCreators(
    filters?: TrendingCreatorsFilters,
  ): Promise<GetTrendingCreatorsResponse> {
    const response: AxiosResponse<GetTrendingCreatorsResponse> =
      await axiosInstance.get("/trending-creators", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get trending creators highlights
   */
  public static async getHighlights(filters?: {
    country?: string;
    weekStartDate?: string;
  }): Promise<TrendingCreatorsHighlightsResponse> {
    const response: AxiosResponse<TrendingCreatorsHighlightsResponse> =
      await axiosInstance.get("/trending-creators/highlights", {
        params: filters,
      });
    return response.data;
  }
}

// ---------------------------------------------------------------------------
// Trending Creators Highlights DTOs
// ---------------------------------------------------------------------------

export interface TrendingHighlightEntryDto {
  name?: string;
  displayName?: string;
  verified?: boolean;
  rank?: number;
  WOC?: number;
  rankChange?: number;
  debutEntryRank?: number;
  peakRank?: number;
  totalWeeksOnChart?: number;
  lastWeekRank?: number | null;
  videoUrl?: string;
  thumbnailUrl?: string;
  message?: string;
}

export interface TrendingCreatorsHighlightsDataDto {
  highestNewEntry?: TrendingHighlightEntryDto | null;
  longestOnChart?: TrendingHighlightEntryDto | null;
  biggestGainer?: TrendingHighlightEntryDto | null;
}

export type TrendingCreatorsHighlightsResponse = {
  success: boolean;
  data: TrendingCreatorsHighlightsDataDto;
  message: string;
};
