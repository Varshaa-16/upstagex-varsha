"use client";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { formatFollowers } from "@/lib/utils";
import type { FilterValues, Niche, Platform, Country } from "@/types";

const NICHES: Niche[] = [
  "Tech","Lifestyle","Fashion","Food","Fitness",
  "Gaming","Travel","Finance","Beauty","Education","Comedy","Music",
];
const PLATFORMS: Platform[] = ["YouTube", "Instagram"];
const COUNTRIES: { code: Country; label: string }[] = [
  { code: "US", label: "United States" },
  { code: "UK", label: "United Kingdom" },
  { code: "IN", label: "India" },
  { code: "BR", label: "Brazil" },
  { code: "CA", label: "Canada" },
  { code: "AU", label: "Australia" },
  { code: "DE", label: "Germany" },
  { code: "FR", label: "France" },
  { code: "MX", label: "Mexico" },
  { code: "NG", label: "Nigeria" },
  { code: "PH", label: "Philippines" },
  { code: "ID", label: "Indonesia" },
];

const MAX_FOLLOWERS = 3_000_000;

const filterSchema = z.object({
  keyword: z.string(),
  niche: z.string(),
  platform: z.string(),
  followerRange: z.tuple([z.number(), z.number()]),
  audienceCountry: z.string(),
});

type FormValues = z.infer<typeof filterSchema>;

interface FilterFormProps {
  onFilterChange: (filters: FilterValues) => void;
  resultCount: number;
  isLoading: boolean;
}

export function FilterForm({ onFilterChange, resultCount, isLoading }: FilterFormProps) {
  const { register, control, watch, reset, formState } = useForm<FormValues>({
    resolver: zodResolver(filterSchema),
    defaultValues: {
      keyword: "",
      niche: "All",
      platform: "All",
      followerRange: [0, MAX_FOLLOWERS],
      audienceCountry: "All",
    },
  });

  const values = watch();
  const isDirty = formState.isDirty;

  useEffect(() => {
    const [min, max] = values.followerRange;
    onFilterChange({
      keyword: values.keyword,
      niche: values.niche as FilterValues["niche"],
      platform: values.platform as FilterValues["platform"],
      followerMin: min,
      followerMax: max >= MAX_FOLLOWERS ? 0 : max,
      audienceCountry: values.audienceCountry as FilterValues["audienceCountry"],
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values.keyword, values.niche, values.platform, values.followerRange, values.audienceCountry]);

  const handleReset = () =>
    reset({
      keyword: "",
      niche: "All",
      platform: "All",
      followerRange: [0, MAX_FOLLOWERS],
      audienceCountry: "All",
    });

  const [rangeMin, rangeMax] = values.followerRange;

  return (
    <div className="bg-card border rounded-xl p-5 space-y-5">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        <Input
          {...register("keyword")}
          placeholder="Search by name, handle, or keyword…"
          className="pl-9 h-11"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Niche */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Niche</Label>
          <Controller
            control={control}
            name="niche"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All niches" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All niches</SelectItem>
                  {NICHES.map((n) => (
                    <SelectItem key={n} value={n}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Platform */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Platform</Label>
          <Controller
            control={control}
            name="platform"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All platforms" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All platforms</SelectItem>
                  {PLATFORMS.map((p) => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Audience Country */}
        <div className="space-y-1.5">
          <Label className="text-xs text-muted-foreground uppercase tracking-wide">Audience Country</Label>
          <Controller
            control={control}
            name="audienceCountry"
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="All countries" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">All countries</SelectItem>
                  {COUNTRIES.map((c) => (
                    <SelectItem key={c.code} value={c.code}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        </div>

        {/* Follower range */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label className="text-xs text-muted-foreground uppercase tracking-wide">Followers</Label>
            <span className="text-xs text-muted-foreground">
              {formatFollowers(rangeMin)} – {rangeMax >= MAX_FOLLOWERS ? "3M+" : formatFollowers(rangeMax)}
            </span>
          </div>
          <Controller
            control={control}
            name="followerRange"
            render={({ field }) => (
              <Slider
                min={0}
                max={MAX_FOLLOWERS}
                step={10_000}
                value={field.value}
                onValueChange={field.onChange}
                className="mt-2"
              />
            )}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-1">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <SlidersHorizontal className="h-4 w-4" />
          {isLoading ? (
            <span>Searching…</span>
          ) : (
            <span>
              <span className="font-semibold text-foreground">{resultCount}</span> creator
              {resultCount !== 1 ? "s" : ""} found
            </span>
          )}
        </div>
        {isDirty && (
          <Button variant="ghost" size="sm" onClick={handleReset} className="h-8 text-xs gap-1.5">
            <X className="h-3.5 w-3.5" />
            Clear filters
          </Button>
        )}
      </div>
    </div>
  );
}
