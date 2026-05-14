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

