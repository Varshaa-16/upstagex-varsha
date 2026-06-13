import { Users, TrendingUp, BadgeCheck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatFollowers } from "@/lib/utils";
import type { Creator } from "@/types";

const PLATFORM_COLORS: Record<string, string> = {
  YouTube: "bg-red-100 text-red-700 border-red-200",
  Instagram:
    "bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 border-purple-200",
};

const NICHE_COLORS: Record<string, string> = {
  Tech: "bg-blue-50 text-blue-700 border-blue-200",
  Lifestyle: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Fashion: "bg-pink-50 text-pink-700 border-pink-200",
  Food: "bg-orange-50 text-orange-700 border-orange-200",
  Fitness: "bg-lime-50 text-lime-700 border-lime-200",
  Gaming: "bg-violet-50 text-violet-700 border-violet-200",
  Travel: "bg-sky-50 text-sky-700 border-sky-200",
  Finance: "bg-yellow-50 text-yellow-700 border-yellow-200",
  Beauty: "bg-rose-50 text-rose-700 border-rose-200",
  Education: "bg-indigo-50 text-indigo-700 border-indigo-200",
  Comedy: "bg-amber-50 text-amber-700 border-amber-200",
  Music: "bg-teal-50 text-teal-700 border-teal-200",
};

interface CreatorCardProps {
  creator: Creator;
  onClick: (creator: Creator) => void;
}

export function CreatorCard({ creator, onClick }: CreatorCardProps) {
  return (
    <Card
      onClick={() => onClick(creator)}
      className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/30"
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start gap-3 mb-4">
          <Avatar className="h-12 w-12 ring-2 ring-border group-hover:ring-primary/30 transition-all">
            <AvatarImage src={creator.avatar} alt={creator.name} />
            <AvatarFallback className="text-sm font-semibold bg-gradient-to-br from-primary/20 to-primary/5">
              {creator.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1.5">
              <p className="font-semibold text-sm text-foreground truncate">
                {creator.name}
              </p>
              {creator.verified && (
                <BadgeCheck className="h-4 w-4 text-primary shrink-0" />
              )}
            </div>
            <p className="text-xs text-muted-foreground truncate">
              {creator.handle}
            </p>
          </div>
          <span
            className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border shrink-0 ${
              PLATFORM_COLORS[creator.platform]
            }`}
          >
            {creator.platform}
          </span>
        </div>

        {/* Niche badge */}
        <div className="mb-4">
          <Badge
            variant="outline"
            className={`text-xs font-medium ${NICHE_COLORS[creator.niche]}`}
          >
            {creator.niche}
          </Badge>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-muted/50 rounded-md p-2.5">
            <Users className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground leading-none mb-0.5">
                Followers
              </p>
              <p className="text-sm font-semibold text-foreground">
                {formatFollowers(creator.followerCount)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-muted/50 rounded-md p-2.5">
            <TrendingUp className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground leading-none mb-0.5">
                Engagement
              </p>
              <p className="text-sm font-semibold text-foreground">
                {creator.engagementRate}%
              </p>
            </div>
          </div>
        </div>

        {/* Country + price */}
        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/60">
          <span className="text-xs text-muted-foreground">
            🌍 {creator.audienceCountry} audience
          </span>
          <span className="text-xs font-semibold text-primary">
            ${creator.pricePerPost.toLocaleString()}
            <span className="font-normal text-muted-foreground">/post</span>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
