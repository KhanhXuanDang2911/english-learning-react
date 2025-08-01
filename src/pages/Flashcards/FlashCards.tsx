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
  Users,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import routes from "@/routes/routes.const";

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

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-3 w-3 ${
          i < Math.floor(rating)
            ? "text-yellow-400 fill-yellow-400"
            : "text-gray-300"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-primary-color text-white py-16">
        <div className="main-layout">
          <div className="max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Flashcard từ vựng
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Khám phá {flashcards.length}+ bộ flashcard từ vựng tiếng Anh chất
              lượng cao
            </p>

            {/* Search Bar */}
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Tìm kiếm flashcard, tác giả..."
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
                    <h4 className="font-medium mb-3">Chủ đề</h4>
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

                  {/* Clear Filters */}
                  <Button
                    variant="outline"
                    className="w-full bg-transparent"
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {sortedFlashcards.length} bộ flashcard
                </h2>
                {searchTerm && (
                  <p className="text-gray-600">
                    Kết quả tìm kiếm cho "{searchTerm}"
                  </p>
                )}
              </div>

              <div className="flex items-center gap-4 mt-4 sm:mt-0">
                <Button
                  asChild
                  className="bg-primary-color hover:bg-hover-primary-color"
                >
                  <Link to={routes.CREATE_FLASHCARD}>
                    <Plus className="h-4 w-4 mr-2" />
                    Tạo flashcard
                  </Link>
                </Button>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600">Sắp xếp:</span>
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

            {/* Flashcards Grid */}
            {sortedFlashcards.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedFlashcards.map((flashcard) => (
                  <Card
                    key={flashcard.id}
                    className="overflow-hidden hover:shadow-lg transition-shadow"
                  >
                    <Link
                      to={`${routes.FLASHCARD_DETAIL.replace(
                        ":id",
                        flashcard.id
                      )}`}
                    >
                      <div className="aspect-video w-full overflow-hidden">
                        <img
                          src={flashcard.thumbnail || "/placeholder.svg"}
                          alt={flashcard.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    </Link>

                    <CardContent className="p-4">
                      <div className="mb-2">
                        <Badge className="bg-primary-color text-xs">
                          {flashcard.category}
                        </Badge>
                      </div>

                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 hover:text-primary-color">
                        <Link
                          to={`${routes.FLASHCARD_DETAIL.replace(
                            ":id",
                            flashcard.id
                          )}`}
                        >
                          {flashcard.title}
                        </Link>
                      </h3>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {flashcard.description}
                      </p>

                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={flashcard.authorAvatar || "/placeholder.svg"}
                          alt={flashcard.author}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-600">
                          {flashcard.author}
                        </span>
                      </div>

                      <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1">
                            <BookOpen className="h-4 w-4" />
                            <span>{flashcard.cardCount} thẻ</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            <span>{flashcard.studyCount.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <div className="flex">
                            {renderStars(flashcard.rating)}
                          </div>
                          <span className="text-sm font-medium">
                            {flashcard.rating}
                          </span>
                          <span className="text-sm text-gray-500">
                            ({flashcard.ratingCount})
                          </span>
                        </div>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent"
                          asChild
                        >
                          <Link
                            to={`${routes.FLASHCARD_DETAIL.replace(
                              ":id",
                              flashcard.id
                            )}`}
                          >
                            Học ngay
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
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
                >
                  Xóa bộ lọc
                </Button>
              </div>
            )}

            {/* Load More */}
            {sortedFlashcards.length > 0 && (
              <div className="text-center mt-12">
                <Button variant="outline" size="lg">
                  Xem thêm flashcard
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
