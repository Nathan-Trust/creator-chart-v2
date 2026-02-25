import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type { PaginatedApiResponse, PaginationParams } from "@/models/api";

// ---------------------------------------------------------------------------
// DTOs matching actual backend response shape
// ---------------------------------------------------------------------------

/**
 * Creator info nested inside a video ranking entry
 */
export interface VideoCreatorDto {
  _id: string;
  name: string;
  isVerified: boolean;
  country?: string;
  category?: string;
  socialHandles?: Record<string, string>;
}

/**
 * Engagement breakdown on a video
 */
export interface VideoEngagementDto {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

/**
 * A single video entry in the top-videos / viral-videos response
 */
export interface VideoRankingEntryDto {
  _id: string;
  country: string;
  videoId: string;
  weekStartDate: string;
  weekEndDate: string;
  creatorId: VideoCreatorDto;
  engagement: VideoEngagementDto;
  engagementRate: number;
  isPublished: boolean;
  platform: string;
  rank: number;
  thumbnailUrl?: string;
  title: string;
  topVideoScore: number;
  viralVideoScore?: number;
  views: number;
  publishedAt?: string;
  publishedBy?: string;
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
// Response type alias
// ---------------------------------------------------------------------------

export type GetVideoRankingsResponse =
  PaginatedApiResponse<VideoRankingEntryDto>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

/**
 * Video Ranking Service
 *
 * Endpoints:
 *  - GET /top-videos      → paginated top video rankings
 *  - GET /viral-videos    → paginated viral video rankings
 */
export class VideoRankingService {
  /**
   * Get published top videos (optionally filtered by country / week)
   */
  public static async getTopVideos(
    filters?: TopVideosFilters,
  ): Promise<GetVideoRankingsResponse> {
    const response: AxiosResponse<GetVideoRankingsResponse> =
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
  ): Promise<GetVideoRankingsResponse> {
    const response: AxiosResponse<GetVideoRankingsResponse> =
      await axiosInstance.get("/viral-videos", {
        params: filters,
      });
    return response.data;
  }
}
