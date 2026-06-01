import { useState, useCallback } from 'react';
import { analyzeFacialCharacteristics } from '@/api/gemini';
import { FacialAnalysis } from '@/types/recommendation';

interface UseFacialAnalysisReturn {
  analysis: FacialAnalysis | null;
  loading: boolean;
  error: string | null;
  analyzeImage: (imageBase64: string) => Promise<FacialAnalysis | null>;
  reset: () => void;
}

export const useFacialAnalysis = (): UseFacialAnalysisReturn => {
  const [analysis, setAnalysis] = useState<FacialAnalysis | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeImage = useCallback(
    async (imageBase64: string): Promise<FacialAnalysis | null> => {
      setLoading(true);
      setError(null);

      try {
        const result = await analyzeFacialCharacteristics(imageBase64);
        setAnalysis(result);
        return result;
      } catch (err) {
        const message =
          err instanceof Error ? err.message : 'Failed to analyze image';
        setError(message);
        return null;
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const reset = useCallback(() => {
    setAnalysis(null);
    setError(null);
    setLoading(false);
  }, []);

  return { analysis, loading, error, analyzeImage, reset };
};
