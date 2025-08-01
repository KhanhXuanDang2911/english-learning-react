"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  ArrowLeft,
  Edit,
  BookOpen,
  Users,
  Star,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Volume2,
  Share2,
  Heart,
} from "lucide-react"
import routes from "@/routes/routes.const"

interface FlashcardSet {
  id: string
  title: string
  description: string
  category: string
  cardCount: number
  studyCount: number
  rating: number
  ratingCount: number
  author: string
  authorAvatar: string
  createdAt: string
  isPublic: boolean
  thumbnail: string
  cards: { term: string; definition: string }[]
}

const mockFlashcardSets: FlashcardSet[] = [
  {
    id: "1",
    title: "1000 từ vựng tiếng Anh cơ bản",
    description: "Bộ từ vựng cơ bản nhất cho người mới bắt đầu học tiếng Anh, bao gồm các từ thường dùng hàng ngày.",
    category: "Từ vựng cơ bản",
    cardCount: 1000,
    studyCount: 15420,
    rating: 4.8,
    ratingCount: 2341,
    author: "Nguyễn Văn A",
    authorAvatar: "https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-15",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    cards: [
      { term: "Hello", definition: "Xin chào" },
      { term: "Goodbye", definition: "Tạm biệt" },
      { term: "Thank you", definition: "Cảm ơn" },
      { term: "Please", definition: "Làm ơn" },
      { term: "Excuse me", definition: "Xin lỗi / Làm phiền" },
      { term: "Yes", definition: "Vâng / Có" },
      { term: "No", definition: "Không" },
      { term: "Water", definition: "Nước" },
      { term: "Food", definition: "Thức ăn" },
      { term: "House", definition: "Ngôi nhà" },
    ],
  },
  {
    id: "2",
    title: "Từ vựng TOEIC Part 1-7",
    description: "Tổng hợp từ vựng quan trọng cho tất cả các phần trong bài thi TOEIC, giúp bạn đạt điểm cao.",
    category: "TOEIC",
    cardCount: 800,
    studyCount: 8932,
    rating: 4.9,
    ratingCount: 1876,
    author: "Trần Thị B",
    authorAvatar: "https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=600",
    createdAt: "2025-01-10",
    isPublic: true,
    thumbnail:
      "https://dinoenglish.app/_next/image?url=%2Fassets%2Fblog%2Ftu-tin-giao-tiep-tieng-anh-voi-3000-tu-vung-thong-dung-nhat.png&w=1920&q=75",
    cards: [
      { term: "Invoice", definition: "Hóa đơn" },
      { term: "Negotiate", definition: "Đàm phán" },
      { term: "Shipment", definition: "Lô hàng" },
      { term: "Contract", definition: "Hợp đồng" },
      { term: "Meeting", definition: "Cuộc họp" },
    ],
  },
]

export default function FlashcardDetail() {
  const { id } = useParams<{ id: string }>()
  const [flashcardSet, setFlashcardSet] = useState<FlashcardSet | null>(null)
  const [currentCardIndex, setCurrentCardIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  useEffect(() => {
    // In a real application, you would fetch data based on `id`
    const foundSet = mockFlashcardSets.find((set) => set.id === id)
    setFlashcardSet(foundSet || null)
  }, [id])

  if (!flashcardSet) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-gray-600">Đang tải hoặc không tìm thấy bộ flashcard...</p>
      </div>
    )
  }

  const currentCard = flashcardSet.cards[currentCardIndex]
  const progress = ((currentCardIndex + 1) / flashcardSet.cards.length) * 100

  const handleNextCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev + 1) % flashcardSet.cards.length)
  }

  const handlePrevCard = () => {
    setIsFlipped(false)
    setCurrentCardIndex((prev) => (prev - 1 + flashcardSet.cards.length) % flashcardSet.cards.length)
  }

  const handleFlipCard = () => {
    setIsFlipped((prev) => !prev)
  }

  const handleSpeak = (text: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.lang = "en-US" // Or appropriate language for definition
      window.speechSynthesis.speak(utterance)
    } else {
      alert("Trình duyệt của bạn không hỗ trợ tính năng đọc văn bản.")
    }
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < Math.floor(rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
      />
    ))
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="main-layout py-8">
        {/* Back Button and Title */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" className="bg-transparent" asChild>
            <Link to={routes.FLASHCARDS}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại danh sách
            </Link>
          </Button>
          <Button variant="outline" className="bg-transparent" asChild>
            <Link to={routes.EDIT_FLASHCARD.replace(":id", flashcardSet.id)}>
              <Edit className="h-4 w-4 mr-2" />
              Chỉnh sửa bộ thẻ
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - Flashcard Viewer */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="relative bg-white shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="p-4 border-b">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold">{flashcardSet.title}</h2>
                  <Badge className="bg-primary-color text-white">{flashcardSet.category}</Badge>
                </div>
                <p className="text-sm text-gray-600">{flashcardSet.description}</p>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex flex-col items-center justify-center min-h-[300px] md:min-h-[400px] relative">
                  <div
                    className={`flashcard-card w-full max-w-md h-64 md:h-80 bg-gray-100 rounded-lg shadow-md flex items-center justify-center text-center p-6 cursor-pointer transition-transform duration-500 ease-in-out transform-gpu ${
                      isFlipped ? "rotate-y-180" : ""
                    }`}
                    onClick={handleFlipCard}
                  >
                    <div className="flashcard-front absolute w-full h-full flex items-center justify-center backface-hidden">
                      <span className="text-2xl md:text-3xl font-bold text-gray-800">{currentCard.term}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-gray-600 hover:text-primary-color"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSpeak(currentCard.term)
                        }}
                      >
                        <Volume2 className="h-5 w-5" />
                        <span className="sr-only">Đọc thuật ngữ</span>
                      </Button>
                    </div>
                    <div className="flashcard-back absolute w-full h-full flex items-center justify-center backface-hidden rotate-y-180">
                      <span className="text-xl md:text-2xl text-gray-700">{currentCard.definition}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-4 right-4 text-gray-600 hover:text-primary-color"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleSpeak(currentCard.definition)
                        }}
                      >
                        <Volume2 className="h-5 w-5" />
                        <span className="sr-only">Đọc định nghĩa</span>
                      </Button>
                    </div>
                  </div>

                  {/* Navigation Controls */}
                  <div className="flex items-center gap-4 mt-6">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handlePrevCard}
                      className="rounded-full bg-transparent"
                    >
                      <ChevronLeft className="h-5 w-5" />
                      <span className="sr-only">Thẻ trước</span>
                    </Button>
                    <span className="text-lg font-semibold">
                      {currentCardIndex + 1} / {flashcardSet.cards.length}
                    </span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={handleNextCard}
                      className="rounded-full bg-transparent"
                    >
                      <ChevronRight className="h-5 w-5" />
                      <span className="sr-only">Thẻ tiếp theo</span>
                    </Button>
                  </div>
                  <Button variant="ghost" onClick={handleFlipCard} className="mt-4 text-primary-color">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Lật thẻ
                  </Button>
                </div>
              </CardContent>
              <div className="p-4 border-t">
                <Progress value={progress} className="w-full h-2" />
                <p className="text-sm text-gray-600 text-center mt-2">
                  Hoàn thành: {currentCardIndex + 1} / {flashcardSet.cards.length} thẻ
                </p>
              </div>
            </Card>

            {/* About this set */}
            <Card>
              <CardHeader>
                <CardTitle>Thông tin về bộ thẻ này</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-700">{flashcardSet.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-gray-600" />
                    <span>Số lượng thẻ: {flashcardSet.cardCount}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-600" />
                    <span>Số lượt học: {flashcardSet.studyCount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>
                      Đánh giá: {flashcardSet.rating} ({flashcardSet.ratingCount.toLocaleString()})
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <img
                      src={flashcardSet.authorAvatar || "/placeholder.svg"}
                      alt={flashcardSet.author}
                      className="w-5 h-5 rounded-full object-cover"
                    />
                    <span>Tác giả: {flashcardSet.author}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar - Actions */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Hành động</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full bg-primary-color hover:bg-hover-primary-color" size="lg">
                    Bắt đầu học
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Kiểm tra
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Ghép thẻ
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" size="lg">
                    Học viết
                  </Button>
                  <div className="flex justify-center gap-4 mt-4">
                    <Button variant="ghost" size="sm" onClick={() => setIsWishlisted(!isWishlisted)}>
                      <Heart className={`h-4 w-4 mr-2 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      Yêu thích
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-4 w-4 mr-2" />
                      Chia sẻ
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* All Cards List */}
              <Card>
                <CardHeader>
                  <CardTitle>Tất cả thẻ ({flashcardSet.cards.length})</CardTitle>
                </CardHeader>
                <CardContent className="max-h-96 overflow-y-auto space-y-2">
                  {flashcardSet.cards.map((card, index) => (
                    <div
                      key={index}
                      className={`p-3 border rounded-md cursor-pointer hover:bg-gray-100 transition-colors ${
                        index === currentCardIndex ? "bg-primary-color text-white hover:bg-primary-dark" : ""
                      }`}
                      onClick={() => {
                        setCurrentCardIndex(index)
                        setIsFlipped(false)
                      }}
                    >
                      <p className="font-medium text-sm line-clamp-1">{card.term}</p>
                      <p className={`text-xs ${index === currentCardIndex ? "text-gray-200" : "text-gray-500"}`}>
                        {card.definition}
                      </p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
