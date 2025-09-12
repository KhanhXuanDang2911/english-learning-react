import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpenText, Gem } from "lucide-react";

interface DictationLesson {
  id: string;
  title: string;
  subtitle: string;
  parts: number;
  vocabLevel: string;
  type: "Conversation" | "Short Talk";
}

interface DictationLessonCardProps {
  lesson: DictationLesson;
  onClick?: (lessonId: string) => void;
}

export default function DictationLessonCard({
  lesson,
  onClick,
}: DictationLessonCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-md transition-all duration-200 hover:-translate-y-1 bg-white border border-gray-200"
      onClick={() => onClick?.(lesson.id)}
    >
      <CardContent className="p-4 space-y-3">
        {/* Title + Subtitle */}
        <div>
          <h4
            className={`font-medium ${
              lesson.type === "Conversation"
                ? "text-blue-600"
                : "text-purple-600"
            } hover:underline transition-colors`}
          >
            {lesson.title}
          </h4>
          <p className="text-sm text-gray-600">{lesson.subtitle}</p>
        </div>

        {/* Info badges */}
        <div className="flex flex-wrap gap-2 text-xs">
          <Badge variant="outline" className="flex items-center gap-1">
            <BookOpenText className="w-3 h-3" />
            {lesson.parts} parts
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <Gem className="w-3 h-3" />
            {lesson.vocabLevel}
          </Badge>
          <Badge
            variant="secondary"
            className={`${
              lesson.type === "Conversation"
                ? "bg-blue-100 text-blue-700"
                : "bg-purple-100 text-purple-700"
            }`}
          >
            {lesson.type}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
