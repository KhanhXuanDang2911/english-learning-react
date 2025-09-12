import { Link } from "react-router-dom";
import type { Course } from "../FeaturedCourses/FeaturedCourses";
import {
  ShoppingCart,
  Star,
  Bookmark,
  Users,
  FileText,
  CreditCard,
} from "lucide-react";
import { Button } from "../ui/button";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={14} className="text-amber-500 fill-amber-500" />
      ))}
      {halfStar && <Star size={14} className="text-amber-500 fill-amber-300" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={i} size={14} className="text-gray-300" />
      ))}
    </div>
  );
}

interface CourseItemProps {
  course: Course;
  viewMode?: "grid" | "list";
}

export default function CourseItem({
  course,
  viewMode = "grid",
}: CourseItemProps) {
  const rating = course.rating || 4.7;
  const lessons = course.lessonsCount || 100;

  if (viewMode === "list") {
    return (
      <div className="group relative bg-white rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col sm:flex-row h-full">
        {/* Thumbnail */}
        <div className="relative w-full sm:w-56 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={course.image || "/placeholder.svg"}
            alt={course.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {/* Rating badge */}
          <div className="absolute left-2 top-2 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-full shadow-sm">
            {renderStars(rating)}
            <span className="text-xs font-semibold text-gray-900">
              {rating.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col justify-between">
          <div className="space-y-2">
            {/* Instructor */}
            <div className="flex items-center gap-2">
              <img
                src={`https://i.pravatar.cc/32?u=${course.instructor}`}
                alt={course.instructor}
                className="w-6 h-6 rounded-full object-cover ring-1 ring-white shadow-sm"
              />
              <div className="text-xs text-primary-color font-medium">
                {course.instructor}
              </div>
            </div>

            {/* Title */}
            <h3 className="text-base font-bold text-gray-900 line-clamp-2">
              <Link
                to={`/courses/${course.id}`}
                className="hover:text-primary-color"
              >
                {course.title}
              </Link>
            </h3>

            {/* Meta */}
            <div className="flex items-center gap-4 text-xs text-gray-600 flex-wrap">
              <div className="flex items-center gap-1">
                <FileText size={12} className="text-blue-500" />
                <span>{lessons} bài học</span>
              </div>
              <div className="flex items-center gap-1">
                <Users size={12} className="text-purple-500" />
                <span>{course.students || 245} học viên</span>
              </div>
            </div>
          </div>

          {/* Price + CTA */}
          <div className="flex items-center justify-between pt-2 border-t border-gray-100 mt-3 gap-3 flex-wrap">
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-extrabold text-gray-900">
                299.000đ
              </span>
              <span className="text-xs text-gray-400 line-through">
                1.299.000đ
              </span>
            </div>
            <div className="flex gap-2 w-full sm:w-auto">
              <Button
                size="sm"
                className="bg-primary-color text-white font-medium px-3 py-1 rounded-lg shadow hover:bg-hover-primary-color transition-all whitespace-nowrap w-full sm:w-auto"
              >
                <CreditCard size={14} className="mr-1" />
                Mua ngay
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="w-8 h-8 rounded-full bg-gray-100 shadow-sm text-gray-700 hover:bg-primary-color hover:text-white transition-colors"
              >
                <Bookmark size={14} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid view
  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 flex flex-col h-full">
      {/* Thumbnail */}
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <img
          src={course.image || "/placeholder.svg"}
          alt={course.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-in-out group-hover:scale-110"
        />
        {/* Rating */}
        <div className="absolute left-4 top-4 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full shadow-md">
          {renderStars(rating)}
          <span className="text-sm font-semibold text-gray-900">
            {rating.toFixed(1)}
          </span>
        </div>
        {/* Bookmark */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4 w-9 h-9 rounded-full bg-white/90 shadow text-gray-700 hover:bg-primary-color hover:text-white transition-colors"
        >
          <Bookmark size={18} />
        </Button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3 flex flex-col flex-1">
        <div className="flex items-center gap-3">
          <img
            src={`https://i.pravatar.cc/64?u=${course.instructor}`}
            alt={course.instructor}
            className="w-10 h-10 rounded-full object-cover ring-2 ring-white shadow"
          />
          <div>
            <div className="text-sm text-primary-color font-bold">
              {course.instructor}
            </div>
            <div className="text-xs text-gray-500">Chuyên gia</div>
          </div>
        </div>

        <h3 className="text-lg font-bold text-gray-900 line-clamp-2">
          <Link
            to={`/courses/${course.id}`}
            className="hover:text-primary-color"
          >
            {course.title}
          </Link>
        </h3>

        <div className="flex items-center gap-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FileText size={16} className="text-blue-500" />
            <span>{lessons} bài học</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={16} className="text-purple-500" />
            <span>{course.students || 245} học viên</span>
          </div>
        </div>

        {/* Spacer để cân chiều cao */}
        <div className="flex-1" />

        {/* Price + CTA */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 gap-3 flex-wrap">
          <div className="flex items-baseline gap-2 min-w-0">
            <span className="text-xl font-extrabold text-gray-900">
              299.000đ
            </span>
            <span className="text-sm text-gray-400 line-through">
              1.299.000đ
            </span>
          </div>
          <div className="flex gap-2 sm:flex-row flex-col w-full sm:w-auto">
            <Button
              size="sm"
              className="bg-primary-color text-white font-medium px-4 py-2 rounded-lg shadow hover:scale-105 transition-transform whitespace-nowrap w-full sm:w-auto"
            >
              <CreditCard size={16} className="mr-2" />
              Mua ngay
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-blue-500 text-blue-500 hover:bg-blue-50 whitespace-nowrap w-full sm:w-auto"
            >
              <ShoppingCart size={16} className="mr-2" />
              Giỏ hàng
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
