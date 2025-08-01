import VideoPlayer from "@/components/VideoPlayer";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Play,
  CheckCircle,
  Clock,
  MessageCircle,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  List,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CommentParent from "@/components/CommentParent";
import z from "zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";

// Mock data
const courseData = {
  id: "tieng-anh-giao-tiep-co-ban",
  title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
  progress: {
    completed: 136,
    total: 182,
    percentage: 74.7,
  },
  currentLesson: {
    id: "lesson-1",
    title: "Bài 1: Hướng dẫn",
    duration: "14:05",
    videoSrc:
      "https://videos.pexels.com/video-files/3209298/3209298-uhd_2560_1440_25fps.mp4",
    description: `
      <h2>Chào mừng bạn đến với khóa học!</h2>
      <p>Trong bài học này, chúng ta sẽ tìm hiểu về:</p>
      <ul>
        <li>Cách sử dụng platform học tập hiệu quả</li>
        <li>Lộ trình học tập được đề xuất</li>
        <li>Các tính năng hỗ trợ học tập</li>
      </ul>
      <p>Hãy chắc chắn rằng bạn đã chuẩn bị sẵn sàng để bắt đầu hành trình học tiếng Anh của mình!</p>
      <pre><code>// Class trong JavaScript
// Class giúp tạo ra các object có cùng thuộc tính và
// phương thức. Đồng thời tăng tính tái sử dụng code và dễ
// dàng quản lý code hơn.

// Ôn tập:
// Thuộc tính (Property)
// Phương thức (Method)
// Kế thừa (Inheritance)
// Đóng gói (Encapsulation)

class Engine {
  constructor(engineName) {
    this.engineName = engineName;
  }
  
  startEngine() {
    console.log('Engine started');
  }
}</code></pre>
    `,
  },
  chapters: [
    {
      id: "chapter-1",
      title: "Chương 1: Hướng dẫn tham gia Github và Group hỗ trợ",
      duration: "0:00",
      isCompleted: true,
      lessons: [
        {
          id: "lesson-1",
          title: "Bài 1: Hướng dẫn",
          duration: "0:00",
          isCompleted: true,
          isCurrent: true,
        },
      ],
    },
    {
      id: "chapter-2",
      title: "Chương 2: Ôn tập JS và TS",
      duration: "42:04",
      isCompleted: true,
      lessons: [
        {
          id: "lesson-2",
          title: "Bài 2: JavaScript Class",
          duration: "14:05",
          isCompleted: true,
          isCurrent: false,
        },
        {
          id: "lesson-3",
          title: "Bài 3: Chạy code TypeScript trên Bun, Deno và Node.js",
          duration: "17:55",
          isCompleted: true,
          isCurrent: false,
        },
        {
          id: "lesson-4",
          title: "Bài 4: TypeScript Class",
          duration: "0:00",
          isCompleted: false,
          isCurrent: false,
        },
        {
          id: "lesson-5",
          title: "Bài 5: Higher Order Function và Dependency Injection",
          duration: "10:04",
          isCompleted: true,
          isCurrent: false,
        },
        {
          id: "lesson-6",
          title: "Bài 6: TypeScript Decorator",
          duration: "0:00",
          isCompleted: false,
          isCurrent: false,
        },
      ],
    },
    {
      id: "chapter-3",
      title: "Chương 3: Nest.js cơ bản",
      duration: "6:02:00",
      isCompleted: false,
      lessons: [
        {
          id: "lesson-7",
          title: "Bài 7: Giới thiệu Nest.js",
          duration: "15:30",
          isCompleted: false,
          isCurrent: false,
        },
      ],
    },
    {
      id: "chapter-4",
      title: "Chương 4: Phân tích CSDL dự án Ecommerce",
      duration: "1:05:03",
      isCompleted: false,
      lessons: [],
    },
    {
      id: "chapter-5",
      title: "Chương 5: Chức năng User: Auth",
      duration: "8:37:31",
      isCompleted: false,
      lessons: [],
    },
  ],
};

interface Comment {
  id: number;
  author: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
  isLiked: boolean;
  replies: any[];
  showReplies: boolean;
}

const initialComments: Comment[] = [
  {
    id: 1,
    author: "Minh Anh",
    avatar:
      "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Video rất hay và dễ hiểu! Cảm ơn thầy đã chia sẻ.",
    date: "2 giờ trước",
    likes: 12,
    isLiked: false,
    showReplies: false,
    replies: [
      {
        id: 11,
        author: "Giảng viên",
        avatar:
          "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
        content: "Cảm ơn bạn! Chúc bạn học tập hiệu quả.",
        date: "1 giờ trước",
        likes: 3,
        isLiked: false,
      },
    ],
  },
  {
    id: 2,
    author: "Đức Minh",
    avatar:
      "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=600",
    content: "Mình có thể tải video về để xem offline không ạ?",
    date: "5 giờ trước",
    likes: 8,
    isLiked: true,
    showReplies: false,
    replies: [],
  },
];

const commentFormSchema = z.object({
  content: z
    .string()
    .min(1, "Nội dung không được để trống")
    .max(500, "Không quá 500 ký tự"),
});

export default function Lesson() {
  //   const { courseId, lessonId } = useParams()

  const commentForm = useForm<z.infer<typeof commentFormSchema>>({
    resolver: zodResolver(commentFormSchema),
    defaultValues: {
      content: "",
    },
  });

  const handleSubmitComment = (data: z.infer<typeof commentFormSchema>) => {
    console.log(data);
  };

  const [expandedChapters, setExpandedChapters] = useState<string[]>([
    "chapter-1",
    "chapter-2",
  ]);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [showComments, setShowComments] = useState(false);

  const toggleChapter = (chapterId: string) => {
    setExpandedChapters((prev) =>
      prev.includes(chapterId)
        ? prev.filter((id) => id !== chapterId)
        : [...prev, chapterId]
    );
  };

  // Course Content Component
  const CourseContent = () => (
    <>
      <div className="space-y-2">
        {courseData.chapters.map((chapter) => (
          <>
            <Accordion key={chapter.id} type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="rounded-none px-4 border border-primary-color hover:no-underline cursor-pointer text-primary-color">
                  <div>
                    <h4 className="font-medium text-sm">{chapter.title}</h4>
                    <p className="text-xs text-gray-500">{chapter.duration}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="border border-gray-300 bg-slate-200">
                    {chapter.lessons.map((lesson) => (
                      <Link to="#" key={lesson.id}>
                        <div
                          className={`flex items-center justify-between p-3 border-t border-t-gray-300`}
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <h5 className="text-sm font-medium">
                                {lesson.title}
                              </h5>
                              <div className="flex items-center gap-2 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </>
        ))}
      </div>
    </>
  );

  // Comments Component
  const CommentsSection = () => (
    <div className="space-y-6">
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
                  <FormLabel className="text-[16px]">Bình luận</FormLabel>
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
    </div>
  );

  const [content, setContent] = useState("");

  const handleSubmit = () => {
    console.log("Content HTML:", content);
    // gửi content lên backend
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="main-layout">
          <div className="flex items-center justify-between py-5">
            <div className="flex items-center gap-2">
              <Link to="#">
                <Button variant="outline" size="sm" className="cursor-pointer">
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  Bài trước
                </Button>
              </Link>
              <Link to="#">
                <Button
                  size="sm"
                  className="bg-primary-color hover:bg-hover-primary-color cursor-pointer"
                >
                  Bài tiếp theo
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="main-layout py-6">
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
          {/* Main Content */}
          <div className="xl:col-span-3">
            {/* Video Player */}
            <div className="mb-6">
              <VideoPlayer
                src={courseData.currentLesson.videoSrc}
                title={courseData.currentLesson.title}
                className="w-full aspect-video rounded-lg overflow-hidden"
              />
            </div>

            {/* Lesson Info */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold mb-2 text-primary-color">
                {courseData.currentLesson.title}
              </h1>
              <p className="text-gray-600">Chương 2: Ôn tập JS và TS</p>
            </div>

            {/* Mobile Controls */}
            <div className="xl:hidden flex gap-2 mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <List className="h-4 w-4 mr-2" />
                    Danh sách bài học
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:w-96 p-0">
                  <SheetHeader className="p-6 pb-4">
                    <SheetTitle>{courseData.title}</SheetTitle>
                  </SheetHeader>
                  <div className="px-4 pb-6 overflow-y-auto h-[calc(100vh-120px)]">
                    <CourseContent />
                  </div>
                </SheetContent>
              </Sheet>

              <Sheet open={showComments} onOpenChange={setShowComments}>
                <SheetTrigger asChild>
                  <Button variant="outline" className="flex-1 bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Thảo luận ({comments.length})
                  </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[80vh] p-0">
                  <SheetHeader className="px-6 py-4"></SheetHeader>
                  <div className="px-4 py-0 overflow-y-auto h-[calc(80vh-120px)]">
                    <CommentsSection />
                  </div>
                </SheetContent>
              </Sheet>
            </div>

            {/* Description */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Mô tả bài học</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: "<p>Mô tả khoá học ở đây...</p>",
                  }}
                />
              </CardContent>
            </Card>

            {/* Comments Section - Desktop */}
            <div className="hidden xl:block">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Thảo luận ({comments.length})
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CommentsSection />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Sidebar - Desktop Only */}
          <div className="hidden xl:block">
            <div className="sticky top-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">{courseData.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CourseContent />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
