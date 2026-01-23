"use client";

import { useQuery } from "@tanstack/react-query";
import { CreatorService } from "@/services/creator.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch the authenticated creator's profile
 */
export const useGetCreatorProfile = (enabled: boolean = true) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Creator_Profile],
    queryFn: () => CreatorService.getProfile(),
    meta: {
      errCode: QueryErrCodes.Creator_Profile,
    },
    enabled,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    isLoading,
    isFetching,
    creator: data?.data ?? null,
    refetch,
    error,
  };
};
