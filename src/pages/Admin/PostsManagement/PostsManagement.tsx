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
} from "lucide-react";
import DynamicPagination from "@/components/DynamicPagination";
const mockPosts = [
  {
    id: 1,
    title: "10 Tips for Learning English Grammar",
    author: "John Doe",
    category: "Grammar",
    status: "Published",
    views: 1250,
    comments: 23,
    createdDate: "2024-01-15",
    featured: true,
  },
  {
    id: 2,
    title: "Common English Pronunciation Mistakes",
    author: "Jane Smith",
    category: "Pronunciation",
    status: "Draft",
    views: 0,
    comments: 0,
    createdDate: "2024-01-10",
    featured: false,
  },
  {
    id: 3,
    title: "Business English Vocabulary Guide",
    author: "Mike Johnson",
    category: "Vocabulary",
    status: "Published",
    views: 2100,
    comments: 45,
    createdDate: "2024-01-05",
    featured: true,
  },
  {
    id: 4,
    title: "IELTS Writing Task 2 Strategies",
    author: "Sarah Wilson",
    category: "IELTS",
    status: "Review",
    views: 890,
    comments: 12,
    createdDate: "2024-01-01",
    featured: false,
  },
];

export default function PostsManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredPosts = mockPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedPosts = filteredPosts.slice(
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

  const handleDeletePost = (postId: number) => {
    console.log("Deleting post:", postId);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Posts</h2>
          <p className="text-muted-foreground">
            Manage your blog posts and articles
          </p>
        </div>
        <Link to="/admin/posts/create">
          <Button className="bg-[#155e94] hover:bg-[#0b4674]">
            <Plus className="mr-2 h-4 w-4" />
            Create Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Posts</CardTitle>
          <CardDescription>
            A list of all blog posts including their status, views, and
            engagement metrics.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search posts..."
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
                  <TableHead>Title</TableHead>
                  <TableHead>Author</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Views</TableHead>
                  <TableHead>Comments</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedPosts.map((post) => (
                  <TableRow key={post.id}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="font-medium">{post.title}</div>
                        {post.featured && (
                          <Badge variant="outline" className="text-xs">
                            Featured
                          </Badge>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>{post.author}</TableCell>
                    <TableCell>
                      <Badge variant="outline">{post.category}</Badge>
                    </TableCell>
                    <TableCell>{getStatusBadge(post.status)}</TableCell>
                    <TableCell>{post.views.toLocaleString()}</TableCell>
                    <TableCell>{post.comments}</TableCell>
                    <TableCell>{post.createdDate}</TableCell>
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
                            View post
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link to={`/admin/posts/edit/${post.id}`}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit post
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDeletePost(post.id)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete post
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
