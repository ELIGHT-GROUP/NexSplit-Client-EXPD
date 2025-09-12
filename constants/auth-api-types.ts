export type UserRegisterData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  contactNumber: string;
};

export type EmailVerificationData = {
  email: string;
  code: string;
};

export type LoginData = {
  email: string;
  password: string;
};

export type RefreshTokenData = {
  refreshToken: string;
};

export type ResendEmailVerificationData = {
  email: string;
};

export type AuthResponse = {
  accessToken?: string;
  refreshToken: string;
  user?: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export type ApiResponse<T = any> = {
  success: boolean;
  message: string;
  data?: T;
  timestamp: string;
};
