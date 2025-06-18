import { GoogleGenAI } from '@google/genai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

/**
 * Generates a travel plan using Google Gemini API based on a prompt.
 * @param {string} prompt - The input text prompt describing trip preferences.
 * @returns {Promise<Object|null>} Parsed trip data object or null on failure.
 */
export async function generateTripPlan(prompt) {
  const contents = [
    {
      role: 'user',
      parts: [{ text: prompt }],
    },
  ];

  try {
    const result = await ai.models.generateContentStream({
      model: 'gemini-1.5-flash',
      contents,
      config: {
        responseMimeType: 'application/json',
      },
    });

    let fullText = '';
    for await (const chunk of result) {
      fullText += chunk.text;
    }

    // console.log("👀 Raw Gemini response:", fullText);

    // ✅ Clean response: Remove code block formatting like ```json ... ```
    const cleanedText = fullText
      .replace(/^```json/, '')
      .replace(/^```/, '')
      .replace(/```$/, '')
      .trim();

    // ✅ Parse clean JSON
    const json = JSON.parse(cleanedText);
    return json;
  } catch (error) {
    console.error("❌ Gemini API error:", error.message);
    return null;
  }
}
