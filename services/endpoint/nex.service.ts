import { CreateExpenseGroupData } from "@/constants/nex-api-types";
import axiosClient from "../axios.client";

export const CreateExpenseGroup = async (
  expenseGroupData: CreateExpenseGroupData
) => {
  const response = await axiosClient.post("/api/v1/nex", expenseGroupData);
  return response.data;
};
