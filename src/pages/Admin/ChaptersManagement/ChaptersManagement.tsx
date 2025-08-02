import { useState } from "react"
import { Link, useParams } from "react-router-dom"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  BookOpen,
  Play,
  ArrowLeft,
  GripVertical,
} from "lucide-react"
import DynamicPagination from "@/components/DynamicPagination" 

const mockChapters = [
  {
    id: 1,
    title: "Introduction to React",
    description: "Learn the basics of React framework",
    order: 1,
    lessonCount: 5,
    duration: "2h 30m",
    status: "Published",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Components and Props",
    description: "Understanding React components and props",
    order: 2,
    lessonCount: 8,
    duration: "3h 45m",
    status: "Published",
    createdDate: "2024-01-16",
  },
  {
    id: 3,
    title: "State and Lifecycle",
    description: "Managing component state and lifecycle methods",
    order: 3,
    lessonCount: 6,
    duration: "2h 15m",
    status: "Draft",
    createdDate: "2024-01-17",
  },
  {
    id: 4,
    title: "Hooks and Context",
    description: "Modern React with hooks and context API",
    order: 4,
    lessonCount: 10,
    duration: "4h 20m",
    status: "Published",
    createdDate: "2024-01-18",
  },
]

interface ChapterFormData {
  title: string
  description: string
  order: number
}

export default function ChaptersManagement() {
  const { courseId } = useParams()
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [selectedChapter, setSelectedChapter] = useState<any>(null)
  const [formData, setFormData] = useState<ChapterFormData>({
    title: "",
    description: "",
    order: mockChapters.length + 1,
  })
  const itemsPerPage = 10

  const filteredChapters = mockChapters.filter(
    (chapter) =>
      chapter.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chapter.description.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const totalPages = Math.ceil(filteredChapters.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedChapters = filteredChapters.slice(startIndex, startIndex + itemsPerPage)

  const getStatusBadge = (status: string) => {
    const colors = {
      Published: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Review: "bg-blue-100 text-blue-800",
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const handleCreateChapter = () => {
    console.log("Creating chapter:", formData)
    setIsCreateOpen(false)
    setFormData({ title: "", description: "", order: mockChapters.length + 1 })
  }

  const handleEditChapter = (chapter: any) => {
    setSelectedChapter(chapter)
    setFormData({
      title: chapter.title,
      description: chapter.description,
      order: chapter.order,
    })
    setIsEditOpen(true)
  }

  const handleUpdateChapter = () => {
    console.log("Updating chapter:", selectedChapter.id, formData)
    setIsEditOpen(false)
    setSelectedChapter(null)
    setFormData({ title: "", description: "", order: mockChapters.length + 1 })
  }

  const handleDeleteChapter = (chapterId: number) => {
    console.log("Deleting chapter:", chapterId)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/admin/courses">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Courses
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Course Chapters</h2>
            <p className="text-muted-foreground">Manage chapters for Course ID: {courseId}</p>
          </div>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#155e94] hover:bg-[#0b4674]">
              <Plus className="mr-2 h-4 w-4" />
              Add Chapter
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Chapter</DialogTitle>
              <DialogDescription>Add a new chapter to organize your course lessons.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="description" className="text-right">
                  Description
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="order" className="text-right">
                  Order
                </Label>
                <Input
                  id="order"
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={handleCreateChapter} className="bg-[#155e94] hover:bg-[#0b4674]">
                Create Chapter
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Chapters</CardTitle>
          <CardDescription>A list of all chapters in this course with their lessons and status.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search chapters..."
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
                  <TableHead className="w-12"></TableHead>
                  <TableHead>Order</TableHead>
                  <TableHead>Chapter</TableHead>
                  <TableHead>Lessons</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedChapters.map((chapter) => (
                  <TableRow key={chapter.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">#{chapter.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <div className="font-medium">{chapter.title}</div>
                          <div className="text-sm text-muted-foreground">{chapter.description}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Play className="mr-1 h-4 w-4 text-muted-foreground" />
                        {chapter.lessonCount} lessons
                      </div>
                    </TableCell>
                    <TableCell>{chapter.duration}</TableCell>
                    <TableCell>{getStatusBadge(chapter.status)}</TableCell>
                    <TableCell>{chapter.createdDate}</TableCell>
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
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/chapters/${chapter.id}/lessons`}>
                              <Play className="mr-2 h-4 w-4" />
                              Manage lessons
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditChapter(chapter)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit chapter
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600" onClick={() => handleDeleteChapter(chapter.id)}>
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete chapter
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

      {/* Edit Chapter Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Chapter</DialogTitle>
            <DialogDescription>Make changes to the chapter here. Click save when you're done.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-description" className="text-right">
                Description
              </Label>
              <Textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-order" className="text-right">
                Order
              </Label>
              <Input
                id="edit-order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: Number.parseInt(e.target.value) })}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleUpdateChapter} className="bg-[#155e94] hover:bg-[#0b4674]">
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
