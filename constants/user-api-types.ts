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

export type UpdateUserProfileData = {
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
};

export type ChangePasswordData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type RequestPasswordResetData = {
  email: string;
};
