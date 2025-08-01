import { Link } from "react-router-dom";
import PostItem from "../PostItem";
import { Button } from "../ui/button";

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
];

export default function FeaturedPosts() {
  return (
    <div className="main-layout">
      <section className="w-full pt-10 pb-12 md:pb-16 lg:pb-20 bg-background">
        <div className="px-4 md:px-6 flex flex-col items-center">
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-4xl font-bold tracking-tight md:text-[48px] text-primary-color">
              Bài viết nổi bật
            </h2>
            <p className="text-muted-foreground text-sm md:text-base">
              Cập nhật những bài chia sẻ, mẹo học và xu hướng luyện tiếng Anh
              hiệu quả.
            </p>
          </div>

          <div className="w-full max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch justify-center justify-items-center">
            {blogPosts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </div>
        </div>
        <div className="mt-2 flex justify-center sm:mt-8">
          <Button
            variant="outline"
            className="w-full max-w-sm bg-transparent"
            asChild
          >
            <Link to="/posts">Xem tất cả bài viết</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
