import Groq from "groq-sdk";
import { SupportPrompt } from "./rag/prompt";


function createGroqClient() {
  return new Groq();
}


export async function callGroqChatCompletion(prompt: SupportPrompt){
  const groq = createGroqClient();

  try {
    const response = await groq.chat.completions.create({
      messages: prompt.messages,
      model: "openai/gpt-oss-20b",
      max_completion_tokens: 500,
      stream: false,
    });

    const result = response.choices[0]?.message?.content;

    return { result }; 

  } catch (error){
    console.error("Failed to fetch Groq chat completion.", error);
  }

}


