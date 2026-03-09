"use client";

import { useQuery } from "@tanstack/react-query";
import {
  VideoRankingService,
  type TopVideosFilters,
  type ViralVideosFilters,
} from "@/services/video-ranking.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch top videos with filters
 */
export const useGetTopVideos = (
  filters?: TopVideosFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Top_Videos, country, weekStartDate],
    queryFn: () => VideoRankingService.getTopVideos(filters),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    videos: data?.data?.data ?? [],
    pagination: data?.data
      ? {
          total: data.data.total,
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages,
        }
      : null,
    refetch,
    error,
  };
};

/**
 * Hook to fetch viral videos with filters
 */
export const useGetViralVideos = (
  filters?: ViralVideosFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate, platform } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Viral_Videos, country, weekStartDate, platform],
    queryFn: () => VideoRankingService.getViralVideos(filters),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    videos: data?.data?.data ?? [],
    pagination: data?.data
      ? {
          total: data.data.total,
          page: data.data.page,
          limit: data.data.limit,
          totalPages: data.data.totalPages,
        }
      : null,
    refetch,
    error,
  };
};

/**
 * Hook to fetch top videos highlights
 */
export const useGetTopVideosHighlights = (
  filters?: { country?: string; weekStartDate?: string },
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Top_Videos_Highlights, country, weekStartDate],
    queryFn: () => VideoRankingService.getTopVideosHighlights(filters),
    meta: { errCode: QueryErrCodes.Videos },
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isFetching,
    highlights: data?.data?.data ?? null,
    refetch,
    error,
  };
};

/**
 * Hook to fetch viral videos highlights
 */
export const useGetViralVideosHighlights = (
  filters?: { country?: string; weekStartDate?: string },
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Viral_Videos_Highlights, country, weekStartDate],
    queryFn: () => VideoRankingService.getViralVideosHighlights(filters),
    meta: { errCode: QueryErrCodes.Videos },
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isFetching,
    highlights: data?.data?.data ?? null,
    refetch,
    error,
  };
};
