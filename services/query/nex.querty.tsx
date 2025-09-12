import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
import { CreateExpenseGroup, GetExpenseGroups } from "../endpoint/nex.service";
import { GetExpenseGroupsParams } from "@/constants/nex-api-types";
import Toast from "react-native-toast-message";

export const useCreateExpenseGroup = () => {
  const queryClient = useQueryClient();
  // const router = useRouter();

  return useMutation({
    mutationFn: CreateExpenseGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["expenseGroups"] });
      Toast.show({
        type: "success",
        text1: "Expense group created successfully",
        text2: "Your new expense group is ready to use",
      });
      // Navigate back to the main screen or expense groups list
      // router.back();
    },
    onError: (error: any) => {
      console.log(error.response);
      Toast.show({
        type: "error",
        text1:
          error.response?.data?.message || "Failed to create expense group",
        text2: "Please try again",
      });
    },
  });
};

export const useGetExpenseGroups = (params: GetExpenseGroupsParams = {}) => {
  const { page = 0, size = 10 } = params;
  return useQuery({
    queryKey: ["expenseGroups", page, size],
    queryFn: () => GetExpenseGroups({ page, size }),
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 2,
  });
};
