import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";
import type { ApiResponse } from "@/models/api";

// ---------------------------------------------------------------------------
// DTOs matching the unified /highlights endpoint response
// ---------------------------------------------------------------------------

export interface HighlightEntryDto {
  title?: string;
  image?: string;
  weekstart?: string;
  weekend?: string;
  [key: string]: unknown;
}

export interface HighlightsSectionDto {
  highestNewEntry?: HighlightEntryDto;
  biggestGainer?: HighlightEntryDto | null;
  longestOnChart?: HighlightEntryDto | null;
  mostChartingVideos?: HighlightEntryDto | null;
  [key: string]: unknown;
}

export interface AllHighlightsDto {
  topCreators?: HighlightsSectionDto;
  topVideos?: HighlightsSectionDto;
  viralVideos?: HighlightsSectionDto;
}

// ---------------------------------------------------------------------------
// Filter types
// ---------------------------------------------------------------------------

export type HighlightType = "creators" | "top-videos" | "viral-videos";

export interface HighlightsFilters {
  type?: HighlightType;
  country?: string;
  weekStartDate?: string;
}

// ---------------------------------------------------------------------------
// Response type
// ---------------------------------------------------------------------------

export type GetHighlightsResponse = ApiResponse<{
  success: boolean;
  data: AllHighlightsDto;
  message: string;
}>;

// ---------------------------------------------------------------------------
// Service
// ---------------------------------------------------------------------------

export class HighlightsService {
  public static async getHighlights(
    filters?: HighlightsFilters,
  ): Promise<GetHighlightsResponse> {
    const response: AxiosResponse<GetHighlightsResponse> =
      await axiosInstance.get("/highlights", {
        params: filters,
      });
    return response.data;
  }
}
