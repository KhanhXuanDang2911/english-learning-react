"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  User,
  Lock,
  ShoppingCart,
  Package,
  Award,
  Camera,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Shield,
} from "lucide-react";

const sidebarItems = [
  { id: "account", label: "Tài khoản", icon: User },
  { id: "password", label: "Đổi mật khẩu", icon: Lock },
  { id: "cart", label: "Giỏ hàng", icon: ShoppingCart },
  { id: "orders", label: "Đơn hàng", icon: Package },
  { id: "certificates", label: "Chứng chỉ", icon: Award },
];

export default function Account() {
  const [activeTab, setActiveTab] = useState("account");
  const [emailMarketing, setEmailMarketing] = useState(true);
  const [userInfo, setUserInfo] = useState({
    name: "Dang Xuan Thang",
    email: "dangxuanthangqt@gmail.com",
    phone: "0397906999",
    birthDate: "1995-03-15",
    address: "123 Đường ABC, Quận 1, TP.HCM",
    avatar:
      "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=600",
  });

  const handleUpdateAccount = () => {
    console.log("Updating account:", userInfo);
    // Handle account update logic here
  };

  const renderAccountContent = () => {
    switch (activeTab) {
      case "account":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-6">
              <div className="relative">
                <Avatar className="h-24 w-24">
                  <AvatarImage
                    src={userInfo.avatar || "/placeholder.svg"}
                    alt={userInfo.name}
                  />
                  <AvatarFallback className="text-2xl">DX</AvatarFallback>
                </Avatar>
                <Button
                  size="sm"
                  className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0 bg-primary-color hover:bg-hover-primary-color"
                >
                  <Camera className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <h3 className="text-xl font-semibold">{userInfo.name}</h3>
                <p className="text-gray-600">{userInfo.email}</p>
                <Badge className="mt-2 bg-green-100 text-green-800">
                  <Shield className="h-3 w-3 mr-1" />
                  Đã xác thực
                </Badge>
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  Tên
                </Label>
                <Input
                  id="name"
                  value={userInfo.name}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, name: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  Tên này sẽ được hiển thị trên trang cá nhân của bạn.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={userInfo.email}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                  }
                />
                <p className="text-sm text-gray-500">
                  Bạn không thể thay đổi email (nếu muốn thay đổi, vui lòng liên
                  hệ quản trị viên)
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  value={userInfo.phone}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, phone: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="birthDate" className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Ngày sinh
                </Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={userInfo.birthDate}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, birthDate: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="address" className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  Địa chỉ
                </Label>
                <Input
                  id="address"
                  value={userInfo.address}
                  onChange={(e) =>
                    setUserInfo({ ...userInfo, address: e.target.value })
                  }
                />
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">
                    Đăng ký nhận email marketing
                  </Label>
                  <p className="text-sm text-gray-500">
                    Nhận thông báo về khóa học mới, ưu đãi đặc biệt và tin tức
                    từ K-English
                  </p>
                </div>
                <Switch
                  checked={emailMarketing}
                  onCheckedChange={setEmailMarketing}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Tình trạng tài khoản</Label>
                  <p className="text-sm text-gray-500">
                    Tài khoản của bạn đã được xác thực
                  </p>
                </div>
                <Badge className="bg-green-100 text-green-800">Verify</Badge>
              </div>
            </div>

            <Button
              onClick={handleUpdateAccount}
              className="bg-primary-color hover:bg-hover-primary-color"
            >
              Cập nhật tài khoản
            </Button>
          </div>
        );

      case "password":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Đổi mật khẩu</h3>
              <p className="text-gray-600">
                Cập nhật mật khẩu để bảo mật tài khoản của bạn
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mật khẩu hiện tại</Label>
                <Input id="currentPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Mật khẩu mới</Label>
                <Input id="newPassword" type="password" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Xác nhận mật khẩu mới</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>

            <Button className="bg-primary-color hover:bg-hover-primary-color">
              Cập nhật mật khẩu
            </Button>
          </div>
        );

      case "cart":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Giỏ hàng</h3>
              <p className="text-gray-600">
                Quản lý các khóa học trong giỏ hàng của bạn
              </p>
            </div>
            <div className="text-center py-12">
              <ShoppingCart className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Giỏ hàng của bạn đang trống</p>
              <Button className="mt-4 bg-primary-color hover:bg-hover-primary-color">
                Khám phá khóa học
              </Button>
            </div>
          </div>
        );

      case "orders":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Đơn hàng</h3>
              <p className="text-gray-600">
                Lịch sử mua hàng và trạng thái đơn hàng
              </p>
            </div>
            <div className="text-center py-12">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Bạn chưa có đơn hàng nào</p>
              <Button className="mt-4 bg-primary-color hover:bg-hover-primary-color">
                Mua khóa học đầu tiên
              </Button>
            </div>
          </div>
        );

      case "certificates":
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Chứng chỉ</h3>
              <p className="text-gray-600">Các chứng chỉ bạn đã hoàn thành</p>
            </div>
            <div className="text-center py-12">
              <Award className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-gray-500">Bạn chưa có chứng chỉ nào</p>
              <Button className="mt-4 bg-primary-color hover:bg-hover-primary-color">
                Bắt đầu học ngay
              </Button>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-layout py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-color mb-2">
            Quản lý
          </h1>
          <p className="text-gray-600">Quản lý tài khoản và đơn hàng</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {sidebarItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 transition-colors ${
                          activeTab === item.id
                            ? "bg-gray-100 border-r-2 border-primary-color text-primary-color"
                            : ""
                        }`}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <CardTitle>
                  {sidebarItems.find((item) => item.id === activeTab)?.label}
                </CardTitle>
              </CardHeader>
              <CardContent>{renderAccountContent()}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
