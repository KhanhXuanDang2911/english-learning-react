import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  Plus,
  Search,
  Filter,
  Edit,
  Trash2,
  Play,
  ArrowLeft,
  GripVertical,
  Clock,
  FileText,
} from "lucide-react";
import DynamicPagination from "@/components/DynamicPagination";

const mockLessons = [
  {
    id: 1,
    title: "What is React?",
    description: "Introduction to React library and its core concepts",
    type: "Video",
    order: 1,
    duration: "15:30",
    status: "Published",
    isFree: true,
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Setting up Development Environment",
    description: "How to set up your React development environment",
    type: "Video",
    order: 2,
    duration: "22:45",
    status: "Published",
    isFree: false,
    createdDate: "2024-01-16",
  },
  {
    id: 3,
    title: "Your First React Component",
    description: "Creating and understanding your first React component",
    type: "Video",
    order: 3,
    duration: "18:20",
    status: "Draft",
    isFree: false,
    createdDate: "2024-01-17",
  },
  {
    id: 4,
    title: "React Fundamentals Quiz",
    description: "Test your understanding of React basics",
    type: "Quiz",
    order: 4,
    duration: "10:00",
    status: "Published",
    isFree: false,
    createdDate: "2024-01-18",
  },
  {
    id: 5,
    title: "Component Props Exercise",
    description: "Hands-on exercise with React component props",
    type: "Exercise",
    order: 5,
    duration: "25:00",
    status: "Published",
    isFree: false,
    createdDate: "2024-01-19",
  },
];

interface LessonFormData {
  title: string;
  description: string;
  type: string;
  order: number;
  duration: string;
  isFree: boolean;
}

export default function LessonsManagement() {
  const { chapterId } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [formData, setFormData] = useState<LessonFormData>({
    title: "",
    description: "",
    type: "Video",
    order: mockLessons.length + 1,
    duration: "",
    isFree: false,
  });
  const itemsPerPage = 10;

  const filteredLessons = mockLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const getStatusBadge = (status: string) => {
    const colors = {
      Published: "bg-green-100 text-green-800",
      Draft: "bg-yellow-100 text-yellow-800",
      Review: "bg-blue-100 text-blue-800",
    };
    return (
      <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
    );
  };

  const getTypeBadge = (type: string) => {
    const colors = {
      Video: "bg-blue-100 text-blue-800",
      Quiz: "bg-purple-100 text-purple-800",
      Exercise: "bg-orange-100 text-orange-800",
      Reading: "bg-gray-100 text-gray-800",
    };
    return (
      <Badge className={colors[type as keyof typeof colors]}>{type}</Badge>
    );
  };

  const handleCreateLesson = () => {
    console.log("Creating lesson:", formData);
    setIsCreateOpen(false);
    setFormData({
      title: "",
      description: "",
      type: "Video",
      order: mockLessons.length + 1,
      duration: "",
      isFree: false,
    });
  };

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      type: lesson.type,
      order: lesson.order,
      duration: lesson.duration,
      isFree: lesson.isFree,
    });
    setIsEditOpen(true);
  };

  const handleUpdateLesson = () => {
    console.log("Updating lesson:", selectedLesson.id, formData);
    setIsEditOpen(false);
    setSelectedLesson(null);
    setFormData({
      title: "",
      description: "",
      type: "Video",
      order: mockLessons.length + 1,
      duration: "",
      isFree: false,
    });
  };

  const handleDeleteLesson = (lessonId: number) => {
    console.log("Deleting lesson:", lessonId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to={`/admin/courses/1/chapters`}>
            <Button variant="ghost" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Chapters
            </Button>
          </Link>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Chapter Lessons
            </h2>
            <p className="text-muted-foreground">
              Manage lessons for Chapter ID: {chapterId}
            </p>
          </div>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#155e94] hover:bg-[#0b4674]">
              <Plus className="mr-2 h-4 w-4" />
              Add Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create New Lesson</DialogTitle>
              <DialogDescription>
                Add a new lesson to this chapter.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
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
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="col-span-3"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="type" className="text-right">
                  Type
                </Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Video">Video</SelectItem>
                    <SelectItem value="Quiz">Quiz</SelectItem>
                    <SelectItem value="Exercise">Exercise</SelectItem>
                    <SelectItem value="Reading">Reading</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="duration" className="text-right">
                  Duration
                </Label>
                <Input
                  id="duration"
                  placeholder="15:30"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: e.target.value })
                  }
                  className="col-span-3"
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
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      order: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={handleCreateLesson}
                className="bg-[#155e94] hover:bg-[#0b4674]"
              >
                Create Lesson
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Lessons</CardTitle>
          <CardDescription>
            A list of all lessons in this chapter with their type and status.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search lessons..."
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
                  <TableHead>Lesson</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Access</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>
                      <GripVertical className="h-4 w-4 text-muted-foreground cursor-move" />
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">#{lesson.order}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {lesson.type === "Video" && (
                          <Play className="h-5 w-5 text-muted-foreground" />
                        )}
                        {lesson.type === "Reading" && (
                          <FileText className="h-5 w-5 text-muted-foreground" />
                        )}
                        {lesson.type === "Quiz" && (
                          <div className="h-5 w-5 rounded-full bg-purple-100 flex items-center justify-center text-xs font-bold text-purple-800">
                            ?
                          </div>
                        )}
                        {lesson.type === "Exercise" && (
                          <div className="h-5 w-5 rounded-full bg-orange-100 flex items-center justify-center text-xs font-bold text-orange-800">
                            E
                          </div>
                        )}
                        <div>
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-muted-foreground">
                            {lesson.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getTypeBadge(lesson.type)}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        {lesson.duration}
                      </div>
                    </TableCell>
                    <TableCell>
                      {lesson.isFree ? (
                        <Badge className="bg-green-100 text-green-800">
                          Free
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Premium</Badge>
                      )}
                    </TableCell>
                    <TableCell>{getStatusBadge(lesson.status)}</TableCell>
                    <TableCell>{lesson.createdDate}</TableCell>
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
                            <Play className="mr-2 h-4 w-4" />
                            Preview lesson
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleEditLesson(lesson)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit lesson
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteLesson(lesson.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete lesson
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
              <DynamicPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </CardContent>
      </Card>

      {/* Edit Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Lesson</DialogTitle>
            <DialogDescription>
              Make changes to the lesson here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-title" className="text-right">
                Title
              </Label>
              <Input
                id="edit-title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
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
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="col-span-3"
                rows={3}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-type" className="text-right">
                Type
              </Label>
              <Select
                value={formData.type}
                onValueChange={(value) =>
                  setFormData({ ...formData, type: value })
                }
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Quiz">Quiz</SelectItem>
                  <SelectItem value="Exercise">Exercise</SelectItem>
                  <SelectItem value="Reading">Reading</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="edit-duration" className="text-right">
                Duration
              </Label>
              <Input
                id="edit-duration"
                placeholder="15:30"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({ ...formData, duration: e.target.value })
                }
                className="col-span-3"
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
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    order: Number.parseInt(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={handleUpdateLesson}
              className="bg-[#155e94] hover:bg-[#0b4674]"
            >
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
