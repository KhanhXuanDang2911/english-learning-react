import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";

export default function SpecialPostItemSkeleton() {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        {/* Image skeleton */}
        <div className="md:w-1/2">
          <Skeleton className="w-full h-64 md:h-full bg-gray-300 animate-pulse" />
        </div>

        {/* Content skeleton */}
        <div className="md:w-1/2 p-6 space-y-4">
          {/* Badge */}
          <Skeleton className="w-24 h-6 rounded-full bg-gray-300 animate-pulse" />

          {/* Title */}
          <Skeleton className="w-3/4 h-6 bg-gray-300 animate-pulse" />

          {/* Excerpt */}
          <div className="space-y-2">
            <Skeleton className="w-full h-4 bg-gray-300 animate-pulse" />
            <Skeleton className="w-5/6 h-4 bg-gray-300 animate-pulse" />
            <Skeleton className="w-4/6 h-4 bg-gray-300 animate-pulse" />
          </div>

          {/* Info line: author, date, views */}
          <div className="flex items-center gap-4 text-sm text-gray-500">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center gap-2">
                <Skeleton className="h-4 w-4 rounded-full bg-gray-300 animate-pulse" />
                <Skeleton className="h-4 w-20 bg-gray-300 animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
