import { Link } from "react-router-dom";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import CourseItem from "../CourseItem";

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
    instructor: "Nguyễn Văn A",
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
    instructor: "Trần Thị B",
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
    instructor: "Lê Văn C",
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
    instructor: "Lê Văn C",
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
    <section className="py-32 main-layout">
      <div className="container mx-auto flex flex-col items-center gap-12 lg:px-10">
        <div className="text-center">
          <Badge className="mb-6 bg-[#155e94] text-white">
            Khoá học nổi bật
          </Badge>
          <h2 className="mb-3 text-3xl font-semibold text-pretty md:mb-4 md:text-4xl lg:mb-6 lg:max-w-3xl lg:text-5xl text-[#155e94]">
            Khoá học nổi bật
          </h2>
          <p className="mb-4 text-muted-foreground md:text-base lg:max-w-2xl lg:text-lg">
            Các khoá học chất lượng, cập nhật mới nhất, giúp bạn chinh phục
            tiếng Anh hiệu quả.
          </p>
          <Button
            variant="link"
            className="w-full sm:w-auto text-[#155e94]"
            asChild
          >
            <Link to="#">
              Xem tất cả khoá học
              <ArrowRight className="ml-2 size-4" />
            </Link>
          </Button>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {courses.map((course) => (
            <CourseItem course={course} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedCourses;
