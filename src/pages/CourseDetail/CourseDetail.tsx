import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CoursePreviewModal from "@/components/CoursePreviewModal";

import {
  Star,
  Clock,
  Users,
  BookOpen,
  Globe,
  Play,
  Lock,
  Check,
  Heart,
  ChevronDown,
  ChevronRight,
  StarHalf,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Mock data for course detail
const courseDetail = {
  id: "tieng-anh-giao-tiep-co-ban",
  title: "Tiếng Anh giao tiếp cho người mới bắt đầu",
  subtitle: "Xây dựng nền tảng giao tiếp tiếng Anh vững chắc từ con số 0",
  description:
    "Khóa học được thiết kế dành riêng cho người mới bắt đầu học tiếng Anh. Bạn sẽ học được những cụm từ, câu giao tiếp cơ bản nhất trong cuộc sống hàng ngày, từ việc chào hỏi, giới thiệu bản thân đến mua sắm, đặt món ăn tại nhà hàng.",
  instructor: {
    name: "Nguyễn Văn A",
    title: "Giảng viên tiếng Anh 10+ năm kinh nghiệm",
    avatar:
      "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    students: 15420,
    courses: 12,
  },
  image:
    "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
  rating: 4.7,
  ratingCount: 2847,
  students: 12450,
  hours: 25.5,
  lessons: 156,
  level: "Cơ bản",
  language: "Tiếng Việt",
  price: 299000,
  originalPrice: 1299000,
  discount: 77,
  previewVideo:
    "/placeholder.svg?height=720&width=1280&text=Course+Preview+Video",
  features: `
  <ul>
    <li>25.5 giờ video theo yêu cầu</li>
    <li>156 bài giảng</li>
    <li>Truy cập trọn đời</li>
    <li>Truy cập trên thiết bị di động và TV</li>
    <li>Chứng chỉ hoàn thành</li>
    <li>Tài liệu tải về</li>
  </ul>
`,

  whatYouLearn: `
  <ul>
    <li>Giao tiếp cơ bản trong các tình huống hàng ngày</li>
    <li>Phát âm chuẩn các âm tiếng Anh</li>
    <li>Từ vựng thiết yếu cho người mới bắt đầu (1000+ từ)</li>
    <li>Ngữ pháp cơ bản: thì hiện tại, quá khứ, tương lai</li>
    <li>Kỹ năng nghe hiểu đối thoại đơn giản</li>
    <li>Tự tin giới thiệu bản thân bằng tiếng Anh</li>
  </ul>
`,

  requirements: `
  <ul>
    <li>Không cần kiến thức tiếng Anh trước đó</li>
    <li>Máy tính hoặc điện thoại có kết nối internet</li>
    <li>Sự kiên trì và động lực học tập</li>
  </ul>
`,

  curriculum: [
    {
      title: "Giới thiệu và làm quen",
      lessons: 8,
      duration: "1h 30m",
      isPreview: true,
      lectures: [
        {
          title: "Chào mừng đến với khóa học",
          duration: "5:30",
          isPreview: true,
        },
        { title: "Cách học hiệu quả nhất", duration: "8:45", isPreview: true },
        {
          title: "Bảng chữ cái tiếng Anh",
          duration: "12:20",
          isPreview: false,
        },
        { title: "Các âm cơ bản", duration: "15:30", isPreview: false },
      ],
    },
    {
      title: "Chào hỏi và giới thiệu",
      lessons: 12,
      duration: "2h 15m",
      isPreview: false,
      lectures: [
        { title: "Cách chào hỏi cơ bản", duration: "10:20", isPreview: false },
        { title: "Giới thiệu bản thân", duration: "12:45", isPreview: false },
        { title: "Hỏi thông tin cá nhân", duration: "8:30", isPreview: false },
        { title: "Thực hành đối thoại", duration: "15:20", isPreview: false },
      ],
    },
    {
      title: "Gia đình và bạn bè",
      lessons: 10,
      duration: "1h 45m",
      isPreview: false,
      lectures: [
        { title: "Từ vựng về gia đình", duration: "9:15", isPreview: false },
        { title: "Miêu tả người thân", duration: "11:30", isPreview: false },
        { title: "Nói về sở thích", duration: "13:20", isPreview: false },
      ],
    },
  ],
  reviews: [
    {
      id: 1,
      user: "Minh Anh",
      avatar:
        "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 5,
      date: "2 tuần trước",
      comment:
        "Khóa học rất hay, giảng viên dạy dễ hiểu. Tôi đã có thể giao tiếp cơ bản sau 1 tháng học.",
    },
    {
      id: 2,
      user: "Thanh Hoa",
      avatar:
        "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=600",
      rating: 4,
      date: "1 tháng trước",
      comment:
        "Nội dung khóa học phong phú, có nhiều bài tập thực hành. Chỉ mong có thêm nhiều tình huống thực tế hơn.",
    },
  ],
};

const reviewFormSchema = z.object({
  content: z
    .string()
    .min(1, "Nội dung không được để trống")
    .max(500, "Nội dung không được vượt quá 500 ký tự"),
  rating: z.enum(["1", "2", "3", "4", "5"], {
    message: "Vui lòng chọn số sao",
  }),
});

export default function CourseDetail() {
  // const { slug } = useParams();
  const [expandedSections, setExpandedSections] = useState<number[]>([0]);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isOpenModalPreview, setOpenModalPreview] = useState<boolean>(false);

  const reviewForm = useForm<z.infer<typeof reviewFormSchema>>({
    defaultValues: {
      content: "",
      rating: "5",
    },
    resolver: zodResolver(reviewFormSchema),
  });

  const handleSubmitReviewForm = (data: z.infer<typeof reviewFormSchema>) => {
    console.log(data);
    reviewForm.setValue("content", "");
  };

  const toggleSection = (index: number) => {
    setExpandedSections((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, index) => {
        if (index < Math.floor(rating))
          return (
            <>
              <Star
                key={index}
                className="h-4 w-4 text-yellow-400 fill-yellow-400"
              />
            </>
          );
        else if (index === Math.floor(rating)) {
          if (rating - Math.floor(rating) > 0) {
            return (
              <>
                <StarHalf
                  key={index}
                  className="h-4 w-4 text-yellow-400 fill-yellow-400"
                />
              </>
            );
          } else return <Star key={index} className="h-4 w-4 text-gray-300" />;
        } else return <Star key={index} className="h-4 w-4 text-gray-300" />;
      });
  };

  const handlePreviewLecture = () => {
    setOpenModalPreview(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white">
        <div className="main-layout py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Course Info */}
            <div className="lg:col-span-2">
              <div className="mb-4">
                <Badge className="bg-yellow-500 text-black mb-2">
                  Bestseller
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {courseDetail.title}
                </h1>
                <p className="text-xl text-gray-300 mb-6">
                  {courseDetail.subtitle}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">{renderStars(courseDetail.rating)}</div>
                  <span className="font-semibold">{courseDetail.rating}</span>
                  <span className="text-gray-300">
                    ({courseDetail.ratingCount.toLocaleString()} đánh giá)
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4" />
                  <span>{courseDetail.students.toLocaleString()} học viên</span>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span>Được tạo bởi</span>
                <a
                  href="#"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  {courseDetail.instructor.name}
                </a>
              </div>

              <div className="flex flex-wrap items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>{courseDetail.language}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>Cập nhật lần cuối 7/2025</span>
                </div>
              </div>
            </div>

            {/* Course Preview Card - Mobile */}
            <div className="lg:hidden">
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={courseDetail.image || "/placeholder.svg"}
                      alt={courseDetail.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="p-6">
                    <div className="text-center mb-4">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold">
                          {courseDetail.price.toLocaleString()}đ
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {courseDetail.originalPrice.toLocaleString()}đ
                        </span>
                      </div>
                      <Badge variant="destructive" className="text-sm">
                        Giảm {courseDetail.discount}%
                      </Badge>
                    </div>

                    <div className="space-y-3">
                      <Button
                        className="w-full bg-primary-color hover:bg-hover-primary-color cursor-pointer"
                        size="lg"
                      >
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent cursor-pointer"
                        size="lg"
                      >
                        Mua ngay
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <div className="main-layout py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* What you'll learn */}
            <Card>
              <CardHeader>
                <CardTitle>Bạn sẽ học được gì</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: courseDetail.whatYouLearn,
                  }}
                />
              </CardContent>
            </Card>

            {/* Course Content */}
            <Card>
              <CardHeader>
                <CardTitle>Nội dung khóa học</CardTitle>
                <div className="text-sm text-gray-600">
                  {courseDetail.curriculum.length} phần • {courseDetail.lessons}{" "}
                  bài giảng •{courseDetail.hours}h tổng thời lượng
                </div>
              </CardHeader>
              <CardContent className="space-y-2">
                {courseDetail.curriculum.map((section, index) => (
                  <>
                    <Accordion key={index} type="single" collapsible>
                      <AccordionItem value="item-1">
                        <AccordionTrigger className="cursor-pointer hover:bg-slate-100 px-6 border border-primary-color hover:no-underline rounded-none">
                          <div className="">
                            <p className="text-[16px] font-semibold">
                              {section.title}
                            </p>
                            <p className="text-sm text-gray-600">
                              {section.lessons} bài giảng • {section.duration}
                            </p>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="bg-slate-200">
                            {section.lectures.map((lecture, lectureIndex) => (
                              <div
                                key={lectureIndex}
                                className="flex items-center justify-between p-4 border-t border-t-gray-300"
                              >
                                <div className="flex items-center gap-3">
                                  {lecture.isPreview ? (
                                    <button
                                      onClick={handlePreviewLecture}
                                      className="flex items-center gap-2 hover:text-blue-600 cursor-pointer"
                                    >
                                      <Play className="h-4 w-4 text-blue-500" />
                                      <span className="text-sm">
                                        {lecture.title}
                                      </span>
                                    </button>
                                  ) : (
                                    <>
                                      <Lock className="h-4 w-4 text-gray-400" />
                                      <span className="text-sm">
                                        {lecture.title}
                                      </span>
                                    </>
                                  )}
                                  {lecture.isPreview && (
                                    <Badge
                                      variant="outline"
                                      className="text-xs"
                                    >
                                      Xem trước
                                    </Badge>
                                  )}
                                </div>
                                <span className="text-sm text-gray-500">
                                  {lecture.duration}
                                </span>
                              </div>
                            ))}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </>
                ))}
              </CardContent>
            </Card>

            {/* Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Yêu cầu</CardTitle>
              </CardHeader>
              <CardContent>
                <div
                  dangerouslySetInnerHTML={{
                    __html: courseDetail.requirements,
                  }}
                />
              </CardContent>
            </Card>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Mô tả</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {courseDetail.description}
                </p>
              </CardContent>
            </Card>

            {/* Instructor */}
            <Card>
              <CardHeader>
                <CardTitle>Giảng viên</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <img
                    src={courseDetail.instructor.avatar || "/placeholder.svg"}
                    alt={courseDetail.instructor.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-lg mb-1">
                      {courseDetail.instructor.name}
                    </h4>
                    <p className="text-gray-600 mb-3">
                      {courseDetail.instructor.title}
                    </p>

                    <div className="flex flex-wrap gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        <span>
                          {courseDetail.instructor.students.toLocaleString()}{" "}
                          học viên
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4" />
                        <span>{courseDetail.instructor.courses} khóa học</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader>
                <CardTitle>Đánh giá của học viên</CardTitle>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex">
                      {renderStars(courseDetail.rating)}
                    </div>
                    <span className="text-2xl font-bold">
                      {courseDetail.rating}
                    </span>
                  </div>
                  <span className="text-gray-600">
                    {courseDetail.ratingCount.toLocaleString()} đánh giá
                  </span>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Form review */}
                <div className="space-y-3">
                  <Form {...reviewForm}>
                    <form
                      onSubmit={reviewForm.handleSubmit(handleSubmitReviewForm)}
                      className="space-y-4"
                    >
                      <FormField
                        control={reviewForm.control}
                        name="rating"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-[#295779]">
                              Số sao{" "}
                              <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                              <span className="text-red-500 -ml-1.5">*</span>
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger className="w-full">
                                  <SelectValue placeholder="Chọn giới tính" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">
                                  1{" "}
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </SelectItem>
                                <SelectItem value="2">
                                  2{" "}
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </SelectItem>
                                <SelectItem value="3">
                                  3{" "}
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </SelectItem>
                                <SelectItem value="4">
                                  4{" "}
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </SelectItem>
                                <SelectItem value="5">
                                  5{" "}
                                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={reviewForm.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Mô tả</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Viết đánh giá của bạn..."
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
                        Gửi đánh giá
                      </Button>
                    </form>
                  </Form>
                </div>
                {/* List reviews */}
                {courseDetail.reviews.map((review) => (
                  <div key={review.id} className="flex gap-4">
                    <img
                      src={review.avatar || "/placeholder.svg"}
                      alt={review.user}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-semibold">{review.user}</span>
                        <div className="flex">{renderStars(review.rating)}</div>
                        <span className="text-sm text-gray-500">
                          {review.date}
                        </span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Xem tất cả đánh giá
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Desktop */}
          <div className="hidden lg:block">
            <div className="top-8">
              <Card>
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={courseDetail.image || "/placeholder.svg"}
                      alt={courseDetail.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                  </div>

                  <div className="p-6">
                    <div className="text-center mb-6">
                      <div className="flex items-baseline justify-center gap-2 mb-2">
                        <span className="text-3xl font-bold">
                          {courseDetail.price.toLocaleString()}đ
                        </span>
                        <span className="text-lg text-gray-500 line-through">
                          {courseDetail.originalPrice.toLocaleString()}đ
                        </span>
                      </div>
                      <Badge variant="destructive" className="text-sm">
                        Giảm {courseDetail.discount}%
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-6">
                      <Button
                        className="w-full bg-primary-color hover:bg-hover-primary-color cursor-pointer"
                        size="lg"
                      >
                        Thêm vào giỏ hàng
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full bg-transparent cursor-pointer"
                        size="lg"
                      >
                        Mua ngay
                      </Button>
                    </div>

                    <div className="flex justify-center gap-4 mb-6">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                        className="cursor-pointer"
                      >
                        <Heart
                          className={`h-4 w-4 mr-2 ${
                            isWishlisted ? "fill-red-500 text-red-500" : ""
                          }`}
                        />
                        Yêu thích
                      </Button>
                    </div>

                    <div className="space-y-3 text-sm">
                      <h4 className="font-semibold">Khóa học này bao gồm:</h4>
                      <div
                        dangerouslySetInnerHTML={{
                          __html: courseDetail.features,
                        }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Course Preview Modal */}
      <CoursePreviewModal
        isOpen={isOpenModalPreview}
        setOpen={setOpenModalPreview}
        courseTitle={courseDetail.title}
        videoSrc={courseDetail.previewVideo}
        videoPoster={courseDetail.image}
      />
    </div>
  );
}
