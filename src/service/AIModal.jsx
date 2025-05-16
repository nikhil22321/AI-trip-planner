import { GoogleGenAI } from '.google/genai';

const apiKey = import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY;

const ai = new GoogleGenAI({ apiKey });

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

    return JSON.parse(fullText);
  } catch (error) {
    console.error("Gemini API error:", error);
    return null;
  }
}
