import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AspectRatio } from "@/components/ui/aspect-ratio";

export function ProjectCardSkeleton() {
  return (
    <Card className="h-full overflow-hidden">
      {/* Image Skeleton */}
      <CardHeader className="p-0">
        <AspectRatio ratio={16 / 9}>
          <Skeleton className="h-full w-full" />
        </AspectRatio>
      </CardHeader>

      {/* Content Skeleton */}
      <CardContent className="p-4 space-y-3">
        <Skeleton className="h-5 w-2/3" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      {/* Footer Skeleton */}
      <CardFooter className="px-4 pb-4 gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-16" />
      </CardFooter>
    </Card>
  );
}
