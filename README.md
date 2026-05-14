# cozynest_rag_pipeline

This is my take on a realistic AI RAG support assistant for an e-commerce store. The core use case of this project is for store owners who upload product catalogs, FAQs, and policy docs which enables the AI assistant to answer customer questions with grounded product/support info.

## Project Overview

This repo is currently scaffolded as a backend/RAG-focused learning project using:

- Next.js App Router
- TypeScript
- Supabase/Postgres with pgvector
- shadcn/ui
- Tailwind CSS
- Groq for chat models
- Gemini for embeddings
- n8n later for Google Drive ingestion automation

The current code intentionally does not implement the RAG pipeline. API routes, model clients, retrieval helpers, ingestion helpers, and prompt helpers are placeholders with TODO comments so the core SQL and RAG logic can be implemented manually.

## Development

Install dependencies:

```bash
pnpm install
```

Start the Next.js development server:

```bash
pnpm dev
```

Run TypeScript checks:

```bash
pnpm typecheck
```

## Environment Variables

Copy `.env.example` to `.env.local` and fill in values as you add each integration:

- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `GROQ_API_KEY`
- `GEMINI_API_KEY`
- `OPENAI_API_KEY` if you experiment with OpenAI-compatible tooling later

## Learning Roadmap

1. Design the Supabase schema and enable `pgvector`.
2. Build document ingestion for product CSVs, FAQs, and policy docs.
3. Implement chunking with metadata for citations.
4. Generate Gemini embeddings and store vectors in Postgres.
5. Implement vector retrieval, then experiment with hybrid search.
6. Build grounded prompts for customer support answers.
7. Wire `/api/chat` to Groq and return sources.
8. Add n8n automation for Google Drive ingestion.

## Scaffolded Areas

- `app/api/chat/route.ts`: chat endpoint placeholder
- `app/api/ingest/route.ts`: ingestion endpoint placeholder
- `app/api/documents/route.ts`: document metadata endpoint placeholder
- `lib/rag/*`: chunking, embedding, retrieval, prompt, and ingestion placeholders
- `lib/supabase/server.ts`: Supabase server client placeholder
- `lib/groq.ts`: Groq client placeholder
- `supabase/README.md`: notes for future Supabase work
