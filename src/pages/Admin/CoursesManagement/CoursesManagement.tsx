import { useState } from "react";
import { Link } from "react-router-dom";
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
  Eye,
  Edit,
  Trash2,
  Users,
  BookOpen,
} from "lucide-react";
import DynamicPagination from "@/components/DynamicPagination";

const mockCourses = [
  {
    id: 1,
    title: "Complete React Development",
    instructor: "John Doe",
    category: "Web Development",
    status: "Published",
    price: "$99.99",
    students: 1250,
    chapters: 12,
    lessons: 45,
    rating: 4.8,
    createdDate: "2024-01-15",
  },
  {
    id: 2,
    title: "Advanced JavaScript Concepts",
    instructor: "Jane Smith",
    category: "Programming",
    status: "Draft",
    price: "$79.99",
    students: 890,
    chapters: 8,
    lessons: 32,
    rating: 4.6,
    createdDate: "2024-01-10",
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    instructor: "Mike Johnson",
    category: "Design",
    status: "Published",
    price: "$129.99",
    students: 2100,
    chapters: 15,
    lessons: 67,
    rating: 4.9,
    createdDate: "2024-01-05",
  },
  {
    id: 4,
    title: "Node.js Backend Development",
    instructor: "Sarah Wilson",
    category: "Backend",
    status: "Review",
    price: "$89.99",
    students: 750,
    chapters: 10,
    lessons: 38,
    rating: 4.7,
    createdDate: "2024-01-01",
  },
];

export default function CoursesManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredCourses = mockCourses.filter(
    (course) =>
      course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedCourses = filteredCourses.slice(
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

  const handleDeleteCourse = (courseId: number) => {
    console.log("Deleting course:", courseId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Courses</h2>
          <p className="text-muted-foreground">
            Manage your online courses and lessons
          </p>
        </div>
        <Link to="/admin/courses/create">
          <Button className="bg-[#155e94] hover:bg-[#0b4674]">
            <Plus className="mr-2 h-4 w-4" />
            Create Course
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Courses</CardTitle>
          <CardDescription>
            A list of all courses including their status, enrollment, and
            performance metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search courses..."
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
                  <TableHead>Course</TableHead>
                  <TableHead>Instructor</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Students</TableHead>
                  <TableHead>Content</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedCourses.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell>
                      <div className="font-medium">{course.title}</div>
                    </TableCell>
                    <TableCell>{course.instructor}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{course.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(course.status)}</TableCell>
                    <TableCell className="font-medium">
                      {course.price}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                        {course.students.toLocaleString()}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <BookOpen className="mr-1 h-3 w-3 text-muted-foreground" />
                          {course.chapters} chapters
                        </div>
                        <div className="text-muted-foreground">
                          {course.lessons} lessons
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        ⭐ {course.rating}
                      </div>
                    </TableCell>
                    <TableCell>{course.createdDate}</TableCell>
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
                            View course
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/courses/edit/${course.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit course
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/courses/${course.id}/chapters`}>
                              <BookOpen className="mr-2 h-4 w-4" />
                              Manage chapters
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeleteCourse(course.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete course
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
    </div>
  );
}
