import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreHorizontal, Plus, Search, Filter, Edit, Trash2, Zap, Eye } from "lucide-react"
import DynamicPagination from "@/components/DynamicPagination"

const mockFlashcards = [
  {
    id: 1,
    front: "What is React?",
    back: "A JavaScript library for building user interfaces",
    category: "React Basics",
    difficulty: "Beginner",
    tags: "react, javascript, frontend",
    status: "Published",
    createdBy: "John Doe",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    front: "What is JSX?",
    back: "A syntax extension for JavaScript that allows you to write HTML-like code in React",
    category: "React Basics",
    difficulty: "Beginner",
    tags: "jsx, react, syntax",
    status: "Published",
    createdBy: "Jane Smith",
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    front: "What are React Hooks?",
    back: "Functions that let you use state and other React features in functional components",
    category: "Advanced React",
    difficulty: "Intermediate",
    tags: "hooks, react, state",
    status: "Draft",
    createdBy: "Mike Johnson",
    createdDate: "2024-01-05",
  },
  {
    id: 4,
    front: "What is the Virtual DOM?",
    back: "A programming concept where a virtual representation of the UI is kept in memory and synced with the real DOM",
    category: "React Concepts",
    difficulty: "Intermediate",
    tags: "virtual-dom, react, performance",
    status: "Published",
    createdBy: "Sarah Wilson",
    createdDate: "2024-01-01",
  },
]

interface FlashcardFormData {
  front: string
  back: string
  category: string
  difficulty: string
  tags: string
}

export function FlashcardsManagement() {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedFlashcard, setSelectedFlashcard] = useState<any>(null)
  const [formData, setFormData] = useState<FlashcardFormData>({
    front: "",
    back: "",
    category: "",
    difficulty: "Beginner",
    tags: "",
  })
  const itemsPerPage = 10

  const filteredFlashcards = mockFlashcards.filter(
    (flashcard) =>
      flashcard.front.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flashcard.back.toLowerCase().includes(searchTerm.toLowerCase()) ||
      flashcard.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredFlashcards.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedFlashcards = filteredFlashcards.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const colors = {
      Published: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Review: "bg-blue-100 text-blue-800",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getDifficultyBadge = (difficulty: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    }
    return <Badge className={colors[difficulty as keyof typeof colors]}>{difficulty}</Badge>
  }

  const handleCreateFlashcard = () => {
    console.log("Creating flashcard:", formData)
    setIsCreateOpen(false)
    setFormData({ front: "", back: "", category: "", difficulty: "Beginner", tags: "" })
  }

  const handleEditFlashcard = (flashcard: any) => {
    setSelectedFlashcard(flashcard)
    setFormData({
      front: flashcard.front,
      back: flashcard.back,
      category: flashcard.category,
      difficulty: flashcard.difficulty,
      tags: flashcard.tags,
    })
    setIsEditOpen(true)
  }

  const handleUpdateFlashcard = () => {
    console.log("Updating flashcard:", selectedFlashcard.id, formData)
    setIsEditOpen(false)
    setSelectedFlashcard(null)
    setFormData({ front: "", back: "", category: "", difficulty: "Beginner", tags: "" })
  }

  const handleDeleteFlashcard = (flashcardId: number) => {
    console.log("Deleting flashcard:", flashcardId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Flashcards</h2>
          <p className="text-muted-foreground">Manage your learning flashcards</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#155e94] hover:bg-[#0b4674]">
              <Plus className="mr-2 h-4 w-4" />
              Add Flashcard
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Create New Flashcard</DialogTitle>
              <DialogDescription>Add a new flashcard to help students learn.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="front">Front (Question)</Label>
                <Textarea
                  id="front"
                  placeholder="Enter the question or term..."
                  value={formData.front}
                  onChange={(e) => setFormData({ ...formData, front: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="back">Back (Answer)</Label>
                <Textarea
                  id="back"
                  placeholder="Enter the answer or definition..."
                  value={formData.back}
                  onChange={(e) => setFormData({ ...formData, back: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., React Basics"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="difficulty">Difficulty</Label>
                  <Select
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags</Label>
                <Input
                  id="tags"
                  placeholder="react, javascript, frontend"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                />
                <p className="text-sm text-muted-foreground">Separate tags with commas</p>
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateFlashcard} className="bg-[#155e94] hover:bg-[#0b4674]">
                Create Flashcard
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Flashcards</CardTitle>
          <CardDescription>A list of all flashcards with their categories and difficulty levels.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search flashcards..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Question</TableHead>
                  <TableHead>Answer</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Difficulty</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedFlashcards.map((flashcard) => (
                  <TableRow key={flashcard.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Zap className="h-5 w-5 text-muted-foreground" />
                        <div className="max-w-[200px]">
                          <div className="font-medium truncate">{flashcard.front}</div>
                          <div className="text-sm text-muted-foreground">Tags: {flashcard.tags}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="max-w-[200px] truncate">{flashcard.back}</div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{flashcard.category}</Badge>
                    </TableCell>
                    <TableCell>{getDifficultyBadge(flashcard.difficulty)}</TableCell>
                    <TableCell>{getStatusBadge(flashcard.status)}</TableCell>
                    <TableCell>{flashcard.createdBy}</TableCell>
                    <TableCell>{flashcard.createdDate}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            Preview flashcard
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditFlashcard(flashcard)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit flashcard
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteFlashcard(flashcard.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete flashcard
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {totalPages > 1 && (
            <div className="mt-4">
              <DynamicPagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Flashcard Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Flashcard</DialogTitle>
            <DialogDescription>Make changes to the flashcard here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="edit-front">Front (Question)</Label>
              <Textarea
                id="edit-front"
                placeholder="Enter the question or term..."
                value={formData.front}
                onChange={(e) => setFormData({ ...formData, front: e.target.value })}
                rows={3}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-back">Back (Answer)</Label>
              <Textarea
                id="edit-back"
                placeholder="Enter the answer or definition..."
                value={formData.back}
                onChange={(e) => setFormData({ ...formData, back: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  placeholder="e.g., React Basics"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-difficulty">Difficulty</Label>
                <Select
                  value={formData.difficulty}
                  onValueChange={(value) => setFormData({ ...formData, difficulty: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-tags">Tags</Label>
              <Input
                id="edit-tags"
                placeholder="react, javascript, frontend"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
              <p className="text-sm text-muted-foreground">Separate tags with commas</p>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateFlashcard} className="bg-[#155e94] hover:bg-[#0b4674]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
