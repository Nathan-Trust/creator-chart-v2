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
 * Creator info nested inside a ranking entry
 */
export interface RankingCreatorDto {
  _id: string;
  name: string;
  country: string;
  category: string;
  isClaimed: boolean;
  isVerified: boolean;
  socialHandles?: Record<string, string>;
  followerCount?: number;
  currentRank?: number | null;
  rankMovement?: string | null;
}

/**
 * Engagement breakdown
 */
export interface EngagementDto {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

/**
 * Platform-specific stats within a ranking entry
 */
export interface PlatformStatDto {
  followers: number;
  views: number;
  posts: number;
  engagement: EngagementDto;
  engagementRate: number;
}

/**
 * Score breakdown for a ranking entry
 */
export interface RankingScoresDto {
  cpi: number;
  topVideoScore?: number;
  viralVideoScore?: number;
  engagementScore?: number;
  viewsScore?: number;
  growthScore?: number;
  consistencyScore?: number;
}

/**
 * Video summary nested inside a ranking entry
 */
export interface RankingVideoDto {
  _id: string;
  title: string;
  platform: string;
  views: number;
  thumbnailUrl?: string;
  videoId?: string;
}

/**
 * A single ranking entry from GET /rankings
 */
export interface RankingEntryDto {
  _id: string;
  creatorId: RankingCreatorDto;
  weekStartDate: string;
  weekEndDate: string;
  country: string;
  cpiChange: number;
  engagement: EngagementDto;
  engagementRate: number;
  followers: number;
  followersGained: number;
  isCalculated: boolean;
  isPublished: boolean;
  platformStats: Record<string, PlatformStatDto>;
  postsCount: number;
  rankMovement: string; // "new" | "up" | "down" | "same"
  views: number;
  scores: RankingScoresDto;
  rank: number;
  previousRank: number | null;
  videos: RankingVideoDto[];
}

// ---------------------------------------------------------------------------
// Response types
// ---------------------------------------------------------------------------

export type GetRankingsResponse = PaginatedApiResponse<RankingEntryDto>;

/**
 * Rank history entry from GET /rankings/creator/:id/history
 */
export interface RankHistoryEntryDto {
  _id: string;
  rank: number;
  previousRank?: number | null;
  cpiScore: number;
  rankMovement: string;
  weekStartDate: string;
  weekEndDate: string;
  country: string;
  scores: RankingScoresDto;
}

export type GetCreatorHistoryResponse = ApiResponse<RankHistoryEntryDto[]>;

/**
 * GET /countries/active returns an array of country code strings
 */
export type GetActiveCountriesResponse = ApiResponse<string[]>;

/**
 * Weekly Stats entry from GET /rankings/weekly-stats
 */
export interface WeeklyStatsEntryDto {
  message: string;
  creator_name: string;
  category: string;
  country: string;
  week_start_date: string;
  rank: number;
  cpi_score: number;
  avatar?: string | null;
}

export type GetWeeklyStatsResponse = ApiResponse<WeeklyStatsEntryDto[]>;

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

export interface GetRankingsFilters extends PaginationParams {
  country?: string;
  category?: string;
  weekStartDate?: string;
  weekNumber?: number;
  year?: number;
}

export interface GetCreatorHistoryFilters {
  startDate?: string;
  endDate?: string;
}

export interface GetCountryRankingsFilters extends PaginationParams {
  weekStart?: string;
  category?: string;
}

export interface WeeklyStatsFilters {
  start_date?: string;
  end_date?: string;
  country?: string;
  category?: string;
}

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Ranking Service
 *
 * Endpoints:
 *  - GET  /rankings                          → paginated rankings
 *  - GET  /rankings/country/:country         → country-specific rankings
 *  - GET  /rankings/creator/:id/history      → creator rank history
 *  - GET  /rankings/admin/all                → admin all rankings
 *  - GET  /countries/active                  → active country codes
 *  - GET  /rankings/weekly-stats             → weekly stats for hero
 */
export class RankingService {
  /**
   * Get published rankings with optional filters
   */
  public static async getRankings(
    filters?: GetRankingsFilters,
  ): Promise<GetRankingsResponse> {
    const response: AxiosResponse<GetRankingsResponse> =
      await axiosInstance.get("/rankings", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get rankings for a specific country
   */
  public static async getCountryRankings(
    country: string,
    filters?: GetCountryRankingsFilters,
  ): Promise<GetRankingsResponse> {
    const response: AxiosResponse<GetRankingsResponse> =
      await axiosInstance.get(`/rankings/country/${country}`, {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get creator rank history
   */
  public static async getCreatorHistory(
    creatorId: string,
    filters?: GetCreatorHistoryFilters,
  ): Promise<GetCreatorHistoryResponse> {
    const response: AxiosResponse<GetCreatorHistoryResponse> =
      await axiosInstance.get(`/rankings/creator/${creatorId}/history`, {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get all rankings including PENDING (Admin only)
   */
  public static async getAllRankings(
    filters?: GetRankingsFilters & {
      status?: "PENDING" | "PUBLISHED" | "ARCHIVED";
    },
  ): Promise<GetRankingsResponse> {
    const response: AxiosResponse<GetRankingsResponse> =
      await axiosInstance.get("/rankings/admin/all", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get active countries
   */
  public static async getActiveCountries(): Promise<GetActiveCountriesResponse> {
    const response: AxiosResponse<GetActiveCountriesResponse> =
      await axiosInstance.get("/countries/active");
    return response.data;
  }

  /**
   * Get weekly stats for hero section
   */
  public static async getWeeklyStats(
    filters?: WeeklyStatsFilters,
  ): Promise<GetWeeklyStatsResponse> {
    const response: AxiosResponse<GetWeeklyStatsResponse> =
      await axiosInstance.get("/rankings/weekly-stats", {
        params: filters,
      });
    return response.data;
  }
}
