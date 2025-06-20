// types/index.ts
export interface User {
  uid: string;
  email: string | null;
  displayName?: string | null;
}

export interface Supporter {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  socialProfile?: string;
  role: string;
  interests: string[];
  message?: string;
  verified: boolean;
  timestamp: unknown;
  status: 'active' | 'pending' | 'inactive';
}

export interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  socialProfile?: string;
  role: string;
  interests: string[];
  message?: string;
  supportConsent: boolean;
  updatesConsent: boolean;
}

// Home page stats interface
export interface Stats {
  supporters: number;
  events: number;
  artists: number;
  cities: number;
}

// New types for the combined overview page
export interface ProblemItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  impact: string;
  solution: string;
}

export interface RoadmapPhase {
  year: string;
  title: string;
  items: string[];
}

export interface ShowcaseItem {
  title: string;
  year?: string;
  location?: string;
  region?: string;
  count?: string;
  description: string;
}

export interface ShowcaseData {
  cinema: ShowcaseItem[];
  folk: ShowcaseItem[];
  youth: ShowcaseItem[];
  heritage: ShowcaseItem[];
}

// Contact form types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  subject: string;
  message: string;
  newsletter: boolean;
}

// News and events types
export interface Event {
  title: string;
  date: string;
  location: string;
  description: string;
  status: 'upcoming' | 'registration';
}

export interface NewsItem {
  title: string;
  date: string;
  summary: string;
  category: string;
}