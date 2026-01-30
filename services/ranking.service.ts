import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

/**
 * Creator Summary DTO (used in rankings)
 */
export interface CreatorSummaryDto {
  id: string;
  display_name: string;
  avatar?: string;
  country: string;
  category: string;
  is_verified: boolean;
}

/**
 * Ranking Entry DTO
 */
export interface RankingEntryDto {
  id: string;
  ranking_id: string;
  creator_id: string;
  rank: number;
  previous_rank?: number;
  cpi_score: number;
  movement: "UP" | "DOWN" | "SAME" | "NEW";
  creator: CreatorSummaryDto;
}

/**
 * Weekly Ranking DTO
 */
export interface WeeklyRankingDto {
  id: string;
  week_number: number;
  year: number;
  country: string;
  category: string;
  status: "PENDING" | "PUBLISHED";
  published_at?: string;
  locked: boolean;
  entries: RankingEntryDto[];
}

/**
 * Get Rankings Response
 */
export interface GetRankingsResponse {
  message: string;
  data: WeeklyRankingDto[];
}

/**
 * Rank History Entry DTO
 */
export interface RankHistoryEntryDto {
  id: string;
  rank: number;
  previous_rank?: number;
  cpi_score: number;
  movement: "UP" | "DOWN" | "SAME" | "NEW";
  ranking: {
    week_number: number;
    year: number;
    country: string;
    category: string;
    status: string;
    published_at: string;
  };
}

/**
 * Get Creator History Response
 */
export interface GetCreatorHistoryResponse {
  message: string;
  data: RankHistoryEntryDto[];
}

/**
 * Active Country DTO
 */
export interface ActiveCountryDto {
  country: string;
  rollout_date: string;
}

/**
 * Get Active Countries Response
 */
export interface GetActiveCountriesResponse {
  message: string;
  data: ActiveCountryDto[];
}

/**
 * Weekly Stats Entry DTO
 */
export interface WeeklyStatsEntryDto {
  message: string;
  creator_name: string;
  category: string;
  country: string;
  week_start_date: string;
  rank: number;
  cpi_score: number;
  avatar?: string;
}

/**
 * Get Weekly Stats Response
 */
export interface GetWeeklyStatsResponse {
  success: boolean;
  message: string;
  data: WeeklyStatsEntryDto[];
}

/**
 * Weekly Stats Filters
 */
export interface WeeklyStatsFilters {
  start_date?: string;
  end_date?: string;
  country?: string;
  category?: string;
}

/**
 * Get Rankings Filters
 */
export interface GetRankingsFilters {
  country?: string;
  category?:
    | "COMEDY"
    | "LIFESTYLE"
    | "TECH"
    | "MUSIC"
    | "GAMING"
    | "BUSINESS"
    | "EDUCATION";
  weekNumber?: number;
  year?: number;
}

/**
 * Get Creator History Filters
 */
export interface GetCreatorHistoryFilters {
  startDate?: string; // ISO 8601 format
  endDate?: string; // ISO 8601 format
}

/**
 * Ranking Service
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
