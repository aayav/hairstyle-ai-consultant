import { useState, useCallback } from 'react';
import { generateHairstyleRecommendations } from '@/api/gemini';
import { batchGenerateHairstylePreviews } from '@/api/bananaml';
import {
  FacialAnalysis,
  HairstyleRecommendation,
  UserPreferences,
} from '@/types/recommendation';

interface UseHairstyleRecommendationsReturn {
  recommendations: HairstyleRecommendation[] | null;
  loading: boolean;
  previewsLoading: boolean;
  error: string | null;
  generateRecommendations: (
    analysis: FacialAnalysis,
    preferences?: UserPreferences
  ) => Promise<HairstyleRecommendation[] | null>;
  generatePreviews: (
    imageBase64: string,
    recommendations: HairstyleRecommendation[],
    analysis: FacialAnalysis
  ) => Promise<void>;
  reset: () => void;
}

export const useHairstyleRecommendations = (): UseHairstyleRecommendationsReturn => {
  const [recommendations, setRecommendations] = useState<
    HairstyleRecommendation[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [previewsLoading, setPreviewsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateRecommendations = useCallback(
    async (
      analysis: FacialAnalysis,
      preferences?: UserPreferences
    ): Promise<HairstyleRecommendation[] | null> => {
      setLoading(true);
      setError(null);

      try {
        const results = await generateHairstyleRecommendations(
          analysis,
          preferences
        );
        setRecommendations(results);
        return results;
      } catch (err) {
        const message =
          err instanceof Error
            ? err.message
            : 'Failed to generate recommendations';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const generatePreviews = useCallback(
    async (
      imageBase64: string,
      recs: HairstyleRecommendation[],
      analysis: FacialAnalysis
    ) => {
      setPreviewsLoading(true);
      setError(null);

      try {
        const previews = await batchGenerateHairstylePreviews(
          imageBase64,
          recs.map((rec) => ({
            name: rec.name,
            description: rec.description,
            faceShape: analysis.faceShape,
            hairDensity: analysis.hairCharacteristics.density,
            skinTone: analysis.skinTone.undertone,
          }))
        );

        const updated = recs.map((rec, idx) => ({
          ...rec,
          previewImageUrl: previews[idx]?.previewImageBase64 || '',
        }));

        setRecommendations(updated);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to generate previews';
        setError(message);
      } finally {
        setPreviewsLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setRecommendations(null);
    setError(null);
    setLoading(false);
    setPreviewsLoading(false);
  }, []);

  return {
    recommendations,
    loading,
    previewsLoading,
    error,
    generateRecommendations,
    generatePreviews,
    reset,
  };
};
