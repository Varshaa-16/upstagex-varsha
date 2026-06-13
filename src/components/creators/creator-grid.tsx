"use client";
import { useState, useCallback } from "react";
import { AlertCircle, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatorCard } from "./creator-card";
import { CreatorCardSkeleton } from "./creator-card-skeleton";
import { CreatorSheet } from "./creator-sheet";
import type { Creator, FilterValues } from "@/types";
import { useCreators } from "@/hooks/use-creators";

interface CreatorGridProps {
  filters: FilterValues;
}

export function CreatorGrid({ filters }: CreatorGridProps) {
  const { data: creators, isLoading, isError, refetch } = useCreators(filters);
  const [selected, setSelected] = useState<Creator | null>(null);
  const [sheetOpen, setSheetOpen] = useState(false);

  const handleCardClick = useCallback((creator: Creator) => {
    setSelected(creator);
    setSheetOpen(true);
  }, []);

  // Loading state
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <CreatorCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-12 w-12 rounded-full bg-destructive/10 flex items-center justify-center mb-4">
          <AlertCircle className="h-6 w-6 text-destructive" />
        </div>
        <h3 className="text-base font-semibold mb-1">Something went wrong</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-xs">
          We couldn&apos;t load creators right now. Check your connection and try again.
        </p>
        <Button variant="outline" size="sm" onClick={() => refetch()}>
          Try again
        </Button>
      </div>
    );
  }

  // Empty state
  if (!creators || creators.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div className="h-12 w-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <SearchX className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-base font-semibold mb-1">No creators match your filters</h3>
        <p className="text-sm text-muted-foreground max-w-xs">
          Try widening your search — adjust the niche, platform, or follower range.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {creators.map((creator) => (
          <CreatorCard key={creator.id} creator={creator} onClick={handleCardClick} />
        ))}
      </div>
      <CreatorSheet
        creator={selected}
        open={sheetOpen}
        onOpenChange={setSheetOpen}
      />
    </>
  );
}
