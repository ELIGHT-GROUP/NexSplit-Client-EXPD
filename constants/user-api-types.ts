export type UserProfile = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
  fullName: string;
  isEmailValidate: boolean;
  isGoogleAuth: boolean;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
  modifiedAt: string;
};
