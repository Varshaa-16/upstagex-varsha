import { Sparkles } from "lucide-react";
import { DiscoveryPage } from "@/components/creators/discovery-page";

// This is a Server Component — it renders the shell.
// DiscoveryPage is "use client" and handles all interactivity.
export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="font-bold text-base tracking-tight">upstageX</span>
          </div>
          <span className="text-xs text-muted-foreground hidden sm:block">
            Creator Discovery Platform
          </span>
        </div>
      </header>

      {/* Page content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {/* Page heading */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
            Discover Creators
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base">
            Browse 40+ vetted creators across platforms, niches, and audiences.
            Click any card to see full details.
          </p>
        </div>

        <DiscoveryPage />
      </main>
    </div>
  );
}
