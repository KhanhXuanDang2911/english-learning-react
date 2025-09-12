import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Play } from "lucide-react";
import type { DictationTopic } from "@/pages/DictationTopics/dictationMockdata";

interface TopicDictationCardProps {
  topic: DictationTopic;
}

export default function TopicDictationCard({ topic }: TopicDictationCardProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy":
        return "bg-green-500 text-white";
      case "Medium":
        return "bg-yellow-500 text-white";
      case "Hard":
        return "bg-red-500 text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <Card className="group relative cursor-pointer border border-gray-300 rounded-lg hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      {/* Thumbnail */}
      <div className="relative w-full h-40 overflow-hidden">
        <img
          src={topic.thumbnail}
          alt={`${topic.title} - Dan Wayman on Unsplash`}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-2">
          <Badge
            className={`${getDifficultyColor(
              topic.difficulty
            )} px-2 py-0.5 text-[11px] font-medium shadow-sm`}
          >
            {topic.difficulty}
          </Badge>
        </div>

        {/* Level badge */}
        <div className="absolute top-2 right-2">
          <Badge className="bg-white/90 text-gray-800 px-2 py-0.5 text-[11px] font-medium shadow-sm">
            {topic.levelRange}
          </Badge>
        </div>
      </div>

      <CardContent className="p-3 space-y-2">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 group-hover:text-primary-color transition-colors line-clamp-2 leading-snug">
          {topic.title}
        </h3>

        {/* Lesson Count */}
        <div className="flex items-center gap-1.5 text-sm text-gray-600">
          <BookOpen className="w-4 h-4 text-primary-color" />
          <span className="font-medium">{topic.lessonCount} bài học</span>
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 leading-snug">
          {topic.description}
        </p>

        {/* Hover effect overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-color/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
      </CardContent>
    </Card>
  );
}
