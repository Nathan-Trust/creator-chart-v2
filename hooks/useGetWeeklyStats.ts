"use client";

import { useQuery } from "@tanstack/react-query";
import {
  RankingService,
  type WeeklyStatsFilters,
} from "@/services/ranking.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch weekly stats for hero section
 */
export const useGetWeeklyStats = (filters?: WeeklyStatsFilters) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Weekly_Stats, filters],
    queryFn: () => RankingService.getWeeklyStats(filters),
    meta: {
      errCode: QueryErrCodes.Weekly_Stats,
    },
    staleTime: 60 * 60 * 1000, // 1 hour - weekly stats change infrequently
    retry: 2,
  });

  return {
    isLoading,
    isFetching,
    weeklyStats: data?.data ?? [],
    refetch,
    error,
  };
};
