import type { UseQueryOptions } from "@tanstack/react-query";

export type ResponseParserWrapper<T> = {
  data: T;
  status: number;
};

export interface Message {
  code: string;
  message: string;
  values: string[];
}

export type DefaultErrorResponse = ResponseParserWrapper<Message[]>;

export type FormErrorResponse = ResponseParserWrapper<
  Record<string, { code: string; values: string[] }[]>
>;

export type CombinedErrorResponse = DefaultErrorResponse | FormErrorResponse;

export type AppQueryOptions<T> = Omit<
  UseQueryOptions<T, CombinedErrorResponse, T, any[]>,
  "queryKey" | "queryFn"
>;

// Auth Types
export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  fullName: string;
  email: string;
  phoneNumber?: string;
  password?: string;
  designation?: string;
  agreeTerms?: boolean;
}

export interface ForgotPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  email: string;
  otp: string;
}

export interface ResendOtpPayload {
  email: string;
}

export interface ResetPasswordPayload {
  email: string;
  newPassword: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export interface User {
  _id: string;
  email: string;
  fullName: string;
  phone?: string;
  designation?: string;
  phoneNumber?: string;
  profilePhoto?: string;
}

export interface UserResponse {
  data: User;
}
