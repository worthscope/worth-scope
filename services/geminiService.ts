import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getBookSummary = async (title: string, author: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Provide a concise, 3-bullet-point executive summary of the book "${title}" by ${author}. Focus on actionable takeaways for a busy professional.`,
    });
    return response.text || "No summary available.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Unable to fetch AI summary at this time.";
  }
};

export const askBookQuestion = async (title: string, author: string, question: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Context: The book is "${title}" by ${author}.
      User Question: ${question}
      Answer briefly and enthusiastically as a podcast host.`,
    });
    return response.text || "I couldn't generate an answer.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Error connecting to AI service.";
  }
};