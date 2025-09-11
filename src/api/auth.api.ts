import type { RefreshTokenResponse, SignInResponse } from "@/types/auth.type";
import http from "./http";
import { AUTH_PATH, USERS_PATH } from "./path";
import type { SuccessResponseNoData } from "@/types/common.type";
import {
  getAccessTokenLocalStorage,
  getRefreshTokenLocalStorage,
} from "@/utils/token";
import type { SignUpUserRequest, UserResponse } from "@/types/user.type";

export class AuthApi {
  static signIn = async (data: { email: string; password: string }) => {
    const response = await http.post<SignInResponse>(AUTH_PATH.SIGN_IN, data);
    return response.data;
  };

  static signOut = async () => {
    const response = await http.post<SuccessResponseNoData>(
      AUTH_PATH.SIGN_OUT,
      null,
      {
        headers: {
          "X-Token": getAccessTokenLocalStorage(),
          "Y-Token": getRefreshTokenLocalStorage(),
        },
      }
    );
    return response.data;
  };

  static refreshToken = async () => {
    const response = await http.post<RefreshTokenResponse>(
      AUTH_PATH.REFRESH_TOKEN,
      null,
      {
        headers: {
          "Y-Token": getRefreshTokenLocalStorage(),
        },
      }
    );
    return response.data;
  };

  static authenticateGoogle = async (code: string) => {
    const response = await http.post<SignInResponse>(
      AUTH_PATH.AUTHENTICATE_GOOGLE,
      null,
      { headers: { "G-Code": code } }
    );
    return response.data;
  };

  static signUp = async (user: SignUpUserRequest) => {
    const response = await http.post<UserResponse>(AUTH_PATH.SIGN_UP, user);
    return response.data;
  };
}
