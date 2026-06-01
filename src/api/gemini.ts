import { GoogleGenerativeAI } from '@google-ai/generativeai';
import { FacialAnalysis, HairstyleRecommendation } from '@/types/recommendation';

const client = new GoogleGenerativeAI(
  process.env.EXPO_PUBLIC_GEMINI_API_KEY || ''
);

export const analyzeFacialCharacteristics = async (
  imageBase64: string
): Promise<FacialAnalysis> => {
  const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an elite celebrity hairstylist and facial analysis expert. Analyze this photo with extreme precision and provide a detailed JSON response about the person's facial and hair characteristics.

IMPORTANT: Respond ONLY with valid JSON, no additional text.

Analyze and provide:
1. Face shape (oval, round, square, heart, oblong, diamond, triangular)
2. Facial features:
   - Forehead width (narrow, medium, wide)
   - Cheekbone prominence (low, medium, high)
   - Jawline structure (soft, moderate, strong)
   - Face length (short, medium, long)
   - Facial symmetry score (0-100)
   - Estimated age
3. Hair characteristics:
   - Texture (straight, wavy, curly, coily)
   - Density (thin, medium, thick)
   - Hairline type (standard, receding, widows-peak, uneven)
   - Current length (very-short, short, medium, long)
   - Condition (poor, fair, good, excellent)
4. Skin tone:
   - Undertone (cool, warm, neutral)
   - Depth (fair, medium, deep)
   - Luminosity (0-100)
5. Style profile:
   - Professional score (0-100)
   - Fashion forward score (0-100)
   - Classic score (0-100)
   - Maintenance preference (low, medium, high)

Return as valid JSON with proper structure.`;

  const response = await model.generateContent([
    {
      inlineData: {
        mimeType: 'image/jpeg',
        data: imageBase64,
      },
    },
    {
      text: prompt,
    },
  ]);

  const content = response.response.candidates?.[0]?.content?.parts?.[0];
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response from Gemini API');
  }

  try {
    return JSON.parse(content.text);
  } catch (e) {
    throw new Error('Failed to parse Gemini response as JSON');
  }
};

export const generateHairstyleRecommendations = async (
  analysis: FacialAnalysis,
  preferences?: any
): Promise<HairstyleRecommendation[]> => {
  const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an elite celebrity hairstylist. Based on this facial analysis, generate exactly 3 personalized haircut recommendations.

Facial Analysis:
${JSON.stringify(analysis, null, 2)}

User Preferences:
${preferences ? JSON.stringify(preferences, null, 2) : 'No specific preferences'}

Respond ONLY with a valid JSON array containing exactly 3 recommendation objects with all required fields.`;

  const response = await model.generateContent([{ text: prompt }]);

  const content = response.response.candidates?.[0]?.content?.parts?.[0];
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response from Gemini API');
  }

  try {
    return JSON.parse(content.text);
  } catch (e) {
    console.error('Raw response:', content.text);
    throw new Error('Failed to parse recommendations response as JSON');
  }
};

export const generateGroomingTips = async (
  analysis: FacialAnalysis,
  selectedStyle: string
): Promise<string> => {
  const model = client.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `Based on this facial analysis and selected haircut "${selectedStyle}", provide expert grooming tips.

Facial Analysis:
${JSON.stringify(analysis, null, 2)}

Provide practical, actionable grooming advice tailored to their specific features.`;

  const response = await model.generateContent([{ text: prompt }]);

  const content = response.response.candidates?.[0]?.content?.parts?.[0];
  if (!content || content.type !== 'text') {
    throw new Error('Invalid response from Gemini API');
  }

  return content.text;
};
