import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import CourseItem from "../CourseItem";
import AnimatedBackground from "./AnimatedBackground";

export interface Course {
  id: string;
  title: string;
  summary: string;
  label: string;
  instructor: string;
  published: string;
  url: string;
  image: string;
  lessonsCount?: number;
  students?: number;
  likes?: number;
  rating?: number;
  ratingCount?: number;
  hours?: number;
}

const courses: Course[] = [
  {
    id: "c1",
    title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
    summary:
      "Khoá học giúp bạn xây dựng nền tảng giao tiếp tiếng Anh cơ bản, tự tin nói chuyện trong các tình huống hàng ngày.",
    label: "Cơ bản",
    instructor: "Nguyễn Mai Phương",
    published: "20 Tháng 7, 2025",
    url: "#",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 24,
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
    instructor: "Trần Văn Tùng",
    published: "18 Tháng 7, 2025",
    url: "#",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 30,
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
    instructor: "Mai Văn Hà",
    published: "15 Tháng 7, 2025",
    url: "#",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 18,
    likes: 20,
    rating: 4.5,
    ratingCount: 9876,
    hours: 25,
  },
  {
    id: "c4",
    title: "Từ vựng tiếng Anh cho người đi làm",
    summary:
      "Nâng cao vốn từ vựng chuyên ngành, giao tiếp hiệu quả trong môi trường công sở quốc tế.",
    label: "Từ vựng",
    instructor: "Dương Đình Hoàng",
    published: "15 Tháng 7, 2025",
    url: "#",
    image:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    lessonsCount: 18,
    likes: 20,
    rating: 4.2,
    ratingCount: 5432,
    hours: 18,
  },
];

const FeaturedCourses = () => {
  return (
    <section className="relative py-32 main-layout overflow-hidden bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20">
      <AnimatedBackground />

      <div className="relative z-10 container mx-auto flex flex-col items-center gap-12 lg:px-10">
        {/* Header */}
        <div className="relative w-full flex flex-col items-center text-center">
          {/* Badge */}
          <div className="relative mb-6">
            <Badge className="relative bg-gradient-to-r from-[#155e94] to-blue-900 text-white text-[16px] px-6 py-2 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
              <span className="relative z-10">Khám phá ngay</span>
            </Badge>
          </div>

          {/* Title */}
          <div className="relative mb-3 md:mb-4 lg:mb-6">
            <h2 className="text-5xl font-bold md:text-4xl lg:max-w-3xl lg:text-5xl bg-gradient-to-r  bg-primary-color bg-clip-text text-transparent animate-fade-in">
              Các khoá học nổi bật
            </h2>
            <div
              className="absolute inset-0 text-5xl font-bold md:text-4xl lg:max-w-3xl lg:text-5xl text-[#155e94]/15 blur-md -z-10"
              style={{ animationDelay: "0.2s" }}
            >
              Hành trình học tập nổi bật
            </div>
          </div>

          {/* Subtitle */}
          <p
            className="mb-6 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg animate-slide-up"
            style={{ animationDelay: "0.4s" }}
          >
            Những khoá học chất lượng, được lựa chọn đặc biệt để giúp bạn chinh
            phục tiếng Anh hiệu quả hơn.
          </p>

          {/* Button */}
          <div className="animate-slide-up" style={{ animationDelay: "0.6s" }}>
            <Button
              className="rounded-full bg-gradient-to-r bg-primary-color text-white px-8 py-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
              asChild
            >
              <Link to="#" className="flex items-center font-semibold">
                Xem tất cả khoá học
                <ArrowRight className="ml-2 size-5 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </Button>
          </div>
        </div>

        {/* Courses grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseItem key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
