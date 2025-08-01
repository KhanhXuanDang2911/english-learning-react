import { Link } from "react-router-dom";
import type { Post } from "../FeaturedPosts/FeaturedPosts";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  ArrowRight,
  Clock,
  Heart,
  MessageCircle,
  Eye,
  User,
} from "lucide-react";
import { Button } from "../ui/button";

interface PostItemProps {
  post: Post;
}

export default function PostItem({ post }: PostItemProps) {
  return (
    <Card className="overflow-hidden w-full h-full flex flex-col">
      <Link to={`/posts/${post.slug || post.id}`} className="block">
        <div className="aspect-[16/9] w-full overflow-hidden">
          <img
            src={post.imageUrl || "/placeholder.svg"}
            alt={post.title}
            className="w-full h-full object-cover transition-opacity hover:opacity-80"
          />
        </div>
      </Link>

      <CardContent className="p-4 space-y-2 flex-1 flex flex-col">
        <div className="text-xs uppercase text-muted-foreground font-medium tracking-wide">
          <Badge className="bg-primary-color">{post.category}</Badge> ·{" "}
          {post.date}
        </div>
        <h3 className="text-lg font-semibold leading-snug hover:underline line-clamp-2 text-primary-color">
          <Link to={`/posts/${post.slug || post.id}`}>{post.title}</Link>
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {post.excerpt}
        </p>

        {/* Author and stats */}
        {post.author && (
          <div className="flex items-center gap-2 text-xs text-muted-foreground pt-2">
            <User size={12} />
            <span>{post.author}</span>
          </div>
        )}

        <div className="mt-4 flex items-center justify-between w-full text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock size={14} />
            {post.readTime || 3} phút đọc
          </span>
          <div className="flex gap-x-3">
            {post.views && (
              <span className="flex items-center gap-0.5">
                <Eye size={14} />
                {post.views}
              </span>
            )}
            <span className="flex items-center gap-0.5">
              <MessageCircle size={14} />
              12
            </span>
            <span className="flex items-center gap-0.5">
              <Heart size={14} />
              24
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 mt-auto">
        <Button variant="link" className="text-primary gap-1 p-0 h-auto">
          Đọc thêm <ArrowRight className="w-4 h-4" />
        </Button>
      </CardFooter>
    </Card>
  );
}
