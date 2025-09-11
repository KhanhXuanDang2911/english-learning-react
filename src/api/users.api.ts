import type { UserResponse } from "@/types/user.type";
import http from "./http";
import { USERS_PATH } from "./path";
import type { SuccessResponseNoData } from "@/types/common.type";

export class UserApi {
  static getProfile = async () => {
    const response = await http.get<UserResponse>(USERS_PATH.GET_PROFILE);
    return response.data;
  };
  static createPassword = async (password: string) => {
    const response = await http.post<SuccessResponseNoData>(
      USERS_PATH.CREATE_PASSWORD,
      { password }
    );
    return response.data;
  };
}
