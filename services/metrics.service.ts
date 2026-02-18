import axiosInstance from "@/lib/api-client";
import type { AxiosResponse } from "axios";

export interface WeeklyEngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface WeeklyMetricsMetadata {
  scrapedAt?: string;
  source?: string;
}

export interface WeeklyMetrics {
  _id: string;
  creatorId: string;
  calculatedAt?: string;
  createdAt?: string;
  updatedAt?: string;
  engagement: WeeklyEngagementMetrics;
  engagementRate: number;
  followersGained: number;
  isCalculated: boolean;
  isPublished: boolean;
  metadata?: WeeklyMetricsMetadata;
  postsCount: number;
  rankMovement?: string;
  videos?: unknown[];
  views: number;
  weekEndDate: string;
  weekStartDate: string;
}

export interface WeeklyMetricsResponseData {
  success: boolean;
  message: string;
  metrics: WeeklyMetrics;
}

export interface WeeklyMetricsResponse {
  success: boolean;
  message: string;
  data: WeeklyMetricsResponseData;
}

export class MetricsService {
  public static async collectWeeklyMetrics(
    creatorId: string,
  ): Promise<WeeklyMetricsResponse> {
    const response: AxiosResponse<WeeklyMetricsResponse> =
      await axiosInstance.get(`/weekly-metrics/collect/${creatorId}`);
    return response.data;
  }
}
