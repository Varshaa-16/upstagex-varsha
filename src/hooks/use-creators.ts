import { useQuery } from "@tanstack/react-query";
import { fetchCreators } from "@/lib/api";
import type { FilterValues } from "@/types";

export function useCreators(filters: FilterValues) {
  return useQuery({
    queryKey: ["creators", filters],
    queryFn: () => fetchCreators(filters),
  });
}
