export type TUser = {
  name: string;
  password: string;
  email: string;
  otp: string;
  isOtpVerified: boolean;
  otpExpiry: Date;
};
