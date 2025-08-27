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
