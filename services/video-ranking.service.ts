import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type { PaginatedApiResponse, PaginationParams } from "@/models/api";

// ---------------------------------------------------------------------------
// DTOs matching actual backend response shape (restructured Feb 2026)
// ---------------------------------------------------------------------------

/**
 * Video info object nested inside a ranking entry
 */
export interface VideoInfoDto {
  title: string;
  thumbnailUrl?: string;
  videoUrl?: string;
  platform: string;
}

/**
 * Creator info nested inside a video ranking entry
 */
export interface VideoCreatorDto {
  name: string;
  username: string;
  verified: boolean;
}

/**
 * Engagement breakdown on a video
 */
export interface VideoEngagementDto {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  _id?: string;
}

/**
 * Stats for a top-video entry
 */
export interface TopVideoStatsDto {
  views: number;
  engagement: VideoEngagementDto;
  engagementRate?: number;
}

/**
 * Stats for a viral-video entry (different shape from top-video)
 */
export interface ViralVideoStatsDto {
  views: number;
  shares: number;
  engagementRate: number;
  growthRate: number;
}

/**
 * Chart position info shared by both top and viral video entries
 */
export interface VideoChartDto {
  lastWeekRank: number | null;
  peakRank: number;
  weeksOnChart: number;
  rankMovement: string; // "new" | "up" | "down" | "same"
  debutEntryRank: number;
  debutEntryDate: string;
}

/**
 * A single entry in the GET /top-videos response
 */
export interface TopVideoEntryDto {
  rank: number;
  video: VideoInfoDto;
  creator: VideoCreatorDto;
  stats: TopVideoStatsDto;
  chart: VideoChartDto;
  score: number;
}

/**
 * A single entry in the GET /viral-videos response
 */
export interface ViralVideoEntryDto {
  rank: number;
  video: VideoInfoDto;
  creator: VideoCreatorDto;
  stats: ViralVideoStatsDto;
  chart: VideoChartDto;
  score: number;
}

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

/**
 * Top Videos query filters
 */
export interface TopVideosFilters extends PaginationParams {
  country?: string;
  weekStartDate?: string;
}

/**
 * Viral Videos query filters
 */
export interface ViralVideosFilters extends PaginationParams {
  country?: string;
  weekStartDate?: string;
  platform?: string;
}

// ---------------------------------------------------------------------------
// Response type aliases
// ---------------------------------------------------------------------------

export type GetTopVideosResponse = PaginatedApiResponse<TopVideoEntryDto>;
export type GetViralVideosResponse = PaginatedApiResponse<ViralVideoEntryDto>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Video Ranking Service
 *
 * Endpoints:
 *  - GET /top-videos              → paginated top video rankings
 *  - GET /viral-videos            → paginated viral video rankings
 */
export class VideoRankingService {
  /**
   * Get published top videos (optionally filtered by country / week)
   */
  public static async getTopVideos(
    filters?: TopVideosFilters,
  ): Promise<GetTopVideosResponse> {
    const response: AxiosResponse<GetTopVideosResponse> =
      await axiosInstance.get("/top-videos", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get published viral videos (optionally filtered by country / week / platform)
   */
  public static async getViralVideos(
    filters?: ViralVideosFilters,
  ): Promise<GetViralVideosResponse> {
    const response: AxiosResponse<GetViralVideosResponse> =
      await axiosInstance.get("/viral-videos", {
        params: filters,
      });
    return response.data;
  }
}
