export interface FacialAnalysis {
  faceShape: FaceShape;
  facialFeatures: FacialFeatures;
  hairCharacteristics: HairCharacteristics;
  skinTone: SkinTone;
  styleProfile: StyleProfile;
  symmetryScore: number;
  overallBalance: string;
}

export type FaceShape =
  | 'oval'
  | 'round'
  | 'square'
  | 'heart'
  | 'oblong'
  | 'diamond'
  | 'triangular';

export interface FacialFeatures {
  foreheadWidth: 'narrow' | 'medium' | 'wide';
  cheekboneProminence: 'low' | 'medium' | 'high';
  jawlineStructure: 'soft' | 'moderate' | 'strong';
  faceLength: 'short' | 'medium' | 'long';
  facialSymmetry: number;
  ageEstimate: number;
}

export interface HairCharacteristics {
  texture: 'straight' | 'wavy' | 'curly' | 'coily';
  density: 'thin' | 'medium' | 'thick';
  hairline: 'standard' | 'receding' | 'widows-peak' | 'uneven';
  currentLength: 'very-short' | 'short' | 'medium' | 'long';
  condition: 'poor' | 'fair' | 'good' | 'excellent';
}

export interface SkinTone {
  undertone: 'cool' | 'warm' | 'neutral';
  depth: 'fair' | 'medium' | 'deep';
  luminosity: number;
}

export interface StyleProfile {
  professionalScore: number;
  fashionForwardScore: number;
  classicScore: number;
  maintenancePreference: 'low' | 'medium' | 'high';
  estimatedAge: number;
}
