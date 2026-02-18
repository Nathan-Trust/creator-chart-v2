"use client";

import { useQuery } from "@tanstack/react-query";
import { MetricsService } from "@/services/metrics.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

export const useGetWeeklyMetrics = (
  creatorId: string,
  enabled: boolean = true,
) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Weekly_Metrics, creatorId],
    queryFn: () => MetricsService.collectWeeklyMetrics(creatorId),
    meta: {
      errCode: QueryErrCodes.Weekly_Metrics,
    },
    enabled: enabled && !!creatorId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isFetching,
    metrics: data?.data?.metrics ?? null,
    refetch,
    error,
  };
};
