"use client";

import type React from "react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import DictationLessonCard from "@/components/DictationLessonCard";

// Mock data for dictation lessons
export const mockDictationLessons = [
  {
    id: "daily-dictation-1",
    title: "Daily Dictation - Level 1",
    description:
      "Bài chép chính tả hàng ngày cơ bản, phù hợp cho người mới bắt đầu.",
    difficulty: "Dễ",
    duration: "5 phút",
    imageUrl: "/placeholder.svg?height=200&width=300",
    mediaUrl:
      "https://admin.zenlishtoeic.vn/wp-content/uploads/2024/10/1.-Tranh-1_02.mp3",
    sentences: [
      {
        id: 1,
        text: "The quick brown fox jumps over the lazy dog.",
        startTime: 0,
        endTime: 3.5,
      },
      {
        id: 2,
        text: "Practice makes perfect, so keep trying.",
        startTime: 4.0,
        endTime: 7.2,
      },
      {
        id: 3,
        text: "Learning a new language can be challenging but rewarding.",
        startTime: 7.5,
        endTime: 11.8,
      },
      {
        id: 4,
        text: "Please ensure all necessary documents are submitted by Friday.",
        startTime: 12.0,
        endTime: 16.5,
      },
      {
        id: 5,
        text: "Artificial intelligence is transforming various industries.",
        startTime: 17.0,
        endTime: 21.0,
      },
    ],
  },
  {
    id: "business-english-2",
    title: "Business English Dictation - Level 2",
    description:
      "Luyện nghe chép chính tả với các đoạn hội thoại tiếng Anh thương mại.",
    difficulty: "Trung bình",
    duration: "8 phút",
    imageUrl: "/placeholder.svg?height=200&width=300",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    sentences: [
      {
        id: 1,
        text: "We need to finalize the report by end of day.",
        startTime: 0,
        endTime: 4.0,
      },
      {
        id: 2,
        text: "The market trends indicate a significant shift in consumer behavior.",
        startTime: 4.5,
        endTime: 9.0,
      },
      {
        id: 3,
        text: "Our quarterly earnings have exceeded expectations.",
        startTime: 9.5,
        endTime: 13.0,
      },
      {
        id: 4,
        text: "Let's schedule a follow-up meeting to discuss the next steps.",
        startTime: 13.5,
        endTime: 18.0,
      },
    ],
  },
  {
    id: "academic-listening-3",
    title: "Academic Listening - Level 3",
    description:
      "Các bài nghe học thuật phức tạp, giúp cải thiện kỹ năng nghe hiểu.",
    difficulty: "Khó",
    duration: "12 phút",
    imageUrl: "/placeholder.svg?height=200&width=300",
    mediaUrl: "/placeholder.svg?height=400&width=600",
    sentences: [
      {
        id: 1,
        text: "The theory of relativity revolutionized our understanding of space and time.",
        startTime: 0,
        endTime: 6.0,
      },
      {
        id: 2,
        text: "Quantum mechanics describes the behavior of matter and light at the atomic and subatomic levels.",
        startTime: 6.5,
        endTime: 13.0,
      },
      {
        id: 3,
        text: "The industrial revolution led to unprecedented changes in society and economy.",
        startTime: 13.5,
        endTime: 19.0,
      },
    ],
  },
];

const DictationLessonsPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredLessons = mockDictationLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">Bài Học Chép Chính Tả</h1>
      <p className="text-muted-foreground mb-8">
        Chọn một bài học để bắt đầu luyện tập kỹ năng nghe và viết của bạn.
      </p>

      <div className="flex items-center space-x-2 mb-8">
        <Input
          type="text"
          placeholder="Tìm kiếm bài học..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Button variant="outline" size="icon">
          <Search className="h-4 w-4" />
          <span className="sr-only">Tìm kiếm</span>
        </Button>
      </div>

      {filteredLessons.length === 0 ? (
        <p className="text-center text-muted-foreground">
          Không tìm thấy bài học nào phù hợp.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLessons.map((lesson) => (
            <DictationLessonCard key={lesson.id} lesson={lesson} />
          ))}
        </div>
      )}
    </div>
  );
};

export default DictationLessonsPage;
