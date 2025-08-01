import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, BookOpen, ChevronDown } from "lucide-react";
import CourseItem from "@/components/CourseItem";
import type { Course } from "@/components/FeaturedCourses/FeaturedCourses";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DynamicPagination } from "@/components/DynamicPagination/DynamicPagination";
import CourseItemSkeleton from "@/components/Skeleton/CourseItemSkeleton";

const categories = [
  "Tất cả",
  "Giao tiếp cơ bản",
  "TOEIC",
  "IELTS",
  "Từ vựng",
  "Ngữ pháp",
  "Phát âm",
  "Tiếng Anh doanh nghiệp",
];

const durations = ["Tất cả", "Dưới 10 giờ", "10-20 giờ", "Trên 20 giờ"];
const prices = ["Tất cả", "Miễn phí", "Dưới 500k", "500k-1tr", "Trên 1tr"];

const allCourses: Course[] = [
  {
    id: "c1",
    title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
    summary:
      "Khoá học giúp bạn xây dựng nền tảng giao tiếp tiếng Anh cơ bản, tự tin nói chuyện trong các tình huống hàng ngày.",
    label: "Cơ bản",
    instructor: "Nguyễn Văn A",
    published: "20 Tháng 7, 2025",
    url: "/courses/tieng-anh-giao-tiep-co-ban",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 24,
    students: 1250,
    likes: 45,
    rating: 4.7,
    ratingCount: 446671,
    hours: 61.5,
  },
  {
    id: "c2",
    title: "Luyện thi TOEIC cấp tốc 2025",
    summary:
      "Khoá học luyện thi TOEIC với lộ trình rõ ràng, tài liệu cập nhật mới nhất, cam kết đầu ra.",
    label: "TOEIC",
    instructor: "Trần Thị B",
    published: "18 Tháng 7, 2025",
    url: "/courses/luyen-thi-toeic-cap-toc",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 30,
    students: 890,
    likes: 32,
    rating: 4.8,
    ratingCount: 12345,
    hours: 40,
  },
  {
    id: "c3",
    title: "Từ vựng tiếng Anh cho người đi làm",
    summary:
      "Nâng cao vốn từ vựng chuyên ngành, giao tiếp hiệu quả trong môi trường công sở quốc tế.",
    label: "Từ vựng",
    instructor: "Lê Văn C",
    published: "15 Tháng 7, 2025",
    url: "/courses/tu-vung-tieng-anh-nguoi-di-lam",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 18,
    students: 567,
    likes: 20,
    rating: 4.5,
    ratingCount: 9876,
    hours: 25,
  },
  {
    id: "c4",
    title: "IELTS Speaking - Chinh phục band 7.0+",
    summary:
      "Khóa học chuyên sâu về kỹ năng Speaking IELTS, phương pháp luyện tập hiệu quả để đạt band cao.",
    label: "IELTS",
    instructor: "Emma Smith",
    published: "12 Tháng 7, 2025",
    url: "/courses/ielts-speaking-band-7",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 22,
    students: 1100,
    likes: 67,
    rating: 4.9,
    ratingCount: 8765,
    hours: 35,
  },
  {
    id: "c5",
    title: "Ngữ pháp tiếng Anh từ cơ bản đến nâng cao",
    summary:
      "Hệ thống hóa toàn bộ ngữ pháp tiếng Anh, từ những kiến thức cơ bản đến nâng cao.",
    label: "Ngữ pháp",
    instructor: "James Anderson",
    published: "10 Tháng 7, 2025",
    url: "/courses/ngu-phap-tieng-anh-toan-dien",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 45,
    students: 2300,
    likes: 89,
    rating: 4.6,
    ratingCount: 15432,
    hours: 80,
  },
  {
    id: "c6",
    title: "Phát âm tiếng Anh chuẩn như người bản ngữ",
    summary:
      "Khóa học phát âm chuyên sâu, sửa lỗi phát âm phổ biến của người Việt.",
    label: "Phát âm",
    instructor: "Sarah Johnson",
    published: "8 Tháng 7, 2025",
    url: "/courses/phat-am-tieng-anh-chuan",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 16,
    students: 780,
    likes: 45,
    rating: 4.8,
    ratingCount: 6543,
    hours: 20,
  },
];

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedDuration, setSelectedDuration] = useState("Tất cả");
  const [selectedPrice, setSelectedPrice] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("popular");
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
              Khám phá các khóa học tiếng Anh
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Hơn {allCourses.length} khóa học chất lượng cao từ các giảng viên
              hàng đầu
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm khóa học, giảng viên..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-4 py-3 text-[14px] bg-white text-gray-900 border-0 rounded-lg"
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
              <CardContent className="lg:p-6">
                <div className="flex items-center justify-between lg:mb-6">
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
                    <h4 className="font-medium mt-7 lg:mt-0 mb-3">Danh mục</h4>
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

                  {/* Duration Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Thời lượng</h4>
                    <Select
                      value={selectedDuration}
                      onValueChange={setSelectedDuration}
                    >
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {durations.map((duration) => (
                          <SelectItem
                            key={duration}
                            value={duration}
                            className="cursor-pointer"
                          >
                            {duration}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Price Filter */}
                  <div>
                    <h4 className="font-medium mb-3">Giá</h4>
                    <Select
                      value={selectedPrice}
                      onValueChange={setSelectedPrice}
                    >
                      <SelectTrigger className="cursor-pointer">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {prices.map((price) => (
                          <SelectItem
                            key={price}
                            value={price}
                            className="cursor-pointer"
                          >
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button
                    className="bg-primary-color hover:bg-hover-primary-color w-full cursor-pointer"
                    onClick={() => {
                      console.log("Tìm kiếm");
                    }}
                  >
                    Tìm kiếm
                  </Button>

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent cursor-pointer"
                    onClick={() => {
                      setSelectedCategory("Tất cả");
                      setSelectedDuration("Tất cả");
                      setSelectedPrice("Tất cả");
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {allCourses.length} khóa học
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
                    <SelectItem value="popular">Phổ biến nhất</SelectItem>
                    <SelectItem value="rating">Đánh giá cao nhất</SelectItem>
                    <SelectItem value="newest">Mới nhất</SelectItem>
                    <SelectItem value="price-low">Giá thấp đến cao</SelectItem>
                    <SelectItem value="price-high">Giá cao đến thấp</SelectItem>
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

            {/* Course Grid */}
            {allCourses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {allCourses.map((course) => (
                  <CourseItem key={course.id} course={course} />
                  // <CourseItemSkeleton key={course.id} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Không tìm thấy khóa học nào
                </h3>
                <p className="text-gray-600 mb-4">
                  Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("Tất cả");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Load More */}
            {allCourses.length > 0 && (
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
