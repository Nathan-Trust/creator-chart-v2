"use client";

import { useQuery } from "@tanstack/react-query";
import {
  VideoRankingService,
  type TopVideosFilters,
  type ViralVideosFilters,
  type VideoHighlightsFilters,
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
 * Hook to fetch top video highlights
 */
export const useGetTopVideoHighlights = (
  filters?: VideoHighlightsFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Top_Video_Highlights, country, weekStartDate],
    queryFn: () => VideoRankingService.getTopVideoHighlights(filters),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
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
 * Hook to fetch viral video highlights
 */
export const useGetViralVideoHighlights = (
  filters?: VideoHighlightsFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Viral_Video_Highlights, country, weekStartDate],
    queryFn: () => VideoRankingService.getViralVideoHighlights(filters),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
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
