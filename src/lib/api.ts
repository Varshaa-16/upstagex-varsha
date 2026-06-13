import type { Creator, FilterValues } from "@/types";
import { CREATORS } from "@/data/creators";

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function fetchCreators(filters: FilterValues): Promise<Creator[]> {
  await sleep(900); // simulate network delay

  return CREATORS.filter((c) => {
    if (
      filters.keyword &&
      !c.name.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      !c.handle.toLowerCase().includes(filters.keyword.toLowerCase()) &&
      !c.bio.toLowerCase().includes(filters.keyword.toLowerCase())
    ) {
      return false;
    }
    if (filters.niche !== "All" && c.niche !== filters.niche) return false;
    if (filters.platform !== "All" && c.platform !== filters.platform)
      return false;
    if (filters.audienceCountry !== "All" && c.audienceCountry !== filters.audienceCountry)
      return false;
    if (c.followerCount < filters.followerMin) return false;
    if (filters.followerMax > 0 && c.followerCount > filters.followerMax)
      return false;
    return true;
  });
}

export async function fetchCreatorById(id: string): Promise<Creator | null> {
  await sleep(300);
  return CREATORS.find((c) => c.id === id) ?? null;
}
