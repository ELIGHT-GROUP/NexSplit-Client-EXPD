import { useQuery } from "@tanstack/react-query";
import { GetUserProfile } from "../endpoint/user.service";

export const useUserProfile = (enabled: boolean) => {
  return useQuery({
    queryKey: ["userProfile"],
    queryFn: GetUserProfile,
    enabled: enabled,
    retry: 1,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
