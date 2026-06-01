import axios from 'axios';

const BANANAML_API_KEY = process.env.EXPO_PUBLIC_BANANAML_API_KEY || '';
const MODEL_KEY = 'gemini-3-1-flash-image-preview';

export interface HairstylePreviewRequest {
  originalImageBase64: string;
  hairstyleName: string;
  hairstyleDescription: string;
  faceShape: string;
  hairDensity: string;
  skinTone: string;
}

export interface HairstylePreviewResponse {
  previewImageBase64: string;
  processingTime: number;
  confidence: number;
}

export const generateHairstylePreview = async (
  request: HairstylePreviewRequest
): Promise<HairstylePreviewResponse> => {
  try {
    const payload = {
      image: request.originalImageBase64,
      prompt: generateEditingPrompt(request),
      strength: 0.95,
      num_inference_steps: 50,
      guidance_scale: 15,
    };

    const response = await axios.post(
      `https://api.banana.dev/v1/start/v5/${MODEL_KEY}`,
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${BANANAML_API_KEY}`,
        },
        timeout: 120000,
      }
    );

    const jobId = response.data.job_id;
    let previewImageBase64 = '';
    let attempts = 0;
    const maxAttempts = 60;

    while (!previewImageBase64 && attempts < maxAttempts) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const statusResponse = await axios.get(
        `https://api.banana.dev/v1/check/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${BANANAML_API_KEY}`,
          },
        }
      );

      if (statusResponse.data.created) {
        previewImageBase64 = statusResponse.data.result?.output?.image || '';
      }

      attempts++;
    }

    if (!previewImageBase64) {
      throw new Error('Failed to generate hairstyle preview - timeout');
    }

    return {
      previewImageBase64,
      processingTime: attempts * 2,
      confidence: 0.95,
    };
  } catch (error) {
    console.error('BananaML API Error:', error);
    throw new Error('Failed to generate hairstyle preview');
  }
};

const generateEditingPrompt = (request: HairstylePreviewRequest): string => {
  return `You are an expert hair editing AI. Edit this image to show the person with a "${request.hairstyleName}" haircut.

Requirements:
1. PRESERVE IDENTITY: Keep all facial features exactly the same
2. PRESERVE SKIN TONE: Maintain the exact skin tone (${request.skinTone})
3. PRESERVE LIGHTING: Maintain the exact same lighting and shadows
4. ONLY EDIT HAIR: Modify ONLY the hairstyle

Hairstyle Description:
${request.hairstyleDescription}

Hair Characteristics:
- Face Shape: ${request.faceShape}
- Hair Density: ${request.hairDensity}

Generate a photorealistic image.`;
};

export const batchGenerateHairstylePreviews = async (
  originalImageBase64: string,
  hairstyles: Array<{
    name: string;
    description: string;
    faceShape: string;
    hairDensity: string;
    skinTone: string;
  }>
): Promise<HairstylePreviewResponse[]> => {
  const results: HairstylePreviewResponse[] = [];

  for (const hairstyle of hairstyles) {
    try {
      const preview = await generateHairstylePreview({
        originalImageBase64,
        ...hairstyle,
      });
      results.push(preview);
    } catch (error) {
      console.error(`Failed to generate preview for ${hairstyle.name}:`, error);
      results.push({
        previewImageBase64: '',
        processingTime: 0,
        confidence: 0,
      });
    }
  }

  return results;
};
