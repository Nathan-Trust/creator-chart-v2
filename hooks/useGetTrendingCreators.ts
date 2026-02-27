"use client";

import { useQuery } from "@tanstack/react-query";
import {
  TrendingCreatorService,
  type TrendingCreatorsFilters,
  type TrendingCreatorHighlightsFilters,
} from "@/services/trending-creator.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch trending creators with filters
 */
export const useGetTrendingCreators = (
  filters?: TrendingCreatorsFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Trending_Creator_List, country, weekStartDate],
    queryFn: () => TrendingCreatorService.getTrendingCreators(filters),
    meta: {
      errCode: QueryErrCodes.Trending_Creators,
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    creators: data?.data?.data ?? [],
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
 * Hook to fetch trending creator highlights
 */
export const useGetTrendingCreatorHighlights = (
  filters?: TrendingCreatorHighlightsFilters,
  enabled: boolean = true,
) => {
  const { country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [
      QueryKeys.Get_Trending_Creator_Highlights,
      country,
      weekStartDate,
    ],
    queryFn: () => TrendingCreatorService.getTrendingCreatorHighlights(filters),
    meta: {
      errCode: QueryErrCodes.Trending_Creators,
    },
    enabled,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isFetching,
    highlights: data?.data ?? null,
    refetch,
    error,
  };
};
