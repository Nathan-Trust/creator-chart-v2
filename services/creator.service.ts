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
}
