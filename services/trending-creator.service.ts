import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type {
  ApiResponse,
  PaginatedApiResponse,
  PaginationParams,
} from "@/models/api";

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
  rank: number;
  creator: TrendingCreatorInfoDto;
  subtitle: string;
  country: string;
  change: string;
  badge: string;
  stats: TrendingCreatorStatsDto;
}

// ---------------------------------------------------------------------------
// Highlights DTOs
// ---------------------------------------------------------------------------

/**
 * Highlights response from GET /trending-creators/highlights
 */
export interface TrendingCreatorHighlightsDto {
  highestNewEntry?: {
    name?: string;
    displayName?: string;
    verified?: boolean;
    rank?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
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

/**
 * Highlights query filters
 */
export interface TrendingCreatorHighlightsFilters {
  country?: string;
  weekStartDate?: string;
}

// ---------------------------------------------------------------------------
// Response type aliases
// ---------------------------------------------------------------------------

export type GetTrendingCreatorsResponse =
  PaginatedApiResponse<TrendingCreatorEntryDto>;

export type GetTrendingCreatorHighlightsResponse =
  ApiResponse<TrendingCreatorHighlightsDto>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Trending Creator Service
 *
 * Endpoints:
 *  - GET /trending-creators              → paginated trending creators
 *  - GET /trending-creators/highlights   → trending creator highlights / summary
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
   * Get trending creator highlights / summary for a country + week
   */
  public static async getTrendingCreatorHighlights(
    filters?: TrendingCreatorHighlightsFilters,
  ): Promise<GetTrendingCreatorHighlightsResponse> {
    const response: AxiosResponse<GetTrendingCreatorHighlightsResponse> =
      await axiosInstance.get("/trending-creators/highlights", {
        params: filters,
      });
    return response.data;
  }
}
