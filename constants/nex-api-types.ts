export type CreateExpenseGroupData = {
  name: string;
  description: string;
  imageUrl: string;
  settlementType: "DETAILED" | "SIMPLIFIED"; // Based on the enum values shown
  nexType: "PERSONAL" | "GROUP"; // Based on the enum values shown
};
