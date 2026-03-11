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
export interface SocialMetricsDto {
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
}

export interface RankingCreatorDto {
  _id: string;
  name: string;
  country: string;
  category: string;
  isClaimed: boolean;
  isVerified: boolean;
  isVerifiedBadgeActive?: boolean;
  subscriptionTier?: string;
  socialHandles?: Record<string, string>;
  followerCount?: number;
  totalSocialFollowers?: number;
  totalPlatforms?: number;
  currentRank?: number | null;
  rankMovement?: string | null;
  peakRank?: number | null;
  peakCPI?: number | null;
  peakCPIAchievedAt?: string;
  peakRankAchievedAt?: string;
  LW?: number | null;
  WOC?: number | null;
  currentCPI?: number | null;
  debutEntryDate?: string;
  debutEntryPosition?: number | null;
  firstCPIAt?: string;
  firstRank?: number | null;
  firstRankAt?: string;
  lastRankedAt?: string;
  instagramMetrics?: SocialMetricsDto;
  xMetrics?: SocialMetricsDto;
  youtubeMetrics?: SocialMetricsDto;
  tiktokMetrics?: SocialMetricsDto;
  facebookMetrics?: SocialMetricsDto;
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
  views: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  posts: number;
  _id?: string;
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
  videoId?: string;
  platform: string;
  url?: string;
  title?: string;
  thumbnailUrl?: string;
  views: number;
  publishedAt?: string;
  duration?: number;
  growthRate?: number;
  shareRate?: number;
  metricsFetchedAt?: string;
  isHighEngagement?: boolean;
  engagement?: EngagementDto;
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
  metadata?: {
    scrapedAt?: string;
    source?: string;
  };
  platformStats: Record<string, PlatformStatDto>;
  postsCount: number;
  rankMovement: string; // "new" | "up" | "down" | "same" | "—"
  views: number;
  scores: RankingScoresDto;
  rank: number;
  previousRank?: number | null;
  videos: RankingVideoDto[];
  createdAt?: string;
  updatedAt?: string;
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
   * Get rankings highlights (top creators)
   */
  public static async getHighlights(filters?: {
    country?: string;
    weekStartDate?: string;
  }): Promise<ApiResponse<RankingsHighlightsDto>> {
    const response: AxiosResponse<ApiResponse<RankingsHighlightsDto>> =
      await axiosInstance.get("/rankings/highlights", {
        params: filters,
      });
    return response.data;
  }
}

// ---------------------------------------------------------------------------
// Rankings Highlights DTOs
// ---------------------------------------------------------------------------

export interface RankingsHighlightEntryDto {
  creatorId?: string;
  creatorName?: string;
  platformAvatar?: string | null;
  rank?: number;
  weeksOnChart?: number;
  message?: string;
  video?: {
    title?: string;
    thumbnailUrl?: string;
    videoUrl?: string;
  };
}

export interface RankingsHighlightsDto {
  weekStartDate?: string;
  weekEndDate?: string;
  country?: string;
  highestNewEntry?: RankingsHighlightEntryDto | null;
  longestOnChart?: RankingsHighlightEntryDto | null;
  biggestGainer?: RankingsHighlightEntryDto | null;
  mostChartingVideos?: RankingsHighlightEntryDto | null;
}
