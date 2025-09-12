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
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import PostItem from "@/components/PostItem";
import type { Post } from "@/components/FeaturedPosts/FeaturedPosts";
import DynamicPagination from "@/components/DynamicPagination";

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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handlePageChange = (page: number) => {
    console.log("Do sth with " + page);
  };

  const currentPage = 1;
  const itemsPerPage = 10;
  const totalResults = allPosts.length;
  const startResult = (currentPage - 1) * itemsPerPage + 1;
  const endResult = Math.min(currentPage * itemsPerPage, totalResults);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>

        {/* Animated shapes */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-green-400/15 to-blue-400/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Geometric patterns */}
        <div className="absolute top-1/4 right-1/4 w-32 h-32 border border-blue-200/30 rounded-lg rotate-45 animate-spin-slow"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border border-purple-200/30 rounded-full animate-spin-reverse"></div>
      </div>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r bg-primary-color text-white py-20">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative main-layout">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
              Blog tiếng Anh
              <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                chất lượng cao
              </span>
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Khám phá {allPosts.length}+ bài viết hữu ích về học tiếng Anh từ
              các chuyên gia
            </p>

            {/* Search Bar */}
            <div
              className="relative max-w-2xl animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm bài viết, tác giả..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-4 text-[16px] bg-white/95 backdrop-blur-sm text-gray-900 border-0 rounded-xl shadow-lg focus:shadow-xl transition-all duration-300"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="relative main-layout py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-80">
            <Card className="sticky top-8 glass-effect border-white/20 shadow-xl">
              <CardContent className="lg:p-6">
                <div className="flex items-center justify-between lg:mb-6">
                  <h3 className="text-lg font-semibold flex items-center gap-2">
                    <SlidersHorizontal className="h-5 w-5 text-primary-color" />
                    Bộ lọc
                  </h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden hover:bg-white/50"
                  >
                    <Filter className="h-4 w-4 mr-2" />
                    Lọc
                    <ChevronDown
                      className={`h-4 w-4 ml-2 transition-transform ${
                        showFilters ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>

                <div
                  className={`space-y-6 ${
                    showFilters ? "block" : "hidden lg:block"
                  }`}
                >
                  {/* Category Filter */}
                  <div>
                    <h4 className="font-medium mt-7 lg:mt-0 mb-3">Danh mục</h4>
                    <div className="space-y-2">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                            selectedCategory === category
                              ? "bg-primary-color text-white shadow-md"
                              : "hover:bg-white/50 hover:shadow-sm"
                          }`}
                        >
                          {category}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full bg-white/50 border-white/30 hover:bg-white/70 cursor-pointer transition-all duration-300"
                    onClick={() => {
                      setSelectedCategory("Tất cả");
                      setSearchTerm("");
                    }}
                  >
                    Xóa bộ lọc
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 flex-wrap">
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {allPosts.length} bài viết
                  </h2>
                  <div className="text-sm text-gray-600 bg-white/70 px-3 py-1 rounded-full whitespace-nowrap">
                    Showing {startResult}-{endResult} of {totalResults} results
                  </div>
                </div>
                {searchTerm && (
                  <p className="text-gray-600">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-4">
                {/* View Toggle */}
                <div className="flex items-center bg-white/70 rounded-lg p-1 shadow-sm flex-shrink-0">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={`px-3 py-2 ${
                      viewMode === "grid"
                        ? "bg-primary-color text-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    <Grid3X3 className="h-4 w-4 mr-1" /> Grid
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={`px-3 py-2 ${
                      viewMode === "list"
                        ? "bg-primary-color text-white shadow-sm"
                        : "hover:bg-white/50"
                    }`}
                  >
                    <List className="h-4 w-4 mr-1" /> List
                  </Button>
                </div>

                {/* Sort */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-sm text-gray-600 whitespace-nowrap">
                    Sắp xếp:
                  </span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-48 bg-white/70 border-white/30">
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
            </div>

            {/* Active Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
              {selectedCategory !== "Tất cả" && (
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-white/70 hover:bg-white/90 transition-colors"
                >
                  {selectedCategory}
                  <button
                    onClick={() => setSelectedCategory("Tất cả")}
                    className="ml-2 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </Badge>
              )}
              {searchTerm && (
                <Badge
                  variant="secondary"
                  className="px-3 py-1 bg-white/70 hover:bg-white/90 transition-colors"
                >
                  "{searchTerm}"
                  <button
                    onClick={() => setSearchTerm("")}
                    className="ml-2 hover:text-red-500 transition-colors"
                  >
                    ×
                  </button>
                </Badge>
              )}
            </div>

            {/* Posts Grid/List */}
            {allPosts.length > 0 ? (
              <div
                className={`transition-all duration-500 ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }`}
              >
                {allPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <PostItem post={post} viewMode={viewMode} />
                  </div>
                ))}
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
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Tất cả");
                  }}
                  className="bg-primary-color hover:bg-hover-primary-color"
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Pagination */}
            {allPosts.length > 0 && (
              <div className="mt-12">
                <DynamicPagination
                  currentPage={1}
                  totalPages={10}
                  onPageChange={handlePageChange}
                  maxVisiblePages={3}
                  showFirstLast={false}
                  buttonClassName="hover:bg-white/70 transition-all duration-200"
                  activeButtonClassName="bg-primary-color text-white hover:bg-hover-primary-color shadow-md"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
