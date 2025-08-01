import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Eye,
  Clock,
  Share2,
  Heart,
  MessageCircle,
} from "lucide-react";
import CommentParent from "@/components/CommentParent";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  replies: any[];
}

// Mock data for post detail
const postDetail = {
  id: 1,
  title: "5 mẹo học từ vựng tiếng Anh lâu quên",
  category: "Từ vựng",
  date: "25 Tháng 7, 2025",
  imageUrl:
    "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
  excerpt:
    "Từ vựng là nền tảng để giao tiếp. Cùng khám phá những cách học từ vựng dễ nhớ và áp dụng hiệu quả trong đời sống.",
  author: "Nguyễn Văn A",
  authorAvatar:
    "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
  readTime: 5,
  views: 1250,
  likes: 89,
  content: `
    <p>Học từ vựng tiếng Anh là một trong những thách thức lớn nhất mà người học gặp phải. Nhiều bạn thường xuyên học từ mới nhưng lại nhanh chóng quên đi. Trong bài viết này, tôi sẽ chia sẻ 5 mẹo hiệu quả giúp bạn ghi nhớ từ vựng lâu hơn.</p>

    <h2>1. Sử dụng phương pháp lặp lại ngắt quãng (Spaced Repetition)</h2>
    <p>Phương pháp này dựa trên nguyên lý của bộ não: chúng ta sẽ nhớ thông tin tốt hơn nếu được nhắc lại theo những khoảng thời gian ngày càng dài. Thay vì học 100 từ trong một ngày, hãy học 10-15 từ và ôn lại chúng theo lịch trình:</p>
    <ul>
      <li>Ngày 1: Học từ mới</li>
      <li>Ngày 2: Ôn lại</li>
      <li>Ngày 4: Ôn lại</li>
      <li>Ngày 7: Ôn lại</li>
      <li>Ngày 14: Ôn lại</li>
    </ul>

    <h2>2. Tạo câu chuyện và hình ảnh liên kết</h2>
    <p>Bộ não con người ghi nhớ hình ảnh và câu chuyện tốt hơn những từ ngữ trừu tượng. Khi học từ mới, hãy:</p>
    <ul>
      <li>Tạo ra một hình ảnh sinh động trong đầu</li>
      <li>Liên kết từ mới với những từ bạn đã biết</li>
      <li>Tạo câu chuyện ngắn sử dụng từ đó</li>
    </ul>

    <h2>3. Sử dụng từ vựng trong ngữ cảnh thực tế</h2>
    <p>Đừng chỉ học từ vựng một cách máy móc. Hãy sử dụng chúng trong:</p>
    <ul>
      <li>Viết nhật ký bằng tiếng Anh</li>
      <li>Nói chuyện với bạn bè</li>
      <li>Mô tả những việc bạn làm hàng ngày</li>
    </ul>

    <h2>4. Nhóm từ vựng theo chủ đề</h2>
    <p>Thay vì học từ vựng một cách ngẫu nhiên, hãy nhóm chúng theo chủ đề như: gia đình, công việc, sở thích, du lịch... Điều này giúp bộ não tạo ra những mối liên kết logic và dễ nhớ hơn.</p>

    <h2>5. Sử dụng công nghệ hỗ trợ</h2>
    <p>Có rất nhiều ứng dụng và công cụ hỗ trợ học từ vựng hiệu quả:</p>
    <ul>
      <li>Anki - Ứng dụng flashcard với thuật toán lặp lại ngắt quãng</li>
      <li>Quizlet - Tạo bộ thẻ từ vựng tương tác</li>
      <li>Memrise - Học từ vựng qua video và hình ảnh</li>
    </ul>

    <h2>Kết luận</h2>
    <p>Học từ vựng hiệu quả không phải là học nhiều mà là học đúng cách. Hãy áp dụng những mẹo trên một cách kiên trì, bạn sẽ thấy sự tiến bộ rõ rệt trong việc ghi nhớ và sử dụng từ vựng tiếng Anh.</p>
  `,
  tags: ["từ vựng", "học tiếng anh", "ghi nhớ", "phương pháp học"],
};

const relatedPosts: any[] = [
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
    id: 4,
    title: "10 lỗi ngữ pháp phổ biến người Việt thường mắc",
    category: "Ngữ pháp",
    date: "5 Tháng 7, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Tìm hiểu những lỗi ngữ pháp thường gặp và cách khắc phục để nâng cao khả năng sử dụng tiếng Anh của bạn.",
    author: "Emma Smith",
    readTime: 6,
    views: 1680,
    slug: "10-loi-ngu-phap-pho-bien-nguoi-viet-thuong-mac",
  },
  {
    id: 5,
    title: "Bí quyết phát âm tiếng Anh chuẩn như người bản ngữ",
    category: "Phát âm",
    date: "28 Tháng 6, 2025",
    imageUrl:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftoeic-la-gi-tat-tan-tat-thong-tin-ve-chung-chi-tieng-anh-toeic.png&w=1920&q=75",
    excerpt:
      "Khám phá những kỹ thuật phát âm hiệu quả và các bài tập thực hành để cải thiện giọng nói tiếng Anh của bạn.",
    author: "James Anderson",
    readTime: 9,
    views: 3200,
    slug: "bi-quyet-phat-am-tieng-anh-chuan-nhu-nguoi-ban-ngu",
  },
];

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Minh Anh",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "Bài viết rất hữu ích! Tôi đã áp dụng phương pháp lặp lại ngắt quãng và thấy hiệu quả rõ rệt.",
    date: "2 giờ trước",
    likes: 12,
    isLiked: false,
    replies: [
      {
        id: 11,
        author: "Nguyễn Văn A",
        avatar:
          "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
        content:
          "Cảm ơn bạn! Rất vui khi biết phương pháp này hữu ích với bạn.",
        date: "1 giờ trước",
        likes: 3,
        isLiked: false,
      },
      {
        id: 12,
        author: "Thanh Hoa",
        avatar:
          "https://images.pexels.com/photos/415829/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
        content:
          "Mình cũng đang thử phương pháp này, hy vọng sẽ có kết quả tốt!",
        date: "30 phút trước",
        likes: 1,
        isLiked: true,
      },
    ],
  },
  {
    id: 2,
    author: "Đức Minh",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "Phương pháp tạo câu chuyện thật sự hiệu quả. Tôi đã thử và nhớ từ vựng lâu hơn rất nhiều. Cảm ơn tác giả!",
    date: "5 giờ trước",
    likes: 8,
    isLiked: true,
    replies: [],
  },
  {
    id: 3,
    author: "Lan Phương",
    avatar:
      "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=600",
    content:
      "Bạn có thể chia sẻ thêm về cách sử dụng Anki hiệu quả không? Mình mới bắt đầu dùng app này.",
    date: "1 ngày trước",
    likes: 5,
    isLiked: false,
    replies: [
      {
        id: 31,
        author: "Nguyễn Văn A",
        avatar:
          "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
        content:
          "Mình sẽ viết một bài chi tiết về Anki trong thời gian tới. Hiện tại bạn có thể bắt đầu với việc tạo deck theo chủ đề nhé!",
        date: "20 giờ trước",
        likes: 7,
        isLiked: false,
      },
    ],
  },
];

const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, "Nội dung không được để trống")
    .max(500, "Không quá 500 ký tự"),
});

export default function PostDetail() {
  // const { slug } = useParams();
  const [comments, setComments] = useState<Comment[]>(initialComments);

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmitComment = (data: z.infer<typeof commentFormSchema>) => {
    console.log(data);
  };

  console.log("re-render");

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-layout py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3">
            <article className="bg-white rounded-lg shadow-sm overflow-hidden">
              {/* Header */}
              <div className="p-6 border-b">
                <Badge className="bg-primary-color mb-4">
                  {postDetail.category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4 text-primary-color">
                  {postDetail.title}
                </h1>

                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        className="object-cover"
                        src={postDetail.authorAvatar || "/placeholder.svg"}
                        alt={postDetail.author}
                      />
                      <AvatarFallback>
                        {postDetail.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{postDetail.author}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{postDetail.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{postDetail.readTime} phút đọc</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{postDetail.views.toLocaleString()} lượt xem</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="bg-transparent cursor-pointer"
                  >
                    <Heart className="h-4 w-4 mr-2 fill-red-500" />
                    10
                  </Button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{ __html: postDetail.content }}
                />

                {/* Tags */}
                <div className="mt-8 pt-6 border-t">
                  <h4 className="font-semibold mb-3">Tags:</h4>
                  <div className="flex flex-wrap gap-2">
                    {postDetail.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-sm">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </article>

            {/* Comments Section */}
            <Card className="mt-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  Bình luận ({comments.length})
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Add Comment */}
                <div className="space-y-3">
                  <Form {...commentForm}>
                    <form
                      onSubmit={commentForm.handleSubmit(handleSubmitComment)}
                      className="space-y-4"
                    >
                      <FormField
                        control={commentForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Viết bình luận của bạn..."
                                className="min-h-[100px]"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <Button
                        variant="outline"
                        className="bg-primary-color text-white hover:bg-hover-primary-color hover:text-white cursor-pointer"
                      >
                        Đăng bình luận
                      </Button>
                    </form>
                  </Form>
                </div>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <CommentParent comment={comment} key={comment.id} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="top-8 space-y-6">
              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle>Về tác giả</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        className="object-cover"
                        src={postDetail.authorAvatar || "/placeholder.svg"}
                        alt={postDetail.author}
                      />
                      <AvatarFallback>
                        {postDetail.author.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{postDetail.author}</h4>
                      <p className="text-sm text-gray-600">
                        Giảng viên tiếng Anh
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-4">
                    Hơn 10 năm kinh nghiệm giảng dạy tiếng Anh, chuyên về phương
                    pháp học từ vựng hiệu quả.
                  </p>
                  <Button
                    variant="outline"
                    className="w-full bg-primary-color hover:bg-hover-primary-color text-white hover:text-white cursor-pointer"
                  >
                    Xem thêm bài viết
                  </Button>
                </CardContent>
              </Card>

              {/* Related Posts */}
              <Card>
                <CardHeader>
                  <CardTitle>Bài viết liên quan</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedPosts.map((post) => (
                    <div key={post.id} className="flex gap-3">
                      <img
                        src={post.imageUrl || "/placeholder.svg"}
                        alt={post.title}
                        className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2 mb-1">
                          <Link
                            to={`/posts/${post.slug}`}
                            className="hover:text-primary-color"
                          >
                            {post.title}
                          </Link>
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>{post.date}</span>
                          <span>•</span>
                          <span>{post.readTime} phút đọc</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
