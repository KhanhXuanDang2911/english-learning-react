import { Link } from "react-router-dom";
import type { Course } from "../FeaturedCourses/FeaturedCourses";
import {
  Heart,
  ShoppingCart,
  Star,
  StarHalf,
  StarIcon as StarOutline,
} from "lucide-react";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { HoverCardArrow } from "@radix-ui/react-hover-card";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
  return (
    <span className="flex items-center gap-0.5">
      {[...Array(fullStars)].map((_, i) => (
        <Star key={i} size={10} className="text-[#c4710d] fill-[#c4710d]" />
      ))}
      {halfStar && (
        <StarHalf size={10} className="text-[#c4710d] fill-[#c4710d]" />
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <StarOutline
          key={i}
          size={10}
          className="text-[#c4710d] fill-[#c4710d]"
        />
      ))}
    </span>
  );
}

function useResponsiveSide() {
  const [side, setSide] = useState<"right" | "top">(
    window.innerWidth >= 768 ? "right" : "top"
  );
  useEffect(() => {
    function handleResize() {
      setSide(window.innerWidth >= 768 ? "right" : "top");
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return side;
}

interface CourseItemProps {
  course: Course;
}

export default function CourseItem({ course }: CourseItemProps) {
  const rating = course.rating || 4.7;
  const ratingCount = course.ratingCount || 446671;
  const hours = course.hours || 61.5;
  const lessons = course.lessonsCount || 100;
  const side = useResponsiveSide();
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <div className="relative group cursor-pointer transition-all duration-200">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 group-hover:shadow-xl transition-shadow duration-200">
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={course.image || "/placeholder.svg"}
                alt={course.title}
                className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-3">
              <h3 className="text-base font-semibold line-clamp-2 mb-1 text-primary-color hover:text-hover-primary-color min-h-[48px]">
                <Link to={`/courses/${course.id}`}>{course.title}</Link>
              </h3>
              <div className="text-xs text-gray-500 mb-1">
                Giảng viên: {course.instructor}
              </div>
              <div className="flex items-center gap-2 text-xs mb-1">
                <span className="font-bold text-[#b4690e] text-base">
                  {rating}
                </span>
                {renderStars(rating)}
                <span className="text-gray-400">
                  ({ratingCount.toLocaleString()})
                </span>
              </div>
              <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                <span>{hours} giờ học</span>
                <span>{lessons} bài giảng</span>
                <Heart size={16} className="text-gray-400" />
              </div>
              <div className="flex gap-3">
                <div className="text-base font-bold text-[#155e94]">
                  299.000đ
                </div>
                <div className="text-base text-[#595c73] line-through">
                  1299.000đ
                </div>
              </div>
            </div>
          </div>
        </div>
      </HoverCardTrigger>
      <HoverCardContent
        className="w-96 border rounded-none"
        side={side}
        align="center"
      >
        <HoverCardArrow className="fill-[primary-color] w-3 h-3" />
        <div className="flex flex-col gap-2">
          <div className="font-bold text-lg mb-2">{course.title}</div>
          <div className="text-sm mb-2 line-clamp-3">{course.summary}</div>
          <div className="text-xs mb-2">
            Giảng viên: <span className="font-medium">{course.instructor}</span>
          </div>
          <ul className="text-sm mb-2 list-disc pl-5">
            <li>
              Build 16 web development projects for your portfolio, ready to
              apply for junior developer jobs.
            </li>
            <li>
              Learn the latest technologies, including Javascript, React, Node
              and even Web3 development.
            </li>
            <li>
              After the course you will be able to build ANY website you want.
            </li>
          </ul>
          <Button className="bg-primary-color hover:bg-hover-primary-color cursor-pointer">
            <ShoppingCart size={18} />
            Add to card
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
