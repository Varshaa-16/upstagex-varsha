import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function CreatorCardSkeleton() {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start gap-3 mb-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
        <Skeleton className="h-5 w-20 rounded-full mb-4" />
        <div className="grid grid-cols-2 gap-3 mb-3">
          <Skeleton className="h-14 rounded-md" />
          <Skeleton className="h-14 rounded-md" />
        </div>
        <Skeleton className="h-px w-full mb-3" />
        <div className="flex justify-between">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-3 w-16" />
        </div>
      </CardContent>
    </Card>
  );
}
