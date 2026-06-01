import { FacialAnalysis } from './analysis';

export interface HairstyleRecommendation {
  id: string;
  name: string;
  description: string;
  whyItWorks: string;
  keyStrengths: string[];
  maintenanceLevel: 'low' | 'medium' | 'high';
  stylingDifficulty: 'easy' | 'moderate' | 'difficult';
  barberComplexity: number;
  professionalVersatility: number;
  growthBehavior: string;
  styleTags: StyleTag[];
  compatibilityScores: CompatibilityScores;
  previewImageUrl: string;
  facialFeatureExplanation: string;
  maintenanceGuide: MaintenanceGuide;
  productRecommendations: ProductRecommendation[];
  estimatedCostRange: string;
  timeToStyle: string;
  alternativeNames: string[];
  beardPairingAdvice: string;
  colorEnhancementSuggestion: string;
}

export type StyleTag =
  | 'modern'
  | 'executive'
  | 'luxury'
  | 'minimalist'
  | 'fashionable'
  | 'timeless'
  | 'edgy'
  | 'creative'
  | 'sophisticated'
  | 'athletic'
  | 'low-maintenance'
  | 'trend-forward';

export interface CompatibilityScores {
  overallMatch: number;
  faceShapeCompatibility: number;
  hairTextureCompatibility: number;
  maintenanceFit: number;
  lifestyleFit: number;
  professionalVersatility: number;
  attractivenessEnhancement: number;
  stylingFlexibility: number;
}

export interface MaintenanceGuide {
  dailyRoutine: string;
  weeklyTreatments: string;
  trimmingFrequency: string;
  washingRecommendations: string;
  stylingProducts: string;
  longTermUpkeep: string;
  growthTimeline: string;
}

export interface ProductRecommendation {
  productName: string;
  category: 'pomade' | 'gel' | 'clay' | 'paste' | 'spray' | 'shampoo' | 'conditioner';
  purpose: string;
  applicationTip: string;
}

export interface StyleMatchScore {
  score: number;
  reasoning: string;
  strengths: string[];
  considerationPoints: string[];
}

export interface HairstyleHistory {
  id: string;
  userId: string;
  timestamp: Date;
  originalImage: string;
  analysis: FacialAnalysis;
  recommendations: HairstyleRecommendation[];
  selectedRecommendation?: HairstyleRecommendation;
  preferences: UserPreferences;
}

export interface UserPreferences {
  desiredHairLength: 'very-short' | 'short' | 'medium' | 'long';
  stylingEffort: 'minimal' | 'moderate' | 'high';
  professionalLevel: 'casual' | 'business-casual' | 'executive';
  fashionForwardness: 'classic' | 'contemporary' | 'trendy' | 'experimental';
  styleCategory: StyleTag[];
  ageAppropriate: boolean;
  beardCompatible: boolean;
  lifestyleConsiderations: string[];
  excludedStyles: string[];
}
