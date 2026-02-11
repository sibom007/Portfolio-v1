import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";

export const DashboardProjectCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative">
      <Card className="overflow-hidden rounded-2xl border bg-background/70 backdrop-blur-xl shadow-sm">
        {/* Image Skeleton */}
        <div className="relative h-48 w-full">
          <Skeleton className="h-full w-full" />
        </div>

        <CardHeader className="space-y-4">
          {/* Title */}
          <Skeleton className="h-6 w-3/4 rounded-md" />

          {/* Description lines */}
          <div className="space-y-2">
            <Skeleton className="h-4 w-full rounded-md" />
            <Skeleton className="h-4 w-5/6 rounded-md" />
          </div>

          {/* Badges */}
          <div className="flex gap-2 pt-1">
            <Skeleton className="h-6 w-20 rounded-full" />
            <Skeleton className="h-6 w-24 rounded-full" />
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="py-4">
          {/* Link Pills */}
          <div className="flex gap-3">
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-24 rounded-full" />
            <Skeleton className="h-8 w-20 rounded-full" />
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between border-t pt-4 pb-2">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-20" />
        </CardFooter>
      </Card>
    </motion.div>
  );
};
