"use client";

import type React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { Link } from "react-router-dom";
import routes from "@/routes/routes.const";

interface DictationLessonCardProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    difficulty: string;
    duration: string;
    imageUrl: string;
  };
}

const DictationLessonCard: React.FC<DictationLessonCardProps> = ({
  lesson,
}) => {
  return (
    <Card className="flex flex-col overflow-hidden transition-all hover:shadow-lg">
      <div className="relative w-full h-48 overflow-hidden">
        <img
          src={lesson.imageUrl || "/placeholder.svg"}
          alt={lesson.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-4 left-4 text-white">
          <CardTitle className="text-xl">{lesson.title}</CardTitle>
          <CardDescription className="text-sm text-gray-200">
            {lesson.description}
          </CardDescription>
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <div className="flex justify-between items-center text-sm text-muted-foreground mb-3">
          <span>Độ khó: {lesson.difficulty}</span>
          <span>Thời lượng: {lesson.duration}</span>
        </div>
        <Link to={routes.DICTATION_DETAIL.replace(":id", lesson.id)}>
          <Button className="w-full bg-[#155e94] hover:bg-[#155e94]/90 text-white">
            <Play className="h-4 w-4 mr-2" /> Bắt đầu luyện tập
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default DictationLessonCard;
