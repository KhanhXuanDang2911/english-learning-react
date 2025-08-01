import { Calendar, Eye, User } from "lucide-react";
import type { Post } from "../FeaturedPosts/FeaturedPosts";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";

interface SpecialPostItemProps {
  post: Post;
}

export default function SpecialPostItem({ post }: SpecialPostItemProps) {
  return (
    <>
      <Card className="overflow-hidden">
        <div className="md:flex">
          <div className="md:w-1/2">
            <img
              src={post.imageUrl || "/placeholder.svg"}
              alt={post.title}
              className="w-full h-64 md:h-full object-cover"
            />
          </div>
          <div className="md:w-1/2 p-6">
            <Badge className="bg-primary-color mb-3">{post.category}</Badge>
            <h2 className="text-2xl font-bold mb-3 text-primary-color hover:text-hover-primary-color">
              <a href={`/posts/${post.slug}`}>{post.title}</a>
            </h2>
            <p className="text-gray-600 mb-4 line-clamp-3">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <User className="h-4 w-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                <span>{post.views?.toLocaleString()} lượt xem</span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
