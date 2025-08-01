import type React from "react";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Link, useMatch } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import routes from "@/routes/routes.const";
import {
  ShoppingCart,
  User,
  FileText,
  CreditCard,
  Package,
  LogOut,
  Trash2,
} from "lucide-react";

// Mock cart data
const cartItems = [
  {
    id: 1,
    title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
    price: 299000,
    originalPrice: 1299000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Nguyễn Văn A",
  },
  {
    id: 2,
    title: "Luyện thi TOEIC cấp tốc 2025",
    price: 399000,
    originalPrice: 1599000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Trần Thị B",
  },
  {
    id: 3,
    title: "Từ vựng tiếng Anh cho người đi làm",
    price: 199000,
    originalPrice: 899000,
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    instructor: "Lê Văn C",
  },
];

export default function Header() {
  const totalItems = cartItems.length;
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price, 0);
  const match = useMatch("");
  return (
    <header className="border border-b-primary-color">
      <div className="main-layout flex h-20 shrink-0 items-center">
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="lg:hidden bg-transparent"
            >
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-3">
            <Link to={routes.HOME}>
              <img
                src="/images/logo_final.png"
                alt="Logo"
                className="h-10 w-10"
              />
              <span className="sr-only">K-English</span>
            </Link>
            <div className="grid gap-2 py-6">
              <Link
                to={routes.HOME}
                className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
              >
                Trang chủ
              </Link>
              <Link
                to={routes.COURSES}
                className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
              >
                Khoá học
              </Link>
              <Link
                to={routes.POSTS}
                className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
              >
                Bài viết
              </Link>
              <Link
                to={routes.FLASHCARDS}
                className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
              >
                Từ vựng
              </Link>
              <Link
                to={routes.DICTATION_LESSONS}
                className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
              >
                Nghe chép chính tả
              </Link>
              {match && (
                <HashLink
                  smooth
                  to="#contact"
                  className="flex w-full items-center py-2 text-[14px] font-semibold text-primary-color"
                >
                  Liên hệ
                </HashLink>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Link to={routes.HOME} className="mr-6 hidden lg:flex">
          <img src="/images/logo_final.png" alt="Logo" className="h-10 w-10" />
        </Link>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                to={routes.HOME}
                className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
              >
                Trang chủ
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={routes.COURSES}
                className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
              >
                Khoá học
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={routes.POSTS}
                className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
              >
                Bài viết
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={routes.FLASHCARDS}
                className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
              >
                Từ vựng
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                to={routes.DICTATION_LESSONS}
                className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
              >
                Nghe chép chính tả
              </Link>
            </NavigationMenuLink>
            {match && (
              <NavigationMenuLink asChild>
                <HashLink
                  smooth
                  to="#contact"
                  className="group inline-flex h-9 w-max items-center text-primary-color justify-center rounded-md bg-white px-4 py-2 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus:bg-gray-100 focus:text-gray-900 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                >
                  Liên hệ
                </HashLink>
              </NavigationMenuLink>
            )}
          </NavigationMenuList>
        </NavigationMenu>

        <div className="ml-auto flex items-center gap-x-5">
          {/* Shopping Cart */}
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <ShoppingCart className="h-5 w-5 text-primary-color" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center bg-red-500 text-white text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent className="w-96 p-0" align="end">
              <div className="p-4">
                <h3 className="font-semibold mb-3">Giỏ hàng ({totalItems})</h3>
                <div className="space-y-3 max-h-80 overflow-y-auto">
                  {cartItems.slice(0, 5).map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-2 hover:bg-gray-50 rounded-lg"
                    >
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-16 h-12 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-xs text-gray-500 mb-1">
                          {item.instructor}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-sm text-primary-color">
                              {item.price.toLocaleString()}đ
                            </span>
                            <span className="text-xs text-gray-400 line-through">
                              {item.originalPrice.toLocaleString()}đ
                            </span>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center mb-3">
                    <span className="font-semibold">Tổng cộng:</span>
                    <span className="font-bold text-lg text-primary-color">
                      {totalPrice.toLocaleString()}đ
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      className="flex-1 bg-transparent"
                      asChild
                    >
                      <Link to={routes.CART}>Xem giỏ hàng</Link>
                    </Button>
                    <Button className="flex-1 bg-primary-color hover:bg-hover-primary-color">
                      Thanh toán
                    </Button>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>

          {/* User Avatar Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full"
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src="https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600"
                    alt="User"
                    className="object-cover"
                  />
                  <AvatarFallback>DX</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  <p className="font-medium">Dang Xuan Thang</p>
                  <p className="w-[200px] truncate text-sm text-muted-foreground">
                    dangxuanthangqt@gmail.com
                  </p>
                </div>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to={routes.ACCOUNT} className="cursor-pointer">
                  <User className="mr-2 h-4 w-4" />
                  <span>Tài khoản</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={routes.MY_POSTS} className="cursor-pointer">
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Bài viết của tôi</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={routes.MY_FLASHCARDS} className="cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  <span>Flashcard của tôi</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={routes.CART} className="cursor-pointer">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  <span>Giỏ hàng</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to={routes.ORDERS} className="cursor-pointer">
                  <Package className="mr-2 h-4 w-4" />
                  <span>Đơn hàng</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Đăng xuất</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Login/Register buttons for non-authenticated users */}
          <div className="hidden">
            <Button
              asChild
              variant="outline"
              className="text-primary-color bg-transparent"
            >
              <Link to="/register">Đăng ký</Link>
            </Button>
            <Button className="bg-primary-color hover:bg-hover-primary-color">
              <Link to="/login">Đăng nhập</Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  );
}
