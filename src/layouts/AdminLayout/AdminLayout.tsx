import { useEffect, useState } from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import { Separator } from "@/components/ui/separator";
import { Outlet, useNavigate } from "react-router-dom";
import useAuth from "@/context/AuthContext";
import routes from "@/routes/routes.const";
import LogoLoader from "@/components/LogoLoader";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [isReadyComponent, setIsReadyComponent] = useState<boolean>(false);
  const {
    state: { user, isAuthenticated },
  } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(routes.SIGN_IN, { replace: true });
    } else if (user.role !== "ADMIN") {
      navigate(routes.HOME, { replace: true });
    } else {
      setIsReadyComponent(true);
    }
  }, [user, isAuthenticated]);

  if (!isReadyComponent) return <LogoLoader />;

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          <Outlet />
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
