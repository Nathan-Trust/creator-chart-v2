import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

/**
 * Video Creator DTO
 */
export interface VideoCreatorDto {
  id: string;
  display_name: string;
  avatar?: string;
  country: string;
  category: string;
  is_verified: boolean;
}

/**
 * Video DTO
 */
export interface VideoDto {
  id: string;
  creator_id: string;
  platform: string;
  platform_video_id: string;
  video_url?: string;
  thumbnail?: string;
  title?: string;
  posted_at: string;
  creator: VideoCreatorDto;
}

/**
 * Video Ranking Entry DTO
 */
export interface VideoRankingEntryDto {
  id: string;
  ranking_id: string;
  video_id: string;
  rank: number;
  score: number;
  weekly_views: number;
  weekly_engagement: number;
  consistency_score?: number;
  view_growth_rate?: number;
  engagement_velocity?: number;
  share_rate?: number;
  movement: "UP" | "DOWN" | "SAME" | "NEW";
  previous_rank?: number;
  video: VideoDto;
}

/**
 * Video Ranking DTO
 */
export interface VideoRankingDto {
  id: string;
  week_number: number;
  year: number;
  country: string;
  ranking_type: "TOP" | "VIRAL";
  status: "PENDING" | "PUBLISHED" | "DRAFT";
  published_at?: string;
  entries: VideoRankingEntryDto[];
}

/**
 * Get Video Rankings Response
 */
export interface GetVideoRankingsResponse {
  message: string;
  data: VideoRankingDto;
}

/**
 * Country type
 */
export type CountryType = string;

/**
 * Top Videos Filters
 */
export interface TopVideosFilters {
  country?: string;
  weekStartDate?: string;
}

/**
 * Viral Videos Filters
 */
export interface ViralVideosFilters {
  country?: string;
  weekStartDate?: string;
  platform?: string;
}

/**
 * Video Ranking Service
 */
export class VideoRankingService {
  /**
   * Get published top videos for a country
   */
  public static async getTopVideos(
    filters?: TopVideosFilters,
  ): Promise<GetVideoRankingsResponse> {
    const response: AxiosResponse<GetVideoRankingsResponse> =
      await axiosInstance.get("/rankings/top-videos", {
        params: filters,
      });
    return response.data;
  }

  /**
   * Get published viral videos for a country
   */
  public static async getViralVideos(
    filters?: ViralVideosFilters,
  ): Promise<GetVideoRankingsResponse> {
    const response: AxiosResponse<GetVideoRankingsResponse> =
      await axiosInstance.get("/rankings/viral-videos", {
        params: filters,
      });
    return response.data;
  }
}
