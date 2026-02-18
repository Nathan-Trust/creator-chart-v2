import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

export type ApifyPlatform =
  | "instagram"
  | "tiktok"
  | "youtube"
  | "x"
  | "facebook";

export interface ApifyFetchRequest {
  platform: ApifyPlatform;
  handle: string;
}

export interface ApifyRecentPost {
  id: string;
  url: string;
  caption?: string;
  thumbnail?: string | null;
  publishedAt?: string;
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
}

export interface ApifyProfile {
  fullName?: string;
  biography?: string;
  avatarUrl?: string;
  verified?: boolean;
}

export interface ApifyMetrics {
  views?: number;
  likes?: number;
  comments?: number;
  shares?: number;
  followers?: number;
  posts?: number;
  recentPosts?: ApifyRecentPost[];
  profile?: ApifyProfile;
}

export interface ApifyFetchResponseData {
  platform: ApifyPlatform;
  handle: string;
  metrics: ApifyMetrics;
}

export interface ApifyFetchResponse {
  success: boolean;
  message: string;
  data: ApifyFetchResponseData;
}

export class ApifyService {
  public static async fetchMetrics(
    dto: ApifyFetchRequest,
  ): Promise<ApifyFetchResponse> {
    const response: AxiosResponse<ApifyFetchResponse> =
      await axiosInstance.post("/apify/fetch", dto);
    return response.data;
  }
}
