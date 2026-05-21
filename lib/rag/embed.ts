import { GoogleGenAI } from "@google/genai";


export async function embedTexts(chunks: string[]) {
  
  const ai = new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

  const contents = chunks.map((chunk) => ({
    role: "user",
    parts: [{ text: chunk }],
  }));

  const response = await ai.models.embedContent({
    model: 'gemini-embedding-2',
    contents,
    config: {
      outputDimensionality: 768,
    }
  });

  const embeddings = response.embeddings?.map((embedding) => embedding.values);

  console.log("embeddings", embeddings, embeddings?.length);

  if (!embeddings || embeddings.some((embedding) => embedding?.length !== 768)) {
    throw new Error("Gemini returned one or more invalid embeddings");
  }

  return embeddings
}
