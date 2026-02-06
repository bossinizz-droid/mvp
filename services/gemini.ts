
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_PROMPT } from "../constants.tsx";

// Vercel 배포 시 process.env.API_KEY를 안전하게 가져옵니다.
const getApiKey = () => {
  const key = process.env.API_KEY;
  if (!key) {
    console.warn("API Key is missing. Please set API_KEY in your environment variables.");
  }
  return key || '';
};

export const getGeminiAnalysis = async (prompt: string, context?: any) => {
  const apiKey = getApiKey();
  
  if (!apiKey) {
    return {
      text: "API 키가 설정되지 않았습니다. Vercel 환경 변수(Environment Variables)에서 API_KEY를 설정해주세요.",
      sources: []
    };
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        tools: [{ googleSearch: {} }],
      },
    });

    return {
      text: response.text || "분석 결과를 가져오지 못했습니다.",
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks?.map((chunk: any) => ({
        title: chunk.web?.title || '참조',
        url: chunk.web?.uri || '#'
      })) || []
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

export const analyzeStockTrend = async (stockName: string) => {
  const prompt = `${stockName}의 최근 주가 흐름과 주요 이슈에 대해 분석해줘. 현재 시장 상황에서 투자자들이 주목해야 할 포인트는 뭐야?`;
  return getGeminiAnalysis(prompt);
};
