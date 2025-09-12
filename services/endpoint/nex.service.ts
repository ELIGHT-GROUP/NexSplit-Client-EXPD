import {
  CreateExpenseGroupData,
  GetExpenseGroupsParams,
  ExpenseGroupsResponse,
} from "@/constants/nex-api-types";
import axiosClient from "../axios.client";

export const CreateExpenseGroup = async (
  expenseGroupData: CreateExpenseGroupData
) => {
  const response = await axiosClient.post("/nex", expenseGroupData);
  return response.data;
};

export const GetExpenseGroups = async (
  params: GetExpenseGroupsParams = {}
): Promise<ExpenseGroupsResponse> => {
  const { page = 0, size = 10 } = params;
  const response = await axiosClient.get(`/nex?page=${page}&size=${size}`);
  return response.data;
};
