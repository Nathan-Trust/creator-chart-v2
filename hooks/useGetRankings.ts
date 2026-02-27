"use client";

import { useQuery } from "@tanstack/react-query";
import {
  RankingService,
  type GetRankingsFilters,
  type GetCountryRankingsFilters,
} from "@/services/ranking.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch published rankings with filters
 */
export const useGetRankings = (
  filters?: GetRankingsFilters,
  enabled: boolean = true,
) => {
  const { country, category, weekStartDate, weekNumber, year } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [
      QueryKeys.Get_Rankings,
      country,
      category,
      weekStartDate,
      weekNumber,
      year,
    ],
    queryFn: () => RankingService.getRankings(filters),
    meta: {
      errCode: QueryErrCodes.Rankings,
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    rankings: data?.data?.data ?? [],
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
 * Hook to fetch creator rank history
 */
export const useGetCreatorHistory = (
  creatorId: string,
  filters?: {
    startDate?: string;
    endDate?: string;
  },
  enabled: boolean = true,
) => {
  const { startDate, endDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Creator_History, creatorId, startDate, endDate],
    queryFn: () => RankingService.getCreatorHistory(creatorId, filters),
    meta: {
      errCode: QueryErrCodes.Rankings,
    },
    enabled: enabled && !!creatorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    history: data?.data ?? [],
    refetch,
    error,
  };
};

/**
 * Hook to fetch all rankings including PENDING (Admin only)
 */
export const useGetAllRankings = (
  filters?: GetRankingsFilters & {
    status?: "PENDING" | "PUBLISHED" | "ARCHIVED";
  },
  enabled: boolean = true,
) => {
  const { country, category, weekStartDate, weekNumber, year, status } =
    filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [
      QueryKeys.Get_Rankings,
      "admin",
      country,
      category,
      weekStartDate,
      weekNumber,
      year,
      status,
    ],
    queryFn: () => RankingService.getAllRankings(filters),
    meta: {
      errCode: QueryErrCodes.Rankings,
    },
    enabled,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  return {
    isLoading,
    isFetching,
    rankings: data?.data?.data ?? [],
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
 * Hook to fetch rankings for a specific country
 */
export const useGetCountryRankings = (
  country: string,
  filters?: GetCountryRankingsFilters,
  enabled: boolean = true,
) => {
  const { weekStart, category, page, limit } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [
      QueryKeys.Get_Country_Rankings,
      country,
      weekStart,
      category,
      page,
      limit,
    ],
    queryFn: () => RankingService.getCountryRankings(country, filters),
    meta: {
      errCode: QueryErrCodes.Rankings,
    },
    enabled: enabled && !!country,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    isLoading,
    isFetching,
    rankings: data?.data?.data ?? [],
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
