import { GoogleGenAI, Type } from "@google/genai";
import { Question } from "../types";
import { FALLBACK_QUESTIONS } from "../constants";

export const fetchQuestions = async (): Promise<Question[]> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key found, using fallback questions.");
    return FALLBACK_QUESTIONS;
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      // Prompt updated to request Indonesian content
      contents: "Buatkan 15 pertanyaan trivia luar angkasa yang unik dan menarik untuk kuis game dalam Bahasa Indonesia. Setiap pertanyaan harus memiliki 4 pilihan dan 1 jawaban benar. Topik meliputi planet, bintang, sejarah perjalanan luar angkasa, dan kosmologi. Pertanyaan harus singkat dan jelas. Tingkat kesulitan Seimbang (Mudah/Sedang).",
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              text: { type: Type.STRING, description: "Teks pertanyaan dalam Bahasa Indonesia" },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Daftar 4 pilihan jawaban dalam Bahasa Indonesia"
              },
              correctAnswer: { type: Type.STRING, description: "Jawaban yang benar, harus sama persis dengan salah satu pilihan" }
            },
            required: ["text", "options", "correctAnswer"]
          }
        }
      }
    });

    if (response.text) {
      const rawData = JSON.parse(response.text);
      // Map to add IDs and ensure safety
      return rawData.map((q: any, i: number) => ({
        id: `gen-${Date.now()}-${i}`,
        text: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer
      })).slice(0, 15);
    }
    
    return FALLBACK_QUESTIONS;

  } catch (error) {
    console.error("Failed to fetch questions from Gemini:", error);
    return FALLBACK_QUESTIONS;
  }
};