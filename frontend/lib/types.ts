export type UserRole = 'customer' | 'production_house';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl?: string;
  companyName?: string;
  createdAt: string;
  phone?: string;
  location?: string;
  bio?: string;
  gstin?: string;
}

export type ServiceCategory = 
  | 'Video Production'
  | 'Branding'
  | 'Printing'
  | 'Posters & Pamphlets'
  | 'Digital Advertising'
  | 'Photography'
  | 'Outdoor Advertising'
  | '3D & CGI Animation';

export interface ServiceOffering {
  id: string;
  name: ServiceCategory | string;
  description: string;
  startingPrice: number; // in INR (₹)
  turnaroundDays: number;
  tags: string[];
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: ServiceCategory;
  clientName: string;
  thumbnailUrl: string;
  videoUrl?: string;
  description: string;
  metrics?: string;
  year: number;
  featured?: boolean;
}

export interface Review {
  id: string;
  authorName: string;
  authorCompany: string;
  authorAvatar?: string;
  rating: number; // 1 to 5
  date: string;
  comment: string;
  projectName: string;
  category: ServiceCategory;
  verifiedWork?: boolean;
}

export interface ProductionHouse {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  description: string;
  logoUrl: string;
  coverImageUrl: string;
  location: string;
  city: 'Mumbai' | 'Bengaluru' | 'Delhi NCR' | 'Hyderabad' | 'Chennai' | 'Kolkata' | string;
  country: string;
  verified: boolean;
  gstRegistered?: boolean;
  rating: number;
  reviewCount: number;
  yearsInBusiness: number;
  teamSize: string;
  responseRateHours: number;
  budgetTier: '₹' | '₹₹' | '₹₹₹' | '₹₹₹₹';
  minBudget: number; // in INR (₹)
  availability: 'Available Now' | 'Next 2 Weeks' | 'Waitlist';
  featured: boolean;
  services: ServiceOffering[];
  portfolio: PortfolioItem[];
  reviews: Review[];
  notableClients: string[];
  badges: string[];
  contactEmail: string;
  phone?: string;
  website?: string;
  equipmentFacilities?: string[];
  studioFloorSpecs?: string;
}

export type EnquiryStatus = 
  | 'pending'
  | 'under_review'
  | 'quoted'
  | 'in_progress'
  | 'completed'
  | 'declined';

export interface Enquiry {
  id: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  customerCompany?: string;
  productionHouseId: string;
  productionHouseName: string;
  projectTitle: string;
  category: ServiceCategory;
  budgetRange: string; // e.g. "₹5,00,000 - ₹12,00,000"
  deadline: string;
  location: string;
  description: string;
  status: EnquiryStatus;
  quotedAmount?: number; // in INR (₹)
  quoteNotes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProjectBrief {
  title: string;
  category: ServiceCategory;
  objective: string;
  deliverables: string[];
  targetAudience: string;
  budgetRange: string;
  timeline: string;
  location: string;
  additionalNotes?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  content: string;
  timestamp: string;
  quickReplies?: string[];
  suggestedCategories?: ServiceCategory[];
  generatedBrief?: ProjectBrief;
  recommendedHouseIds?: string[];
}

export interface FilterState {
  searchQuery: string;
  category: string;
  location: string;
  budgetRangeId: string;
  minRating: number;
  minExperience: number;
  availability: string;
  sortBy: 'relevance' | 'rating' | 'experience' | 'budget_asc' | 'budget_desc';
}
