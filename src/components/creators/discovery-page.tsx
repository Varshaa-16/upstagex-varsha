"use client";
import { useState, useCallback } from "react";
import { FilterForm } from "@/components/creators/filter-form";
import { CreatorGrid } from "@/components/creators/creator-grid";
import { useCreators } from "@/hooks/use-creators";
import type { FilterValues } from "@/types";

const DEFAULT_FILTERS: FilterValues = {
  keyword: "",
  niche: "All",
  platform: "All",
  followerMin: 0,
  followerMax: 0,
  audienceCountry: "All",
};

export function DiscoveryPage() {
  const [filters, setFilters] = useState<FilterValues>(DEFAULT_FILTERS);
  const { data, isLoading } = useCreators(filters);

  const handleFilterChange = useCallback((f: FilterValues) => {
    setFilters(f);
  }, []);

  return (
    <div className="space-y-6">
      <FilterForm
        onFilterChange={handleFilterChange}
        resultCount={data?.length ?? 0}
        isLoading={isLoading}
      />
      <CreatorGrid filters={filters} />
    </div>
  );
}
