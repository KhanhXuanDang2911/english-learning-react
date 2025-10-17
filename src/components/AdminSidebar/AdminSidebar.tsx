import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowBigRight,
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
import useAuth from "@/context/AuthContext";
import { toast } from "react-toastify";
import { AuthApi } from "@/api/auth.api";
import { signOut } from "@/context/AuthContext/auth.action";
import { useMutation } from "@tanstack/react-query";
import routes from "@/routes/routes.const";

const data = {
  navMain: [
    {
      title: "Thống kê",
      url: "/admin",
      icon: Home,
    },
  ],
  navManagement: [
    { title: "Người dùng", url: routes.USERS_MANAGEMENT, icon: Users },
    { title: "Khóa học", url: "/admin/courses", icon: GraduationCap },
    {
      title: "Danh mục khoá học",
      url: routes.CATEGORIES_COURSE_MANAGEMENT,
      icon: FolderOpen,
    },
    { title: "Bài viết", url: "/admin/posts", icon: FileText },
    {
      title: "Danh mục bài viết",
      url: routes.CATEGORIES_POST_MANAGEMENT,
      icon: FolderOpen,
    },
    { title: "Thẻ ghi nhớ", url: "/admin/flashcards", icon: Zap },
    {
      title: "Bài nghe chính tả",
      url: "/admin/dictation-lessons",
      icon: Headphones,
    },
    { title: "Mã giảm giá", url: "/admin/coupons", icon: Tag },
    { title: "Bình luận", url: "/admin/comments", icon: MessageSquare },
    { title: "Đơn hàng", url: "/admin/orders", icon: ShoppingCart },
    { title: "Về trang người dùng", url: routes.HOME, icon: ArrowBigRight },
  ],
};

export default function AdminSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const {
    state: { user },
    dispatch,
  } = useAuth();
  const location = useLocation();

  const signOutMutation = useMutation({
    mutationKey: ["sign-out"],
    mutationFn: () => AuthApi.signOut(),
    onSettled: () => {
      dispatch(signOut());
      toast.success("Đăng xuất thành công");
    },
  });

  const handleLogout = () => {
    signOutMutation.mutate();
  };

  return (
    <Sidebar
      collapsible="icon"
      className="transition-all duration-300 w-62 group-data-[collapsible=icon]:w-14"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link to="/admin" className="flex items-center gap-2">
                <div className="relative">
                  <img
                    src="/images/student.png"
                    alt="Full Logo"
                    className="size-9 object-contain group-data-[collapsible=icon]:hidden"
                  />
                  <img
                    src="/images/student.png"
                    alt="Icon Logo"
                    className="hidden size-7 object-contain group-data-[collapsible=icon]:block"
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                  <span className="truncate font-semibold">K-English</span>
                  <span className="truncate text-xs">Quản trị viên</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Tổng quan</SidebarGroupLabel>
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
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Quản lý</SidebarGroupLabel>
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
                      <item.icon className="h-4 w-4" />
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
                  className="data-[state=open]:bg-sidebar-accent 
                       data-[state=open]:text-sidebar-accent-foreground 
                       group-data-[collapsible=icon]:!size-10 
                       group-data-[collapsible=icon]:!p-0"
                >
                  {/* Avatar */}
                  <Avatar className="h-8 w-8 rounded-full">
                    <AvatarImage src={user?.avatarUrl} alt="Admin" />
                    <AvatarFallback className="rounded-full text-xs">
                      {user?.fullName?.slice(0, 2)}
                    </AvatarFallback>
                  </Avatar>

                  <div className="ml-2 grid flex-1 text-left text-sm leading-tight group-data-[collapsible=icon]:hidden">
                    <span className="truncate font-semibold">
                      {user?.fullName}
                    </span>
                    <span className="truncate text-xs text-muted-foreground">
                      {user?.email}
                    </span>
                  </div>
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              {/* Dropdown */}
              <DropdownMenuContent
                className="min-w-40 rounded-lg shadow-md"
                side="right"
                align="end"
                sideOffset={8}
              >
                <DropdownMenuItem asChild>
                  <Link to="/admin/profile" className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Hồ sơ
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />

                <DropdownMenuItem
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center gap-2 font-medium text-red-600 focus:text-red-700 focus:bg-red-50"
                >
                  <LogOut className="h-4 w-4" />
                  Đăng xuất
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
