/* ── Region & Destination Tags ── */
export type DestinationTag = 'Sri Lanka' | 'Saudi Arabia' | 'Bahrain';
export const destinationTags: DestinationTag[] = ['Sri Lanka', 'Saudi Arabia', 'Bahrain'];

/* ── Tour Tiers ── */
export type TourTier = 'Tailor-Made' | 'Small Group' | 'Fixed Getaway';
export const tourTiers: TourTier[] = ['Tailor-Made', 'Small Group', 'Fixed Getaway'];

/* ── Thematic Filters ── */
export type TourTheme = 'Honeymoon' | 'Wildlife' | 'Adventure' | 'Culture' | 'History';
export const tourThemes: TourTheme[] = ['Honeymoon', 'Wildlife', 'Adventure', 'Culture', 'History'];

/* ── Difficulty ── */
export type Difficulty = 'Easy' | 'Moderate' | 'Challenging';

/* ── Destination ── */
export interface Destination {
  id: string;
  name: string;
  region: string;
  tag: DestinationTag;
  tagline: string;
  description: string;
  image: string;
  bestSeason: string;
}

/* ── Day Plan (for detailed itinerary breakdown) ── */
export interface DayPlan {
  day: number;
  title: string;
  description: string;
  activities: string[];
  accommodation: string;
  meals: { breakfast: boolean; lunch: boolean; dinner: boolean };
  transferTime?: string;
}

/* ── Itinerary ── */
export interface Itinerary {
  id: string;
  title: string;
  destinationId: string;
  destinationName: string;
  duration: number;
  groupSize: string;
  difficulty: Difficulty;
  price: number;
  season: string;
  image: string;
  summary: string;
  highlights: string[];
  tier: TourTier;
  theme: TourTheme;
  dayPlans: DayPlan[];
}

/* ── Blog Post ── */
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  author: string;
  date: string;
  category: string;
  image: string;
  readTime: number;
}

/* ── Contact / Inquiry ── */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  travelDates?: string;
  travellers?: string;
  interest: string;
  message: string;
  budget?: string;
  submittedAt: string;
  read: boolean;
  funnelStep: 1 | 2 | 3 | 4;
}

/* ── Review / Social Proof ── */
export interface Review {
  id: string;
  name: string;
  origin: string;
  trip: string;
  quote: string;
  rating: number;
  platform: 'TripAdvisor' | 'Google' | 'Direct';
  avatar?: string;
}
