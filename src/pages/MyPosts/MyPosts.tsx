"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from "react-router-dom";
import { Search, Plus, Edit, Trash2, Eye, FileText } from "lucide-react";
import routes from "@/routes/routes.const";

interface Post {
  id: string;
  title: string;
  summary: string;
  category: string;
  publishedDate: string;
  views: number;
  image: string;
  status: "draft" | "published";
}

const mockMyPosts: Post[] = [
  {
    id: "post1",
    title: "Bí quyết học tiếng Anh giao tiếp hiệu quả tại nhà",
    summary:
      "Khám phá những phương pháp tự học tiếng Anh giao tiếp hiệu quả mà bạn có thể áp dụng ngay tại nhà.",
    category: "Học tiếng Anh",
    publishedDate: "2025-07-20",
    views: 12345,
    image: "/placeholder.svg?height=200&width=300&text=Post+Image+1",
    status: "published",
  },
  {
    id: "post2",
    title: "5 ứng dụng học từ vựng tiếng Anh không thể bỏ qua",
    summary:
      "Tổng hợp 5 ứng dụng di động giúp bạn học từ vựng tiếng Anh một cách hiệu quả và thú vị.",
    category: "Công cụ học tập",
    publishedDate: "2025-07-18",
    views: 8765,
    image: "/placeholder.svg?height=200&width=300&text=Post+Image+2",
    status: "published",
  },
  {
    id: "post3",
    title: "Hướng dẫn viết CV tiếng Anh ấn tượng",
    summary:
      "Từng bước hướng dẫn cách viết một bản CV tiếng Anh chuyên nghiệp, giúp bạn nổi bật trong mắt nhà tuyển dụng.",
    category: "Kỹ năng mềm",
    publishedDate: "2025-07-15",
    views: 5432,
    image: "/placeholder.svg?height=200&width=300&text=Post+Image+3",
    status: "draft",
  },
  {
    id: "post4",
    title: "Lộ trình tự học IELTS từ 0 lên 6.5+",
    summary:
      "Chia sẻ lộ trình chi tiết và tài liệu cần thiết để bạn tự học IELTS và đạt band điểm mong muốn.",
    category: "Luyện thi IELTS",
    publishedDate: "2025-07-10",
    views: 15000,
    image: "/placeholder.svg?height=200&width=300&text=Post+Image+4",
    status: "published",
  },
];

const categories = [
  "Tất cả",
  "Học tiếng Anh",
  "Công cụ học tập",
  "Kỹ năng mềm",
  "Luyện thi IELTS",
];
const statuses = ["Tất cả", "published", "draft"];
const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "views", label: "Lượt xem nhiều nhất" },
];

export default function MyPosts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");

  const filteredPosts = mockMyPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || post.category === selectedCategory;
    const matchesStatus =
      selectedStatus === "Tất cả" || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const sortedPosts = [...filteredPosts].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.publishedDate).getTime() -
          new Date(a.publishedDate).getTime()
        );
      case "oldest":
        return (
          new Date(a.publishedDate).getTime() -
          new Date(b.publishedDate).getTime()
        );
      case "views":
        return b.views - a.views;
      default:
        return 0;
    }
  });

  const handleDeletePost = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa bài viết này?")) {
      console.log("Deleting post:", id);
      // Implement actual delete logic here
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-layout py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary-color">
            Bài viết của tôi
          </h1>
          <Button
            className="bg-primary-color hover:bg-hover-primary-color"
            asChild
          >
            <Link to="#">
              <Plus className="h-4 w-4 mr-2" />
              Tạo bài viết mới
            </Link>
          </Button>
        </div>

        {/* Filters and Search */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Tìm kiếm bài viết..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Chọn chủ đề" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={selectedStatus} onValueChange={setSelectedStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Trạng thái" />
            </SelectTrigger>
            <SelectContent>
              {statuses.map((status) => (
                <SelectItem key={status} value={status}>
                  {status === "published"
                    ? "Đã đăng"
                    : status === "draft"
                    ? "Bản nháp"
                    : "Tất cả"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Sắp xếp theo" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Posts List */}
        {sortedPosts.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <FileText className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <p className="text-lg text-gray-600 mb-4">
                Bạn chưa có bài viết nào.
              </p>
              <Button
                className="bg-primary-color hover:bg-hover-primary-color"
                asChild
              >
                <Link to="#">Tạo bài viết đầu tiên</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {sortedPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 flex flex-col md:flex-row items-start md:items-center gap-4">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    className="w-full md:w-40 h-24 object-cover rounded-md flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className="bg-primary-color text-white text-xs">
                        {post.category}
                      </Badge>
                      <Badge
                        variant={
                          post.status === "published" ? "default" : "secondary"
                        }
                        className="text-xs"
                      >
                        {post.status === "published" ? "Đã đăng" : "Bản nháp"}
                      </Badge>
                    </div>
                    <h3 className="font-semibold text-lg line-clamp-2 mb-1">
                      <Link
                        to={routes.POST_DETAIL.replace(":slug", post.id)}
                        className="hover:text-primary-color"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                      {post.summary}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span>{post.views.toLocaleString()} lượt xem</span>
                      </div>
                      <span>Ngày đăng: {post.publishedDate}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0">
                    <Button variant="outline" size="icon" asChild>
                      <Link to="#">
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Chỉnh sửa</span>
                      </Link>
                    </Button>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleDeletePost(post.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Xóa</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
