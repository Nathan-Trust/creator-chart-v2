import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

/**
 * Creator Data DTO
 */
export interface CreatorDataDto {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  display_name: string;
  country: string;
  category: string;
  avatar?: string;
  tiktok_handle?: string;
  instagram_handle?: string;
  youtube_handle?: string;
  x_twitter_handle?: string;
  is_verified: boolean;
  is_claimed: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Creator Profile Response
 */
export interface CreatorProfileResponse {
  message: string;
  data: CreatorDataDto;
}

/**
 * Social Media Links
 */
export interface SocialMediaLinks {
  youtube?: string;
  instagram?: string;
  twitter?: string;
  tiktok?: string;
}

/**
 * Performance 30 Days
 */
export interface Performance30d {
  average_views: number;
  views_trend: string;
  engagement_rate: number;
  engagement_trend: string;
  growth_30d: number;
  growth_trend: string;
  posts_30d: number;
  posts_per_day: number;
}

/**
 * Chart Performance
 */
export interface ChartPerformance {
  peak_rank: number;
  peak_rank_scope: string;
  weeks_on_chart: number;
  top_10_appearances: number;
  peak_cpi_score: number;
  cpi_change: number;
}

/**
 * Weekly Chart
 */
export interface WeeklyChart {
  chart_name: string;
  rank: number;
}

/**
 * Country Ranking
 */
export interface CountryRanking {
  country: string;
  chart_name: string;
  chart_type: string;
  debut_date: string;
  peak_position: number;
  peak_date: string;
  cpi_score: number;
}

/**
 * Full Creator Profile Data
 */
export interface CreatorFullProfileData {
  id: string;
  display_name: string;
  bio?: string;
  avatar?: string;
  country: string;
  category: string;
  is_verified: boolean;
  followers: string;
  monthly_visitors: number;
  social_media: SocialMediaLinks;
  performance_30d: Performance30d;
  chart_performance: ChartPerformance;
  weekly_charts: WeeklyChart[];
  country_rankings: CountryRanking[];
}

/**
 * Full Creator Profile Response
 */
export interface CreatorFullProfileResponse {
  message: string;
  data: CreatorFullProfileData;
}

/**
 * Creator Service
 */
export class CreatorService {
  /**
   * Get current creator profile
   * Requires authentication (cookie-based JWT)
   */
  public static async getProfile(): Promise<CreatorProfileResponse> {
    const response: AxiosResponse<CreatorProfileResponse> =
      await axiosInstance.get("/creators/me");
    return response.data;
  }

  /**
   * Get creator profile by ID
   * Public endpoint - no authentication required
   */
  public static async getProfileById(
    creatorId: string,
  ): Promise<CreatorFullProfileResponse> {
    const response: AxiosResponse<CreatorFullProfileResponse> =
      await axiosInstance.get(`/creators/${creatorId}/profile`);
    return response.data;
  }
}
