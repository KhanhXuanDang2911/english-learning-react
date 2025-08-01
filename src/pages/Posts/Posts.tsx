"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Search,
  Filter,
  BookOpen,
  ChevronDown,
  Calendar,
  User,
  Eye,
} from "lucide-react";
import PostItem from "@/components/PostItem";
import type { Post } from "@/components/FeaturedPosts/FeaturedPosts";
import { DynamicPagination } from "@/components/DynamicPagination/DynamicPagination";
import SpecialPostItem from "@/components/SpecialPostItem/SpecialPostItem";
import SpecialPostItemSkeleton from "@/components/Skeleton/SpecialPostItemSkeleton";
import PostItemSkeleton from "@/components/Skeleton/PostItemSkeleton";

const categories = [
  "Tất cả",
  "Từ vựng",
  "Kỹ năng nghe",
  "Chứng chỉ",
  "Ngữ pháp",
  "Phát âm",
  "Giao tiếp",
  "Kinh nghiệm học",
];

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "popular", label: "Phổ biến nhất" },
  { value: "most-viewed", label: "Xem nhiều nhất" },
];

const allPosts: Post[] = [
  {
    id: 1,
    title: "5 mẹo học từ vựng tiếng Anh lâu quên",
    category: "Từ vựng",
    date: "25 Tháng 7, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Từ vựng là nền tảng để giao tiếp. Cùng khám phá những cách học từ vựng dễ nhớ và áp dụng hiệu quả trong đời sống.",
    author: "Nguyễn Văn A",
    readTime: 5,
    views: 1250,
    slug: "5-meo-hoc-tu-vung-tieng-anh-lau-quen",
  },
  {
    id: 2,
    title: "Cách luyện nghe tiếng Anh qua phim và podcast",
    category: "Kỹ năng nghe",
    date: "18 Tháng 7, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Nghe tiếng Anh không còn nhàm chán! Hướng dẫn cách chọn nội dung và luyện tập hiệu quả cho mọi trình độ.",
    author: "Trần Thị B",
    readTime: 7,
    views: 890,
    slug: "cach-luyen-nghe-tieng-anh-qua-phim-va-podcast",
  },
  {
    id: 3,
    title: "So sánh IELTS và TOEIC: Lựa chọn nào phù hợp?",
    category: "Chứng chỉ",
    date: "10 Tháng 7, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Bạn đang phân vân giữa các chứng chỉ tiếng Anh? Bài viết này sẽ giúp bạn lựa chọn dựa trên mục tiêu học tập hoặc nghề nghiệp.",
    author: "Lê Văn C",
    readTime: 8,
    views: 2100,
    slug: "so-sanh-ielts-va-toeic-lua-chon-nao-phu-hop",
  },
  {
    id: 4,
    title: "10 lỗi ngữ pháp phổ biến người Việt thường mắc",
    category: "Ngữ pháp",
    date: "5 Tháng 7, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục để nâng cao khả năng sử dụng tiếng Anh của bạn.",
    author: "Emma Smith",
    readTime: 6,
    views: 1680,
    slug: "10-loi-ngu-phap-pho-bien-nguoi-viet-thuong-mac",
  },
  {
    id: 5,
    title: "Bí quyết phát âm tiếng Anh chuẩn như người bản ngữ",
    category: "Phát âm",
    date: "28 Tháng 6, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Khám phá những kỹ thuật phát âm hiệu quả và các bài tập thực hành để cải thiện giọng nói tiếng Anh của bạn.",
    author: "James Anderson",
    readTime: 9,
    views: 3200,
    slug: "bi-quyet-phat-am-tieng-anh-chuan-nhu-nguoi-ban-ngu",
  },
  {
    id: 6,
    title: "Giao tiếp tiếng Anh trong môi trường công sở",
    category: "Giao tiếp",
    date: "20 Tháng 6, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Những cụm từ và câu giao tiếp thiết yếu trong môi trường làm việc chuyên nghiệp bằng tiếng Anh.",
    author: "Sarah Johnson",
    readTime: 7,
    views: 1450,
    slug: "giao-tiep-tieng-anh-trong-moi-truong-cong-so",
  },
];

export default function Posts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const handlePageChange = (page: number) => {
    console.log("Do sth with " + page);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-color text-white py-16">
        <div className="main-layout">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog tiếng Anh
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Khám phá {allPosts.length}+ bài viết hữu ích về học tiếng Anh từ
              các chuyên gia
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-lg bg-white text-gray-900 border-0 rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="main-layout py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="sticky top-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold">Bộ lọc</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Lọc
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </div>

                <div
                  className={`space-y-6 ${
                    showFilters ? "block" : "hidden lg:block"
                  }`}
                >
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Danh mục</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-md text-sm transition-colors ${
                            selectedCategory === category
                              ? "bg-primary-color text-white"
                              : "hover:bg-gray-100"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {allPosts.length} bài viết
                </h2>
                {searchTerm && (
                  <p className="text-gray-600">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <span className="text-sm text-gray-600">Sắp xếp theo:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue />
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
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "Tất cả" && (
                <Badge variant="secondary" className="px-3 py-1">
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("Tất cả")}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge variant="secondary" className="px-3 py-1">
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            {/* Posts Grid */}
            {allPosts.length > 0 ? (
              <div className="space-y-6">
                {/* Featured Post */}
                {allPosts.length > 0 && (
                  <SpecialPostItem
                    key={crypto.randomUUID()}
                    post={allPosts[0]}
                  />
                  // <SpecialPostItemSkeleton key={allPosts[0].id} />
                )}

                {/* Regular Posts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {allPosts.slice(1).map((post) => (
                    <PostItem key={crypto.randomUUID()} post={post} />
                    // <PostItemSkeleton key={post.id} />
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Không tìm thấy bài viết nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
              </div>
            )}

            {/* Load More */}
            {allPosts.length > 0 && (
              <div className="mt-8">
                <DynamicPagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={handlePageChange}
                  maxVisiblePages={3}
                  showFirstLast={false}
                  buttonClassName="hover:bg-slate-200"
                  activeButtonClassName="bg-primary-color text-white hover:bg-hover-primary-color hover:text-white"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
