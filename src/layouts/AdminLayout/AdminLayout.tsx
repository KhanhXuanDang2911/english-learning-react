import React from "react";
import {
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import AdminSidebar from "@/components/AdminSidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "react-router-dom";

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const location = useLocation();

  const getBreadcrumbs = () => {
    const pathSegments = location.pathname.split("/").filter(Boolean);
    const breadcrumbs = [];

    if (pathSegments.length > 1) {
      breadcrumbs.push({ label: "Admin", href: "/admin" });

      for (let i = 1; i < pathSegments.length; i++) {
        const segment = pathSegments[i];
        const href = "/" + pathSegments.slice(0, i + 1).join("/");
        const label =
          segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, " ");

        if (i === pathSegments.length - 1) {
          breadcrumbs.push({ label, href, isLast: true });
        } else {
          breadcrumbs.push({ label, href });
        }
      }
    }

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            {breadcrumbs.length > 0 && (
              <Breadcrumb>
                <BreadcrumbList>
                  {breadcrumbs.map((breadcrumb, index) => (
                    <div
                      key={breadcrumb.href}
                      className="flex items-center gap-2"
                    >
                      <BreadcrumbItem>
                        {breadcrumb.isLast ? (
                          <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                        ) : (
                          <BreadcrumbLink href={breadcrumb.href}>
                            {breadcrumb.label}
                          </BreadcrumbLink>
                        )}
                      </BreadcrumbItem>
                      {index < breadcrumbs.length - 1 && (
                        <BreadcrumbSeparator />
                      )}
                    </div>
                  ))}
                </BreadcrumbList>
              </Breadcrumb>
            )}
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">{children}</div>
      </SidebarInset>
    </SidebarProvider>
  );
}
