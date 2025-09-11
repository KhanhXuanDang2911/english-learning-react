import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import Register from "@/pages/SignUp";
import NoAuthGuard from "./NoAuthGuard";
import SignIn from "@/pages/SignIn";

const RejectedRoutes: RouteObject[] = [
  {
    element: <NoAuthGuard />,
    children: [
      {
        path: routes.SIGN_IN,
        element: (
          <MainLayout>
            <SignIn />
          </MainLayout>
        ),
      },
      {
        path: routes.SIGN_UP,
        element: (
          <MainLayout>
            <Register />
          </MainLayout>
        ),
      },
    ],
  },
];

export default RejectedRoutes;
