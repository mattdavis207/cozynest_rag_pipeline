import { NextRequest, NextResponse } from "next/server";
import { userMessageSchema } from "@/schemas/schemas";
import { embedTexts } from "@/lib/rag/embed";
import { retrieveRelevantChunks } from "@/lib/rag/retrieve";
import { buildSupportPrompt } from "@/lib/rag/prompt";
import { callGroqChatCompletion } from "@/lib/groq";


// extract sourceId (documentId and chunkIndex) from Groq response
function extractSourceIds(answer: string) {
  const sourceCitationRegex = /[\[【]source:\s*\d+-\d+[\]】]/g;
  const matches = answer.match(sourceCitationRegex) ?? [];

  return matches.map((match) => {
    const sourceId = match.replace(/[\[【]source:\s*|[\]】]/g, "");
    const [documentId, chunkIndex] = sourceId.split("-").map(Number);

    return {
      id: sourceId,
      document_id: documentId,
      chunk_index: chunkIndex,
    };
  });
}

export async function POST(request: NextRequest) {
  // TODO: Build the chat pipeline here:
  // 1. Validate the incoming customer question.
  // 2. Embed the query.
  // 3. Retrieve relevant document chunks from Supabase/pgvector.
  // 4. Build a grounded prompt.
  // 5. Call Groq and return the answer plus sources.
  const body = await request.json();

  const result = userMessageSchema.safeParse(body);

  if(!result.success){
    return NextResponse.json(
      { 
        error: "Invalid schema type",
        code: 400
      },
    )
  }

  if (typeof body.message !== "string"){
    return NextResponse.json(
      { error: "message must be a string."},
      { status: 400 }
    );
  }

  const trimmedMessage = body.message.trim();

  if (!trimmedMessage){
    return NextResponse.json(
      { error: "message is required."},
      { status: 400 }
    )
  }

  const message_embedding = await embedTexts([trimmedMessage]);

  if (!message_embedding[0] || message_embedding[0].length !== 768){
    throw new Error("Missing embedding");
  }

  // get similar embeddings from vectors in db
  const data = await retrieveRelevantChunks(message_embedding[0]);

  console.log("chunks retrieved: ", data);

  // get response from groq using the similar chunks found from retrieval
  const prompt = buildSupportPrompt(trimmedMessage, data);

  const response = await callGroqChatCompletion(prompt);

  // Extract used sources from the raw response before removing citation text.
  const rawAnswer = response?.result ?? "";
  const citedSourceIds = extractSourceIds(rawAnswer);
  const citedSources = prompt.sources.filter((source) =>
    citedSourceIds.some((citedSource) => citedSource.id === source.id),
  );
  const answer = rawAnswer.replace(/\s*[\[【]source:\s*\d+-\d+[\]】]/g, "").trim();
  
  console.log(
    {
      answer,
      sources: citedSources,
    },
    { status: 200 })

  return NextResponse.json(
    {
      answer,
      sources: citedSources,
    },
    { status: 200 },
  );
}
