"use client";

import { useQuery } from "@tanstack/react-query";
import {
  HighlightsService,
  type HighlightsFilters,
} from "@/services/highlights.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

export const useGetHighlights = (
  filters?: HighlightsFilters,
  enabled: boolean = true,
) => {
  const { type, country, weekStartDate } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Highlights, type, country, weekStartDate],
    queryFn: () => HighlightsService.getHighlights(filters),
    meta: { errCode: QueryErrCodes.Rankings },
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
