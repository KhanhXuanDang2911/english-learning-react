import { Link } from "react-router-dom";
import { BookOpen, Users, Play, Bookmark } from "lucide-react";
import { Button } from "../ui/button";
import routes from "@/routes/routes.const";

interface Flashcard {
  id: string;
  title: string;
  description: string;
  cardCount: number;
  studyCount: number;
  author: string;
  authorAvatar: string;
}

interface FlashcardItemProps {
  flashcard: Flashcard;
  viewMode?: "grid" | "list";
}

export default function FlashcardItem({
  flashcard,
  viewMode = "grid",
}: FlashcardItemProps) {
  if (viewMode === "list") {
    return (
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex">
        {/* Bookmark góc phải */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow transition-colors duration-200 hover:bg-green-700 [&:hover>svg]:text-white">
          <Bookmark
            size={18}
            className="text-gray-600 transition-colors duration-200"
          />
        </button>

        {/* Content - List View */}
        <div className="flex-1 p-4 space-y-2">
          {/* Author */}
          <div className="flex items-center gap-3">
            <img
              src={
                flashcard.authorAvatar ||
                `https://i.pravatar.cc/32?u=${flashcard.author}`
              }
              alt={flashcard.author}
              className="w-6 h-6 rounded-full object-cover ring-1 ring-white shadow-sm"
            />
            <div className="text-xs text-primary-color font-medium">
              {flashcard.author}
            </div>
          </div>

          {/* Title */}
          <h3 className="text-base font-bold text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-primary-color">
            <Link
              to={`${routes.FLASHCARD_DETAIL.replace(":id", flashcard.id)}`}
            >
              {flashcard.title}
            </Link>
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-2">
            {flashcard.description}
          </p>

          {/* Meta + Học ngay */}
          <div className="flex items-center justify-between text-xs text-gray-600 pt-2 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <BookOpen size={12} className="text-blue-500" />
                <span>{flashcard.cardCount} thẻ</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} className="text-purple-500" />
                <span>{flashcard.studyCount.toLocaleString()} học viên</span>
              </div>
            </div>

            <Button
              size="sm"
              className="bg-primary-color text-white font-medium px-3 py-1 rounded-lg shadow hover:bg-hover-primary-color transition-all whitespace-nowrap"
              asChild
            >
              <Link
                to={`${routes.FLASHCARD_DETAIL.replace(":id", flashcard.id)}`}
              >
                <Play size={14} className="mr-1" />
                Học ngay
              </Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
      {/* Bookmark góc phải */}
      <button className="absolute top-3 right-3 p-2 rounded-full bg-white shadow transition-colors duration-200 hover:bg-green-700 [&:hover>svg]:text-white">
        <Bookmark
          size={18}
          className="text-gray-600 transition-colors duration-200"
        />
      </button>

      {/* Content */}
      <div className="p-5 space-y-3 leading-snug">
        {/* Author */}
        <div className="flex items-center gap-3">
          <img
            src={
              flashcard.authorAvatar ||
              `https://i.pravatar.cc/64?u=${flashcard.author}`
            }
            alt={flashcard.author}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow"
          />
          <div className="leading-tight">
            <div className="text-sm text-primary-color font-bold">
              {flashcard.author}
            </div>
            <div className="text-xs text-gray-500">Tác giả</div>
          </div>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-900 line-clamp-2 transition-colors duration-300 group-hover:text-primary-color">
          <Link to={`${routes.FLASHCARD_DETAIL.replace(":id", flashcard.id)}`}>
            {flashcard.title}
          </Link>
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">
          {flashcard.description}
        </p>

        {/* Meta + Học ngay */}
        <div className="flex items-center justify-between text-sm text-gray-600 pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 md:gap-6">
            <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-blue-500" />
              <span className="md:text-[14px] text-[12px]">
                {flashcard.cardCount} thẻ
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-purple-500" />
              <span className="md:text-[14px] text-[12px]">
                {flashcard.studyCount.toLocaleString()} học viên
              </span>
            </div>
          </div>

          <Button
            size="sm"
            className="bg-primary-color text-white font-medium px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform whitespace-nowrap"
            asChild
          >
            <Link
              to={`${routes.FLASHCARD_DETAIL.replace(":id", flashcard.id)}`}
            >
              <Play size={16} className="mr-2" />
              Học ngay
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
