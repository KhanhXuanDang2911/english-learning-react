import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Search } from "lucide-react";
import DictationLessonCard from "@/components/DictationLessonCard";
import {
  mockPracticeTests,
  type DictationLesson,
  type PracticeTest,
} from "./dictationLessonsMockdata";

interface DictationLessonsProps {
  id: string;
}

// Mock function to simulate API call based on topic ID
const fetchTopicData = async (id: string) => {
  await new Promise((resolve) => setTimeout(resolve, 500));

  const topicDataMap: Record<
    string,
    { title: string; practiceTests: PracticeTest[] }
  > = {
    "toeic-listening": {
      title: "TOEIC Listening",
      practiceTests: mockPracticeTests,
    },
    "ielts-listening": {
      title: "IELTS Listening",
      practiceTests: [
        {
          id: "ielts-practice-1",
          title: "IELTS Practice Test 1",
          lessonCount: 15,
          lessons: [
            {
              id: "ielts-conv-1",
              title: "Conversation 1",
              subtitle: "University Accommodation Inquiry",
              parts: 10,
              vocabLevel: "B2",
              type: "Conversation" as const,
            },
            {
              id: "ielts-conv-2",
              title: "Conversation 2",
              subtitle: "Library Services Information",
              parts: 12,
              vocabLevel: "B1",
              type: "Conversation" as const,
            },
          ],
        },
        {
          id: "ielts-practice-2",
          title: "IELTS Practice Test 2",
          lessonCount: 15,
          lessons: [],
        },
      ],
    },
    conversations: {
      title: "Daily Conversations",
      practiceTests: [
        {
          id: "daily-conv-1",
          title: "Daily Conversations Set 1",
          lessonCount: 25,
          lessons: [
            {
              id: "daily-1",
              title: "Conversation 1",
              subtitle: "At the Coffee Shop",
              parts: 8,
              vocabLevel: "A2",
              type: "Conversation" as const,
            },
            {
              id: "daily-2",
              title: "Conversation 2",
              subtitle: "Making Appointments",
              parts: 6,
              vocabLevel: "A2",
              type: "Conversation" as const,
            },
          ],
        },
      ],
    },
  };

  return (
    topicDataMap[id] || {
      title: "Unknown Topic",
      practiceTests: [],
    }
  );
};

export default function DictationLessons({ id }: DictationLessonsProps) {
  const [topicData, setTopicData] = useState<{
    title: string;
    practiceTests: PracticeTest[];
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLevel, setSelectedLevel] = useState("All levels");

  useEffect(() => {
    const loadTopicData = async () => {
      setLoading(true);
      try {
        const data = await fetchTopicData(id);
        setTopicData(data);
      } catch (error) {
        console.error("Failed to load topic data:", error);
        setTopicData({ title: "Error Loading Topic", practiceTests: [] });
      } finally {
        setLoading(false);
      }
    };

    loadTopicData();
  }, [id]);

  const filterLessons = (lessons: DictationLesson[]) => {
    return lessons.filter((lesson) => {
      const matchesSearch =
        searchTerm === "" ||
        lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        lesson.subtitle.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesLevel =
        selectedLevel === "All levels" || lesson.vocabLevel === selectedLevel;

      return matchesSearch && matchesLevel;
    });
  };

  const handleLessonClick = (lessonId: string) => {
    console.log("Lesson clicked:", lessonId);
  };

  const handleSearch = () => {
    console.log("Search:", searchTerm, "Level:", selectedLevel);
  };

  if (loading) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-color mx-auto mb-4"></div>
            <p className="text-gray-600">Loading topic data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!topicData) {
    return (
      <div className="min-h-screen relative overflow-hidden">
        <div className="fixed inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
        </div>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <p className="text-gray-600 mb-4">Failed to load topic data</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50"></div>
      </div>

      {/* Header */}
      <div className="relative bg-gradient-to-r bg-primary-color text-white py-12">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative main-layout">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl md:text-4xl font-bold">
              {topicData.title}
            </h1>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white/95 backdrop-blur-sm text-gray-900 border-0 rounded-lg shadow-lg"
              />
            </div>

            <Select value={selectedLevel} onValueChange={setSelectedLevel}>
              <SelectTrigger className="w-full sm:w-40 bg-white/95 backdrop-blur-sm text-gray-900 border-0 rounded-lg shadow-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All levels">All levels</SelectItem>
                <SelectItem value="A1">A1</SelectItem>
                <SelectItem value="A2">A2</SelectItem>
                <SelectItem value="B1">B1</SelectItem>
                <SelectItem value="B2">B2</SelectItem>
                <SelectItem value="C1">C1</SelectItem>
                <SelectItem value="C2">C2</SelectItem>
              </SelectContent>
            </Select>

            <Button
              onClick={handleSearch}
              className="bg-white/20 hover:bg-white/30 text-white border border-white/30 hover:border-white/50"
            >
              OK
            </Button>
          </div>
        </div>
      </div>

      {/* Practice Tests */}
      <div className="relative main-layout py-8">
        <Accordion type="multiple" className="space-y-4">
          {topicData.practiceTests.map((practiceTest) => {
            const filteredLessons = filterLessons(practiceTest.lessons);
            return (
              <AccordionItem
                key={practiceTest.id}
                value={practiceTest.id}
                className="glass-effect border-white/20 shadow-lg rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-white/50 transition-colors">
                  <div className="flex items-center gap-2 text-left">
                    <span className="text-lg font-semibold text-gray-900">
                      {practiceTest.title}
                    </span>
                    <span className="text-sm text-gray-600 font-normal">
                      ({practiceTest.lessonCount} lessons)
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  {filteredLessons.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                      {filteredLessons.map((lesson) => (
                        <DictationLessonCard
                          key={lesson.id}
                          lesson={lesson}
                          onClick={handleLessonClick}
                        />
                      ))}
                    </div>
                  ) : practiceTest.lessons.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <p>No lessons available for this practice test yet.</p>
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <p>No lessons match your current filters.</p>
                    </div>
                  )}
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      </div>
    </div>
  );
}
