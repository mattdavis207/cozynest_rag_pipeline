# RAG Pipeline Reference Notes
This file will include all the relevant details I've learned about RAG throughout building this project.

---

## System 1: Ingestion Pipeline
### This prepares knowledge for retrieval from the AI system

Structure of the flow: 
```
Documents Uploaded
    ↓
Extract Text
    ↓
Chunk Text
    ↓
Generate Embeddings
    ↓
Store in Vector DB
```


## System 2: Retrieval and Chat Pipeline
### This is where the LLM retrieves relevant context based on the user question

Structure of the flow:
```
User Question
    ↓
Generate Query Embedding
    ↓
Vector Similarity Search
    ↓
Retrieve Relevant Chunks
    ↓
Build Prompt
    ↓
LLM Generates Grounded Answer
```

Here are some chunk retrieval strategies: 
- Semantic search (vector search)
- Hybrid search (combining keyword and vector)
- Parent-child/hierarchical retrieval (retrieving small chunks but feeding the LLM large contexts)
- Re-ranking (ordering results by relevance)

--- 

## Vector Query Search 



**Heirarchical Navigable Small Worlds (HNSW)**

Research Paper- [https://arxiv.org/pdf/1603.09320](https://arxiv.org/pdf/1603.09320)

Video Explanation- [https://www.youtube.com/watch?v=77QH0Y2PYKg](https://www.youtube.com/watch?v=77QH0Y2PYKg)

The Algorithm basically combines the concepts of approximate nearest neighbor graph networks (Navigable small worlds) and skip link lists to create a multilayered (hierarchical) structure in which vectors are chosen cautiously as the algorithm works through the layers to avoid searching too many nodes. 

---

## Postgres with Supabase: pgvector video
https://www.youtube.com/watch?v=cyPZsbO5i5U

---

## Gemini Embedding Model

Use gemini-embedding-2

[https://ai.google.dev/gemini-api/docs/embeddings#multimodal](https://ai.google.dev/gemini-api/docs/embeddings#multimodal)

Vector Dimensionality Tradeoffs:
768
- Smaller storage
- Faster inserts/searches
- Cheaper/faster indexing
- Easier while learning
- Usually good enough for product docs, FAQs, policies, support content

1536
- Better semantic resolution
- More storage and slower search than 768
- Good middle ground for production-quality retrieval
- Useful if your chunks are nuanced, long, or domain-heavy

3072
- Highest resolution
- Largest storage/index cost
- Slowest searches
- Usually overkill for a first e-commerce support RAG project
