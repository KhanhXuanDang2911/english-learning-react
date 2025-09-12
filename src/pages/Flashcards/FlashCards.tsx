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
  Plus,
  BookOpen,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router-dom";
import routes from "@/routes/routes.const";
import FlashcardItem from "@/components/FlashcardItem";
import DynamicPagination from "@/components/DynamicPagination";

const categories = [
  "Tất cả",
  "Từ vựng cơ bản",
  "Từ vựng nâng cao",
  "TOEIC",
  "IELTS",
  "Giao tiếp",
  "Kinh doanh",
  "Du lịch",
  "Ẩm thực",
  "Công nghệ",
];

const sortOptions = [
  { value: "newest", label: "Mới nhất" },
  { value: "oldest", label: "Cũ nhất" },
  { value: "popular", label: "Phổ biến nhất" },
  { value: "most-studied", label: "Học nhiều nhất" },
  { value: "highest-rated", label: "Đánh giá cao nhất" },
];

interface Flashcard {
  id: string;
  title: string;
  description: string;
  category: string;
  cardCount: number;
  studyCount: number;
  rating: number;
  ratingCount: number;
  author: string;
  authorAvatar: string;
  createdAt: string;
  isPublic: boolean;
  thumbnail: string;
}

const flashcards: Flashcard[] = [
  {
    id: "1",
    title: "1000 từ vựng tiếng Anh cơ bản",
    description:
      "Bộ từ vựng cơ bản nhất cho người mới bắt đầu học tiếng Anh, bao gồm các từ thường dùng hàng ngày.",
    category: "Từ vựng cơ bản",
    cardCount: 1000,
    studyCount: 15420,
    rating: 4.8,
    ratingCount: 2341,
    author: "Nguyễn Văn A",
    authorAvatar:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-15",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
  {
    id: "2",
    title: "Từ vựng TOEIC Part 1-7",
    description:
      "Tổng hợp từ vựng quan trọng cho tất cả các phần trong bài thi TOEIC, giúp bạn đạt điểm cao.",
    category: "TOEIC",
    cardCount: 800,
    studyCount: 8932,
    rating: 4.9,
    ratingCount: 1876,
    author: "Trần Thị B",
    authorAvatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-10",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
  {
    id: "3",
    title: "Phrasal Verbs thông dụng",
    description:
      "200+ phrasal verbs được sử dụng phổ biến nhất trong tiếng Anh, kèm ví dụ và cách sử dụng.",
    category: "Từ vựng nâng cao",
    cardCount: 250,
    studyCount: 6543,
    rating: 4.7,
    ratingCount: 987,
    author: "Emma Smith",
    authorAvatar:
      "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-08",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
  {
    id: "4",
    title: "Từ vựng giao tiếp hàng ngày",
    description:
      "Các từ và cụm từ thiết yếu cho giao tiếp trong cuộc sống hàng ngày, từ chào hỏi đến mua sắm.",
    category: "Giao tiếp",
    cardCount: 500,
    studyCount: 12876,
    rating: 4.6,
    ratingCount: 1543,
    author: "Lê Văn C",
    authorAvatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-05",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
  {
    id: "5",
    title: "Business English Vocabulary",
    description:
      "Từ vựng tiếng Anh thương mại cho môi trường công sở, họp hành và thuyết trình.",
    category: "Kinh doanh",
    cardCount: 350,
    studyCount: 4521,
    rating: 4.8,
    ratingCount: 678,
    author: "James Wilson",
    authorAvatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-03",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
  {
    id: "6",
    title: "Từ vựng du lịch",
    description:
      "Tất cả từ vựng cần thiết khi đi du lịch: khách sạn, nhà hàng, giao thông, mua sắm.",
    category: "Du lịch",
    cardCount: 300,
    studyCount: 7890,
    rating: 4.5,
    ratingCount: 1234,
    author: "Sarah Johnson",
    authorAvatar:
      "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-01",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  },
];

export default function Flashcards() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const handlePageChange = (page: number) => {
    console.log("Do sth with " + page);
  };

  const filteredFlashcards = flashcards.filter((flashcard) => {
    const matchesSearch =
      flashcard.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flashcard.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flashcard.author.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "Tất cả" || flashcard.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedFlashcards = [...filteredFlashcards].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "popular":
        return b.studyCount - a.studyCount;
      case "most-studied":
        return b.studyCount - a.studyCount;
      case "highest-rated":
        return b.rating - a.rating;
      default:
        return 0;
    }
  });

  const currentPage = 1;
  const itemsPerPage = 10;
  const totalResults = sortedFlashcards.length;
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
              Flashcard từ vựng
              <span className="block text-transparent bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text">
                tiếng Anh
              </span>
            </h1>
            <p className="text-xl mb-8 opacity-90 animate-slide-up">
              Khám phá {flashcards.length}+ bộ flashcard từ vựng tiếng Anh chất
              lượng cao
            </p>

            {/* Search Bar */}
            <div
              className="relative max-w-2xl animate-slide-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm flashcard, tác giả..."
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
          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start mb-6">
              {/* Left: số lượng + showing */}
              <div>
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h2 className="text-2xl font-bold">
                    {sortedFlashcards.length} bộ flashcard
                  </h2>
                  <div className="text-sm text-gray-600 bg-white/70 px-3 py-1 rounded-full">
                    Showing {startResult}-{endResult} of {totalResults} results
                  </div>
                </div>
                {searchTerm && (
                  <p className="text-gray-600">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </p>
                )}
              </div>

              {/* Right: nút tạo, view toggle, sort */}
              <div className="flex flex-wrap justify-start lg:justify-end gap-3">
                {/* Create Button */}
                <Button
                  asChild
                  className="bg-gradient-to-r bg-primary-color text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to={routes.CREATE_FLASHCARD}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo flashcard
                  </Link>
                </Button>

                {/* View Toggle */}
                <div className="flex items-center bg-white/70 rounded-lg p-1 shadow-sm">
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
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sắp xếp:</span>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-44 bg-white/70 border-white/30">
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

            {/* Flashcards Grid/List */}
            {sortedFlashcards.length > 0 ? (
              <div
                className={`transition-all duration-500 ${
                  viewMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    : "space-y-4"
                }`}
              >
                {sortedFlashcards.map((flashcard, index) => (
                  <div
                    key={flashcard.id}
                    className="animate-fade-in"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <FlashcardItem flashcard={flashcard} viewMode={viewMode} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <BookOpen className="h-16 w-16 mx-auto" />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Không tìm thấy flashcard nào
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
            {sortedFlashcards.length > 0 && (
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
