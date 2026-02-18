"use client";

import { useQuery } from "@tanstack/react-query";
import {
  RankingService,
  type GetRankingsFilters,
} from "@/services/ranking.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";
import { useEffect } from "react";

/**
 * Hook to fetch published rankings with filters
 */
export const useGetRankings = (filters?: GetRankingsFilters) => {
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
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  useEffect(() => {
    if (country || category || weekNumber || year) {
      refetch();
    }
  }, [country, category, weekStartDate, weekNumber, year, refetch]);

  return {
    isLoading,
    isFetching,
    rankings: data?.data ?? [],
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

  useEffect(() => {
    if (startDate || endDate) {
      refetch();
    }
  }, [startDate, endDate, refetch]);

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
    staleTime: 2 * 60 * 1000, // 2 minutes
  });

  useEffect(() => {
    if (country || category || weekNumber || year || status) {
      refetch();
    }
  }, [country, category, weekStartDate, weekNumber, year, status, refetch]);

  return {
    isLoading,
    isFetching,
    rankings: data?.data ?? [],
    refetch,
    error,
  };
};

/**
 * Hook to fetch active countries
 */
export const useGetActiveCountries = () => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Rankings, "active-countries"],
    queryFn: () => RankingService.getActiveCountries(),
    meta: {
      errCode: QueryErrCodes.Rankings,
    },
    staleTime: 60 * 60 * 1000, // 1 hour (countries don't change often)
  });

  return {
    isLoading,
    isFetching,
    countries: data?.data ?? [],
    refetch,
    error,
  };
};
