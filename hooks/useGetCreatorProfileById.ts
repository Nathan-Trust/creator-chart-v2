"use client";

import { useQuery } from "@tanstack/react-query";
import { CreatorService } from "@/services/creator.service";
import { QueryKeys, QueryErrCodes } from "@/models/query";

/**
 * Hook to fetch a creator's profile by ID
 */
export const useGetCreatorProfileById = (
  creatorId: string,
  enabled: boolean = true,
) => {
  const { isLoading, data, isFetching, refetch, error } = useQuery({
    queryKey: [QueryKeys.Get_Creator_By_Id, creatorId],
    queryFn: () => CreatorService.getProfileById(creatorId),
    meta: {
      errCode: QueryErrCodes.Creator_Profile,
    },
    enabled: enabled && !!creatorId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });

  return {
    isLoading,
    isFetching,
    profile: data?.data ?? null,
    refetch,
    error,
  };
};
