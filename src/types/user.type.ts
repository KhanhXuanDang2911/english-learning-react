import type { SuccessResponse } from "./common.type";

export interface User {
  id: number;
  createdAt: string;
  updatedAt: string;
  fullName: string;
  email: string;
  phoneNumber: string | null;
  avatarUrl: string | null;
  address: string | null;
  birthDate: string | null;
  role: "ADMIN" | "USER" | "TEACHER";
  status: "ACTIVE" | "PENDING" | "BANNED";
  gender: "MALE" | "FEMALE" | "OTHER";
  noPassword: boolean;
  permissions: string[];
}

export interface SignUpUserRequest {
  fullName: string;
  email: string;
  phoneNumber: string | null;
  password: string;
  address: string | null;
  birthDate: string;
  gender: "MALE" | "FEMALE" | "OTHER";
}

export type UserRequest = Omit<SignUpUserRequest, "password">;

export type UserResponse = SuccessResponse<User>;
