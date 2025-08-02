import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  BarChart3,
  BookOpen,
  FileText,
  FolderOpen,
  GraduationCap,
  Headphones,
  Home,
  LogOut,
  MessageSquare,
  ShoppingCart,
  Tag,
  User,
  Users,
  Zap,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/admin",
      icon: Home,
    },
  ],
  navManagement: [
    {
      title: "Users",
      url: "/admin/users",
      icon: Users,
    },
    {
      title: "Courses",
      url: "/admin/courses",
      icon: GraduationCap,
    },
    {
      title: "Categories",
      url: "/admin/categories",
      icon: FolderOpen,
    },
    {
      title: "Chapters",
      url: "/admin/chapters",
      icon: BookOpen,
    },
    {
      title: "Posts",
      url: "/admin/posts",
      icon: FileText,
    },
    {
      title: "Flashcards",
      url: "/admin/flashcards",
      icon: Zap,
    },
    {
      title: "Dictation Lessons",
      url: "/admin/dictation-lessons",
      icon: Headphones,
    },
    {
      title: "Coupons",
      url: "/admin/coupons",
      icon: Tag,
    },
    {
      title: "Comments",
      url: "/admin/comments",
      icon: MessageSquare,
    },
    {
      title: "Orders",
      url: "/admin/orders",
      icon: ShoppingCart,
    },
  ],
};

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const location = useLocation();

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="/images/logo_final.png"
                    alt="Full Logo"
                    className="size-10 object-contain group-data-[collapsible=icon]:hidden"
                  />
                  <img
                    src="/images/logo_final.png"
                    alt="Icon Logo"
                    className="hidden size-8 object-contain group-data-[collapsible=icon]:block"
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">
                    English Learning
                  </span>
                  <span className="truncate text-xs">Admin Panel</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Overview</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navMain.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navManagement.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={location.pathname === item.url}
                  >
                    <Link to={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground group-data-[collapsible=icon]:!size-8 group-data-[collapsible=icon]:!p-0"
                >
                  <Avatar className="h-8 w-8 rounded-lg group-data-[collapsible=icon]:h-6 group-data-[collapsible=icon]:w-6">
                    <AvatarImage
                      src="/placeholder.svg?height=32&width=32"
                      alt="Admin"
                    />
                    <AvatarFallback className="rounded-lg text-xs">
                      AD
                    </AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">Admin User</span>
                    <span className="truncate text-xs">admin@example.com</span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-lg"
                side="right"
                align="end"
                sideOffset={4}
              >
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
