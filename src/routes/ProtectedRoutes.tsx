import type { RouteObject } from "react-router-dom";
import routes from "./routes.const";
import MainLayout from "@/layouts/MainLayout";
import Profile from "@/pages/Profile";
import AuthGuard from "./AuthGuard";
import CreatePassword from "@/pages/CreatePassword";
import ForceCreatePasswordGuard from "./ForceCreatePasswordGuard";

const ProtectedRoutes: RouteObject[] = [
  {
    element: <ForceCreatePasswordGuard />,
    children: [
      {
        element: <AuthGuard />,
        children: [
          {
            path: routes.PROFILE,
            element: (
              <MainLayout>
                <Profile />
              </MainLayout>
            ),
          },
          {
            path: routes.CREATE_PASSWORD,
            element: <CreatePassword />,
          },
        ],
      },
    ],
  },
];

export default ProtectedRoutes;
