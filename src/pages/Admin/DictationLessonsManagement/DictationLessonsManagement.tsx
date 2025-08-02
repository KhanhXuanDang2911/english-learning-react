import { useState } from "react";
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
  Headphones,
  Play,
  Upload,
} from "lucide-react";
import DynamicPagination from "@/components/DynamicPagination";

const mockDictationLessons = [
  {
    id: 1,
    title: "Basic English Conversation",
    description: "Practice listening and writing basic English phrases",
    level: "Beginner",
    category: "Conversation",
    audioFile: "basic-conversation.mp3",
    transcript:
      "Hello, how are you today? I am fine, thank you. What about you?",
    duration: "2:30",
    status: "Published",
    createdBy: "John Doe",
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Business Meeting Vocabulary",
    description: "Learn common phrases used in business meetings",
    level: "Intermediate",
    category: "Business",
    audioFile: "business-meeting.mp3",
    transcript:
      "Let's schedule a meeting for next week. I'll send you the agenda tomorrow.",
    duration: "3:45",
    status: "Published",
    createdBy: "Jane Smith",
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    title: "Academic Lecture Extract",
    description: "Practice with university-level academic content",
    level: "Advanced",
    category: "Academic",
    audioFile: "academic-lecture.mp3",
    transcript:
      "The research methodology employed in this study follows a quantitative approach...",
    duration: "5:20",
    status: "Draft",
    createdBy: "Mike Johnson",
    createdDate: "2024-01-05",
  },
  {
    id: 4,
    title: "Daily News Report",
    description: "Current events and news vocabulary practice",
    level: "Intermediate",
    category: "News",
    audioFile: "news-report.mp3",
    transcript:
      "Today's top story covers the latest developments in renewable energy technology...",
    duration: "4:15",
    status: "Published",
    createdBy: "Sarah Wilson",
    createdDate: "2024-01-01",
  },
];

interface DictationLessonFormData {
  title: string;
  description: string;
  level: string;
  category: string;
  transcript: string;
  audioFile: string;
}

export default function DictationLessonsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<any>(null);
  const [formData, setFormData] = useState<DictationLessonFormData>({
    title: "",
    description: "",
    level: "Beginner",
    category: "",
    transcript: "",
    audioFile: "",
  });
  const itemsPerPage = 10;

  const filteredLessons = mockDictationLessons.filter(
    (lesson) =>
      lesson.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lesson.category.toLowerCase().includes(searchTerm.toLowerCase())
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

  const getLevelBadge = (level: string) => {
    const colors = {
      Beginner: "bg-green-100 text-green-800",
      Intermediate: "bg-yellow-100 text-yellow-800",
      Advanced: "bg-red-100 text-red-800",
    };
    return (
      <Badge className={colors[level as keyof typeof colors]}>{level}</Badge>
    );
  };

  const handleCreateLesson = () => {
    console.log("Creating dictation lesson:", formData);
    setIsCreateOpen(false);
    setFormData({
      title: "",
      description: "",
      level: "Beginner",
      category: "",
      transcript: "",
      audioFile: "",
    });
  };

  const handleEditLesson = (lesson: any) => {
    setSelectedLesson(lesson);
    setFormData({
      title: lesson.title,
      description: lesson.description,
      level: lesson.level,
      category: lesson.category,
      transcript: lesson.transcript,
      audioFile: lesson.audioFile,
    });
    setIsEditOpen(true);
  };

  const handleUpdateLesson = () => {
    console.log("Updating dictation lesson:", selectedLesson.id, formData);
    setIsEditOpen(false);
    setSelectedLesson(null);
    setFormData({
      title: "",
      description: "",
      level: "Beginner",
      category: "",
      transcript: "",
      audioFile: "",
    });
  };

  const handleDeleteLesson = (lessonId: number) => {
    console.log("Deleting dictation lesson:", lessonId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">
            Dictation Lessons
          </h2>
          <p className="text-muted-foreground">
            Manage your audio dictation exercises
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-[#155e94] hover:bg-[#0b4674]">
              <Plus className="mr-2 h-4 w-4" />
              Add Dictation Lesson
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create New Dictation Lesson</DialogTitle>
              <DialogDescription>
                Add a new dictation lesson with audio and transcript.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Enter lesson title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the lesson content..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="level">Level</Label>
                  <Select
                    value={formData.level}
                    onValueChange={(value) =>
                      setFormData({ ...formData, level: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    placeholder="e.g., Business, Academic"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Audio File</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <Upload className="mx-auto h-8 w-8 text-gray-400" />
                  <div className="mt-2">
                    <Button variant="outline" size="sm">
                      Upload Audio
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    MP3, WAV up to 10MB
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="transcript">Transcript</Label>
                <Textarea
                  id="transcript"
                  placeholder="Enter the complete transcript of the audio..."
                  value={formData.transcript}
                  onChange={(e) =>
                    setFormData({ ...formData, transcript: e.target.value })
                  }
                  rows={6}
                />
                <p className="text-sm text-muted-foreground">
                  This will be used to check student answers
                </p>
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
          <CardTitle>All Dictation Lessons</CardTitle>
          <CardDescription>
            A list of all dictation lessons with their levels and categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search dictation lessons..."
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
                  <TableHead>Lesson</TableHead>
                  <TableHead>Level</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedLessons.map((lesson) => (
                  <TableRow key={lesson.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Headphones className="h-5 w-5 text-muted-foreground" />
                        <div className="max-w-[250px]">
                          <div className="font-medium">{lesson.title}</div>
                          <div className="text-sm text-muted-foreground truncate">
                            {lesson.description}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getLevelBadge(lesson.level)}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{lesson.category}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Play className="mr-1 h-4 w-4 text-muted-foreground" />
                        {lesson.duration}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(lesson.status)}</TableCell>
                    <TableCell>{lesson.createdBy}</TableCell>
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

      {/* Edit Dictation Lesson Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Dictation Lesson</DialogTitle>
            <DialogDescription>
              Make changes to the dictation lesson here. Click save when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                placeholder="Enter lesson title..."
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-description">Description</Label>
              <Textarea
                id="edit-description"
                placeholder="Describe the lesson content..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-level">Level</Label>
                <Select
                  value={formData.level}
                  onValueChange={(value) =>
                    setFormData({ ...formData, level: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-category">Category</Label>
                <Input
                  id="edit-category"
                  placeholder="e.g., Business, Academic"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Audio File</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                <Upload className="mx-auto h-8 w-8 text-gray-400" />
                <div className="mt-2">
                  <Button variant="outline" size="sm">
                    Replace Audio
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Current: {selectedLesson?.audioFile}
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-transcript">Transcript</Label>
              <Textarea
                id="edit-transcript"
                placeholder="Enter the complete transcript of the audio..."
                value={formData.transcript}
                onChange={(e) =>
                  setFormData({ ...formData, transcript: e.target.value })
                }
                rows={6}
              />
              <p className="text-sm text-muted-foreground">
                This will be used to check student answers
              </p>
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
