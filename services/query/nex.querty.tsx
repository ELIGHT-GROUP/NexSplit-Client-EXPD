import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
import { CreateExpenseGroup } from "../endpoint/nex.service";
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
