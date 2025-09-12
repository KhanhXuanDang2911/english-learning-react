import { Link } from "react-router-dom";
import PostItem from "../PostItem";
import { Button } from "../ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import AnimatedBlogBackground from "./AnimatedBlogBackground";

export interface Post {
  id: number;
  title: string;
  category: string;
  date: string;
  imageUrl: string;
  excerpt: string;
  author?: string;
  readTime?: number;
  views?: number;
  slug?: string;
}

const blogPosts: Post[] = [
  {
    id: 1,
    title: "5 mẹo học từ vựng tiếng Anh hiệu quả và lâu nhớ",
    category: "Courses",
    date: "October 18, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1535982330050-f1c2fb79ff78?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwxfHxzdHVkZW50cyUyMGJvb2tzJTIwYmFja3BhY2slMjBsZWFybmluZ3xlbnwwfDB8fHwxNzU3NjA3NjI4fDA&ixlib=rb-4.1.0&q=85",
    excerpt:
      "Khám phá những phương pháp học từ vựng được chứng minh hiệu quả, giúp bạn ghi nhớ lâu dài và áp dụng thành thạo trong giao tiếp hàng ngày.",
    author: "Nguyễn Văn A",
    readTime: 5,
    views: 1250,
    slug: "5-meo-hoc-tu-vung-tieng-anh-lau-quen",
  },
  {
    id: 2,
    title: "Phương pháp luyện nghe tiếng Anh qua phim và podcast",
    category: "Laravel",
    date: "November 15, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxib29rcyUyMGxhcHRvcCUyMG5vdGVib29rJTIwc3R1ZHl8ZW58MHwwfHx8MTc1NzYwNzYyOHww&ixlib=rb-4.1.0&q=85",
    excerpt:
      "Hướng dẫn chi tiết cách sử dụng phim ảnh và podcast để cải thiện kỹ năng nghe tiếng Anh một cách tự nhiên và thú vị.",
    author: "Trần Thị B",
    readTime: 7,
    views: 890,
    slug: "cach-luyen-nghe-tieng-anh-qua-phim-va-podcast",
  },
  {
    id: 3,
    title: "Chiến lược ôn thi IELTS Speaking đạt band 7.0+",
    category: "WordPress",
    date: "December 13, 2025",
    imageUrl:
      "https://images.unsplash.com/photo-1706403615881-d83dc2067c5d?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHwyfHxsYW5ndWFnZSUyMGNvbW11bmljYXRpb24lMjBlZHVjYXRpb24lMjBpbnRlcm5hdGlvbmFsfGVufDB8MHx8fDE3NTc2MDc2Mjh8MA&ixlib=rb-4.1.0&q=85",
    excerpt:
      "Bí quyết và lộ trình ôn luyện IELTS Speaking hiệu quả, từ cơ bản đến nâng cao, giúp bạn tự tin đạt điểm cao trong kỳ thi.",
    author: "Lê Văn C",
    readTime: 8,
    views: 2100,
    slug: "chien-luoc-on-thi-ielts-speaking",
  },
  {
    id: 4,
    title: "Cách xây dựng thói quen học tiếng Anh hàng ngày",
    category: "Courses",
    date: "January 5, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1659080907341-0f382eeb9c3b?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw0fHxzdHVkZW50cyUyMGJvb2tzJTIwYmFja3BhY2slMjBsZWFybmluZ3xlbnwwfDB8fHwxNzU3NjA3NjI4fDA&ixlib=rb-4.1.0&q=85",
    excerpt:
      "Hướng dẫn tạo lập thói quen học tiếng Anh bền vững, giúp bạn duy trì động lực và đạt được tiến bộ vượt bậc.",
    author: "Phạm Thị D",
    readTime: 6,
    views: 1580,
    slug: "xay-dung-thoi-quen-hoc-tieng-anh",
  },
  {
    id: 5,
    title: "Bí quyết giao tiếp tiếng Anh tự tin trong công việc",
    category: "Laravel",
    date: "January 20, 2026",
    imageUrl:
      "https://images.unsplash.com/photo-1503676382389-4809596d5290?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTAwNDR8MHwxfHNlYXJjaHw2fHxzdHVkZW50cyUyMGJvb2tzJTIwYmFja3BhY2slMjBsZWFybmluZ3xlbnwwfDB8fHwxNzU3NjA3NjI4fDA&ixlib=rb-4.1.0&q=85",
    excerpt:
      "Những kỹ thuật và chiến lược giúp bạn giao tiếp tiếng Anh một cách tự tin và chuyên nghiệp trong môi trường làm việc.",
    author: "Hoàng Văn E",
    readTime: 9,
    views: 2350,
    slug: "giao-tiep-tieng-anh-cong-viec",
  },
];

export default function FeaturedPosts() {
  return (
    <section className="relative w-full py-24 bg-gradient-to-br from-slate-50 via-sky-50/30 to-blue-50/20 overflow-hidden">
      {/* Animated Background */}
      <AnimatedBlogBackground />

      <div className="relative z-10 px-4 md:px-6 flex flex-col items-center max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-20 space-y-8 text-center max-w-4xl">
          {/* Badge */}
          <div className="inline-flex items-center justify-center">
            <span className="bg-sky-100/80 backdrop-blur-sm text-sky-700 px-6 py-3 rounded-full text-sm font-bold tracking-wider uppercase shadow-lg">
              CHIA SẺ KIẾN THỨC
            </span>
          </div>

          {/* Main Title */}
          <h2 className="text-4xl md:text-4xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Những kiến thức quý giá để
            <br />
            <span className="bg-gradient-to-r from-sky-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent">
              nâng cao trình độ tiếng Anh
            </span>
          </h2>
        </div>

        {/* Carousel for Mobile, Grid for Desktop */}
        <div className="w-full mb-16">
          {/* Mobile Carousel */}
          <div className="block lg:hidden">
            <Carousel className="w-full">
              <CarouselContent className="-ml-4">
                {blogPosts.map((post) => (
                  <CarouselItem
                    key={post.id}
                    className="pl-4 basis-full sm:basis-1/2"
                  >
                    <PostItem post={post} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-4" />
              <CarouselNext className="right-4" />
            </Carousel>
          </div>

          {/* Desktop Grid */}
          <div className="hidden lg:grid grid-cols-3 gap-8">
            {blogPosts.slice(0, 3).map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="lg"
            className="border-2 border-slate-300 text-slate-700 hover:bg-white hover:border-sky-400 hover:text-sky-600 px-10 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl backdrop-blur-sm bg-white/80"
            asChild
          >
            <Link to="/posts">Xem tất cả bài viết</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
