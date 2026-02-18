"use client";

import { useQuery } from "@tanstack/react-query";
import {
  CreatorService,
  type CreatorListFilters,
} from "@/services/creator.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

export const useGetCreatorsList = (filters?: CreatorListFilters) => {
  const { page, limit, country, category } = filters || {};

  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Creators_List, page, limit, country, category],
    queryFn: () => CreatorService.getAllCreators(filters),
    meta: {
      errCode: QueryErrCodes.Creators,
    },
    staleTime: 5 * 60 * 1000,
  });

  return {
    isLoading,
    isFetching,
    creators: data?.data?.data ?? [],
    pagination: data?.data?.pagination ?? null,
    refetch,
    error,
  };
};
