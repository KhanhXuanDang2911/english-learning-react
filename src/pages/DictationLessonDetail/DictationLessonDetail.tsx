import { Label } from "@/components/ui/label";

import type React from "react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ChevronLeft, ChevronRight } from "lucide-react";
import AudioPlayer, {
  type AudioPlayerRef,
} from "@/components/AudioPlayer/AudioPlayer";
import { cn } from "@/lib/utils";
import { useParams } from "react-router-dom";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for dictation lessons
export const mockDictationLessons = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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

const DictationLessonDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const lesson = mockDictationLessons.find((l) => l.id === Number(id));

  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [userInput, setUserInput] = useState("");
  const [showCorrectText, setShowCorrectText] = useState(false);
  const [isSentenceLooping, setIsSentenceLooping] = useState(false); // State for sentence looping
  const audioPlayerRef = useRef<AudioPlayerRef>(null);

  const currentSentence = lesson?.sentences[currentSentenceIndex];

  useEffect(() => {
    if (lesson && lesson.sentences.length > 0) {
      setCurrentSentenceIndex(0); // Reset to first sentence when lesson changes
      setUserInput("");
      setShowCorrectText(false);
      setIsSentenceLooping(false); // Reset looping state
      if (audioPlayerRef.current) {
        audioPlayerRef.current.seekTo(lesson.sentences[0].startTime);
        audioPlayerRef.current.pause();
      }
    }
  }, [lesson]);

  useEffect(() => {
    // When sentence changes, reset input and hide correct text
    setUserInput("");
    setShowCorrectText(false);
    setIsSentenceLooping(false); // Reset looping state on sentence change
    if (audioPlayerRef.current && currentSentence) {
      audioPlayerRef.current.seekTo(currentSentence.startTime);
      audioPlayerRef.current.pause();
    }
  }, [currentSentenceIndex, currentSentence]);

  if (!lesson) {
    return (
      <div className="container mx-auto px-4 py-8 md:py-12">
        <Alert variant="destructive">
          <AlertTitle>Lỗi!</AlertTitle>
          <AlertDescription>
            Không tìm thấy bài học chép chính tả này.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  const handleToggleSentenceLoop = () => {
    if (audioPlayerRef.current && currentSentence) {
      const newState = !isSentenceLooping;
      setIsSentenceLooping(newState);

      if (newState) {
        audioPlayerRef.current.seekTo(currentSentence.startTime);
        audioPlayerRef.current.play();
      } else {
        // If turning off loop, let it continue playing or pause based on user preference
        // For now, we'll just let it continue playing normally
      }
    }
  };

  const handleAudioTimeUpdate = (currentTime: number) => {
    if (isSentenceLooping && currentSentence && audioPlayerRef.current) {
      // Add a small buffer to endTime to ensure the audio doesn't cut off too early
      const buffer = 0.1;
      if (currentTime >= currentSentence.endTime - buffer) {
        audioPlayerRef.current.seekTo(currentSentence.startTime);
      }
    }
  };

  const handleNextSentence = () => {
    if (currentSentenceIndex < lesson.sentences.length - 1) {
      setCurrentSentenceIndex(currentSentenceIndex + 1);
    }
  };

  const handlePreviousSentence = () => {
    if (currentSentenceIndex > 0) {
      setCurrentSentenceIndex(currentSentenceIndex - 1);
    }
  };

  const handleCheck = () => {
    setShowCorrectText(true);
  };

  const highlightErrors = (correctText: string, userText: string) => {
    const correctWords = correctText.toLowerCase().split(/\s+/).filter(Boolean);
    const userWords = userText.toLowerCase().split(/\s+/).filter(Boolean);

    const result: React.ReactNode[] = [];
    let userWordPointer = 0;

    for (let i = 0; i < correctWords.length; i++) {
      const correctWord = correctWords[i];
      let isCorrect = false;
      let foundMatchIndex = -1;

      // Try to find the correct word in the user's input from the current pointer
      for (let j = userWordPointer; j < userWords.length; j++) {
        if (userWords[j] === correctWord) {
          foundMatchIndex = j;
          break;
        }
      }

      if (foundMatchIndex !== -1) {
        // If a match is found, mark words between current userWordPointer and foundMatchIndex as incorrect (skipped/extra words)
        for (let k = userWordPointer; k < foundMatchIndex; k++) {
          // This part is tricky: if user typed extra words, they are not part of correctWords.
          // For simplicity, we'll just mark the correct word as green if found,
          // and the user's extra words will implicitly not be highlighted by this function.
          // The primary goal here is to correctly highlight the *correctText* based on user input.
        }
        isCorrect = true;
        userWordPointer = foundMatchIndex + 1; // Advance pointer past the matched word
      } else {
        // No direct match found for the current correctWord, it's an error
        // We don't advance userWordPointer here, as the user might have skipped it
        // or typed something completely different.
      }

      result.push(
        <span
          key={i}
          className={cn(
            "mr-1",
            isCorrect ? "text-green-600" : "text-red-600 font-semibold"
          )}
        >
          {correctWord}
        </span>
      );
    }

    // This highlighting logic attempts to re-align words.
    // However, for complex cases like merged words (e.g., "jumps over" vs "jumpsover")
    // or significant omissions/insertions, it might not perfectly identify individual errors
    // without a more advanced diffing algorithm or fuzzy matching library.
    return <p className="text-sm">{result}</p>;
  };

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <h1 className="text-3xl font-bold mb-2">{lesson.title}</h1>
      <p className="text-muted-foreground mb-8">{lesson.description}</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Nội dung chính tả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full bg-gray-200 rounded-md overflow-hidden mb-4">
                <AudioPlayer
                  ref={audioPlayerRef}
                  src={lesson.mediaUrl}
                  onPlay={() => {}} // AudioPlayer manages its own play/pause state
                  onPause={() => {}}
                  onEnded={() => {}}
                  onTimeUpdate={handleAudioTimeUpdate} // Pass time updates to parent
                />
              </div>
              <div className="flex flex-wrap gap-2 justify-center mb-4"></div>
              <Separator className="my-4" />
              <div className="flex justify-between items-center mb-4">
                <Button
                  onClick={handlePreviousSentence}
                  disabled={currentSentenceIndex === 0}
                  variant="outline"
                >
                  <ChevronLeft className="h-4 w-4" /> Câu trước
                </Button>
                <span className="text-[14px] md:text-[16px] font-medium">
                  Câu {currentSentenceIndex + 1} / {lesson.sentences.length}
                </span>
                <Button
                  onClick={handleNextSentence}
                  disabled={
                    currentSentenceIndex === lesson.sentences.length - 1
                  }
                  variant="outline"
                >
                  Câu tiếp <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
              <div className="mb-4">
                <Label htmlFor="dictation-input" className="mb-2 block">
                  Nhập những gì bạn nghe được:
                </Label>
                <Textarea
                  id="dictation-input"
                  value={userInput}
                  onChange={(e) => setUserInput(e.target.value)}
                  placeholder="Bắt đầu gõ ở đây..."
                  rows={5}
                  className="w-full text-[14px] md:text-[16px]"
                />
              </div>
              <Button
                onClick={handleCheck}
                className="w-full mb-4 bg-[#155e94] hover:bg-[#155e94]/90 text-white"
              >
                Kiểm tra
              </Button>
              {showCorrectText && currentSentence && (
                <Card className="bg-gray-50 dark:bg-gray-800">
                  <CardContent className="p-4">
                    <h3 className="font-semibold mb-2">Kết quả:</h3>
                    <p className="text-sm text-muted-foreground mb-2">
                      <span className="text-green-600">Màu xanh: Đúng</span>,{" "}
                      <span className="text-red-600">Màu đỏ: Sai</span>
                    </p>
                    {highlightErrors(currentSentence.text, userInput)}
                  </CardContent>
                </Card>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Danh sách câu</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {lesson.sentences.map((sentence, index) => (
                  <li key={sentence.id}>
                    <Button
                      variant={
                        index === currentSentenceIndex ? "default" : "ghost"
                      }
                      className="w-full justify-start"
                      onClick={() => setCurrentSentenceIndex(index)}
                    >
                      Câu {index + 1}
                    </Button>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DictationLessonDetail;
