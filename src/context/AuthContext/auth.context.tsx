import { createContext, useReducer, type Dispatch } from "react";
import { initAuthState, type AuthState } from "./auth.state";
import { authReducer } from "./auth.reducer";
import { signIn, signOut, type AuthPayloadAction } from "./auth.action";
import { useQuery } from "@tanstack/react-query";
import { UserApi } from "@/api/users.api";
import { toast } from "react-toastify";
import type { AxiosError } from "axios";
import type { ErrorResponse } from "@/types/common.type";
import { getAccessTokenLocalStorage } from "@/utils/token";

interface AuthContextType {
  state: AuthState;
  dispatch: Dispatch<AuthPayloadAction>;
}

const initAuthContext = {
  state: initAuthState,
  dispatch: () => null,
};

export const AuthContext = createContext<AuthContextType>(initAuthContext);
export let externalDispatch: Dispatch<AuthPayloadAction> = () => null;

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(authReducer, initAuthState);
  const accessToken = getAccessTokenLocalStorage();
  externalDispatch = dispatch;

  useQuery({
    queryKey: ["users", "me"],
    queryFn: () =>
      UserApi.getProfile()
        .then((response) => {
          dispatch(signIn({ isAuthenticated: true, user: response.data }));
          return response;
        })
        .catch(() => {
          dispatch(signOut());
        }),
    enabled: Boolean(accessToken) && !state.isAuthenticated,
  });
  return (
    <>
      <AuthContext.Provider value={{ state, dispatch }}>
        {children}
      </AuthContext.Provider>
    </>
  );
}
