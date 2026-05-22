import Groq from "groq-sdk";
import { MatchingDocumentChunk } from "@/types/ingest";
import { ContextDocument } from "./rag/prompt";


function createGroqClient() {
  return new Groq();
}


export function callGroqChatCompletion(message: string, data: MatchingDocumentChunk[], documents: ContextDocument[]){
  const groq = createGroqClient();

  try {
    const response = groq.chat.completions.create({
      messages: [
        // Set an optional system message. This sets the behavior of the
        // assistant and can be used to provide specific instructions for
        // how it should behave throughout the conversation.
        {
          role: "system",
          content: "You are a helpful assistant.",
        },
        // Set a user message for the assistant to respond to.
        {
          role: "user",
          content: "Explain the importance of fast language models",
        },
      ],
      model: "openai/gpt-oss-20b",
      max_completion_tokens: 500,
      stream: false,
      citation_options: 'enabled', // for showing sources used in the response
      documents: documents as ContextDocument[]
    });
  } catch (error){

  }

}



