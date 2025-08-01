import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import Login from "@/pages/Login/Login";
import Register from "@/pages/Register";
import NoAuthGuard from "./NoAuthGuard";

const RejectedRoutes: RouteObject[] = [
  {
    path: routes.LOGIN,
    element: (
      <NoAuthGuard>
        <MainLayout>
          <Login />
        </MainLayout>
      </NoAuthGuard>
    ),
  },
  {
    path: routes.Register,
    element: (
      <NoAuthGuard>
        <MainLayout>
          <Register />
        </MainLayout>
      </NoAuthGuard>
    ),
  },
];

export default RejectedRoutes;
