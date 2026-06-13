export type Platform = "YouTube" | "Instagram";

export type Niche =
  | "Tech"
  | "Lifestyle"
  | "Fashion"
  | "Food"
  | "Fitness"
  | "Gaming"
  | "Travel"
  | "Finance"
  | "Beauty"
  | "Education"
  | "Comedy"
  | "Music";

export type Country =
  | "US"
  | "UK"
  | "IN"
  | "BR"
  | "CA"
  | "AU"
  | "DE"
  | "FR"
  | "MX"
  | "NG"
  | "PH"
  | "ID";

export interface RecentContent {
  title: string;
  url: string;
  views: number;
  postedAt: string;
}

export interface AudienceBreakdown {
  countries: { country: Country; percentage: number }[];
  ageGroups: { range: string; percentage: number }[];
  genderSplit: { male: number; female: number; other: number };
}

export interface Creator {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  platform: Platform;
  niche: Niche;
  followerCount: number;
  engagementRate: number;
  bio: string;
  audienceCountry: Country;
  audienceBreakdown: AudienceBreakdown;
  recentContent: RecentContent[];
  pricePerPost: number;
  verified: boolean;
}

export interface FilterValues {
  keyword: string;
  niche: Niche | "All";
  platform: Platform | "All";
  followerMin: number;
  followerMax: number;
  audienceCountry: Country | "All";
}
