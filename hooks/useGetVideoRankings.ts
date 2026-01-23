"use client";

import { useQuery } from "@tanstack/react-query";
import {
  VideoRankingService,
  type CountryType,
} from "@/services/video-ranking.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch top videos for a country
 */
export const useGetTopVideos = (
  country: CountryType,
  enabled: boolean = true,
) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Top_Videos, country],
    queryFn: () => VideoRankingService.getTopVideos(country),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
    enabled: enabled && !!country,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    ranking: data?.data ?? null,
    videos: data?.data?.entries ?? [],
    refetch,
    error,
  };
};

/**
 * Hook to fetch viral videos for a country
 */
export const useGetViralVideos = (
  country: CountryType,
  enabled: boolean = true,
) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Viral_Videos, country],
    queryFn: () => VideoRankingService.getViralVideos(country),
    meta: {
      errCode: QueryErrCodes.Videos,
    },
    enabled: enabled && !!country,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    ranking: data?.data ?? null,
    videos: data?.data?.entries ?? [],
    refetch,
    error,
  };
};
