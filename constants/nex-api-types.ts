export type CreateExpenseGroupData = {
  name: string;
  description: string;
  imageUrl: string;
  settlementType: "DETAILED" | "SIMPLIFIED"; // Based on the enum values shown
  nexType: "PERSONAL" | "GROUP"; // Based on the enum values shown
};

export type GetExpenseGroupsParams = {
  page?: number;
  size?: number;
};

export type ExpenseGroup = {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  settlementType: "DETAILED" | "SIMPLIFIED";
  nexType: "PERSONAL" | "GROUP";
  members?: number;
  tags?: string[];
  createdAt: string;
  modifiedAt: string;
};

export type ExpenseGroupsResponse = {
  data: ExpenseGroup[];
  pagination: {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
    hasNext: boolean;
    hasPrevious: boolean;
  };
};
