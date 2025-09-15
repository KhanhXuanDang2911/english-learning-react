import type { UserRequest, UserResponse } from "@/types/user.type";
import http from "./http";
import { USERS_PATH } from "./path";

export class UserApi {
  static getProfile = async () => {
    const response = await http.get<UserResponse>(USERS_PATH.GET_PROFILE);
    return response.data;
  };

  static updateProfile = async (user: UserRequest) => {
    const response = await http.put<UserResponse>(
      USERS_PATH.UPDATE_PROFILE,
      user
    );
    return response.data;
  };

  static updateAvatar = async (file: File) => {
    const formData = new FormData();
    formData.append("avatar", file);
    const response = await http.patch<UserResponse>(
      USERS_PATH.UPDATE_AVATAR,
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    return response.data;
  };
}
