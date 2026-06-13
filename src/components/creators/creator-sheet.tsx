"use client";
import {
  Users, TrendingUp, DollarSign, Globe, BadgeCheck,
  ExternalLink, Youtube, Instagram,
} from "lucide-react";
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { formatFollowers, formatCurrency } from "@/lib/utils";
import type { Creator } from "@/types";

interface CreatorSheetProps {
  creator: Creator | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

function StatBlock({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-3 rounded-lg bg-muted/50 p-3">
      <div className="text-muted-foreground shrink-0">{icon}</div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-semibold">{value}</p>
      </div>
    </div>
  );
}

export function CreatorSheet({ creator, open, onOpenChange }: CreatorSheetProps) {
  if (!creator) return null;

  const platformIcon =
    creator.platform === "YouTube" ? (
      <Youtube className="h-4 w-4 text-red-600" />
    ) : (
      <Instagram className="h-4 w-4 text-pink-600" />
    );

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-lg overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 ring-2 ring-border">
              <AvatarImage src={creator.avatar} alt={creator.name} />
              <AvatarFallback className="text-lg font-bold bg-gradient-to-br from-primary/20 to-primary/5">
                {creator.name.split(" ").map((n) => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="flex items-center gap-2">
                <SheetTitle className="text-xl">{creator.name}</SheetTitle>
                {creator.verified && (
                  <BadgeCheck className="h-5 w-5 text-primary" />
                )}
              </div>
              <div className="flex items-center gap-1.5 mt-1">
                {platformIcon}
                <SheetDescription className="text-sm">
                  {creator.handle} · {creator.platform}
                </SheetDescription>
              </div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{creator.niche}</Badge>
            <Badge variant="outline">{creator.audienceCountry} audience</Badge>
          </div>
        </SheetHeader>

        {/* Bio */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-2">About</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{creator.bio}</p>
        </section>

        {/* Key stats */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Key Stats</h3>
          <div className="grid grid-cols-2 gap-2">
            <StatBlock icon={<Users className="h-4 w-4" />} label="Followers" value={formatFollowers(creator.followerCount)} />
            <StatBlock icon={<TrendingUp className="h-4 w-4" />} label="Engagement Rate" value={`${creator.engagementRate}%`} />
            <StatBlock icon={<DollarSign className="h-4 w-4" />} label="Price per Post" value={formatCurrency(creator.pricePerPost)} />
            <StatBlock icon={<Globe className="h-4 w-4" />} label="Top Audience" value={creator.audienceCountry} />
          </div>
        </section>

        <Separator className="mb-6" />

        {/* Audience breakdown */}
        <section className="mb-6">
          <h3 className="text-sm font-semibold text-foreground mb-3">Audience Breakdown</h3>

          <div className="space-y-4">
            {/* Countries */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Top Countries</p>
              <div className="space-y-1.5">
                {creator.audienceBreakdown.countries.map((c) => (
                  <div key={c.country} className="flex items-center gap-2">
                    <span className="text-xs w-8 text-muted-foreground">{c.country}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary rounded-full transition-all"
                        style={{ width: `${c.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8 text-right">{c.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Age groups */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Age Groups</p>
              <div className="space-y-1.5">
                {creator.audienceBreakdown.ageGroups.map((a) => (
                  <div key={a.range} className="flex items-center gap-2">
                    <span className="text-xs w-12 text-muted-foreground">{a.range}</span>
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-violet-500 rounded-full transition-all"
                        style={{ width: `${a.percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium w-8 text-right">{a.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Gender */}
            <div>
              <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">Gender</p>
              <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
                <div
                  className="bg-blue-400 transition-all"
                  style={{ width: `${creator.audienceBreakdown.genderSplit.male}%` }}
                  title={`Male: ${creator.audienceBreakdown.genderSplit.male}%`}
                />
                <div
                  className="bg-pink-400 transition-all"
                  style={{ width: `${creator.audienceBreakdown.genderSplit.female}%` }}
                  title={`Female: ${creator.audienceBreakdown.genderSplit.female}%`}
                />
                <div
                  className="bg-muted flex-1"
                  title={`Other: ${creator.audienceBreakdown.genderSplit.other}%`}
                />
              </div>
              <div className="flex gap-4 mt-1.5">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-blue-400 inline-block" />
                  Male {creator.audienceBreakdown.genderSplit.male}%
                </span>
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <span className="h-2 w-2 rounded-full bg-pink-400 inline-block" />
                  Female {creator.audienceBreakdown.genderSplit.female}%
                </span>
              </div>
            </div>
          </div>
        </section>

        <Separator className="mb-6" />

        {/* Recent content */}
        <section>
          <h3 className="text-sm font-semibold text-foreground mb-3">Recent Content</h3>
          <div className="space-y-3">
            {creator.recentContent.map((post, i) => (
              <div
                key={i}
                className="flex items-start gap-3 p-3 rounded-lg border border-border/60 hover:border-primary/30 hover:bg-muted/30 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground leading-snug truncate">
                    {post.title}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      {formatFollowers(post.views)} views
                    </span>
                    <span className="text-muted-foreground">·</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(post.postedAt).toLocaleDateString("en-US", {
                        month: "short", day: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors shrink-0"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            ))}
          </div>
        </section>
      </SheetContent>
    </Sheet>
  );
}
