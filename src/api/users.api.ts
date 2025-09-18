import type {
  AdminCreateUserRequest,
  AdminUpdateUserRequest,
  User,
  UserRequest,
  UserResponse,
} from "@/types/user.type";
import http from "./http";
import { USERS_PATH } from "./path";
import type {
  PaginationResponse,
  SuccessResponseNoData,
} from "@/types/common.type";

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

  static updatePassword = async (
    currentPassword: string,
    newPassword: string
  ) => {
    const response = await http.patch<SuccessResponseNoData>(
      USERS_PATH.UPDATE_PASSWORD,
      { currentPassword, newPassword }
    );
    return response.data;
  };

  static getUsers = async (
    pageNumber: number,
    pageSize: number,
    keyword: string,
    sorts?: string
  ) => {
    const params: any = { pageNumber, pageSize, keyword };
    if (sorts) {
      params.sorts = sorts;
    }
    const response = await http.get<PaginationResponse<User>>(
      USERS_PATH.GET_USERS,
      { params }
    );
    return response.data;
  };

  static createUser = async (data: AdminCreateUserRequest) => {
    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const response = await http.post<UserResponse>(USERS_PATH.BASE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  };

  static updateUser = async (data: AdminUpdateUserRequest, id: number) => {
    const formData = new FormData();
    formData.append(
      "user",
      new Blob([JSON.stringify(data)], { type: "application/json" })
    );

    const response = await http.put<UserResponse>(
      `${USERS_PATH.BASE}/${id}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  };

  static deleteUser = async (id: number) => {
    const response = await http.delete<SuccessResponseNoData>(
      `${USERS_PATH.BASE}/${id}`
    );
    return response.data;
  };
}
