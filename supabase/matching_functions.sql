
CREATE OR REPLACE FUNCTION match_document_chunks(question_embedding extensions.vector(768), match_count INTEGER DEFAULT 3)
RETURNS TABLE (
  document_id INTEGER,
  chunk_index INTEGER,
  content TEXT,
  token_count INTEGER,
  metadata JSONB,
  title TEXT,
  source_type file_type_dom,
  source_uri TEXT,
  similarity_score DOUBLE PRECISION
)
LANGUAGE plpgsql
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dc.document_id,
        dc.chunk_index,
        dc.content,
        dc.token_count,
        dc.metadata,
        d.title,
        d.source_type,
        d.source_uri,
        1 - (embedding <=> question_embedding) AS similarity_score -- cosine similarity score between two embedding vectors
    FROM document_chunks AS dc
        JOIN documents AS d ON (dc.document_id = d.doc_id)
        WHERE dc.embedding IS NOT NULL AND d.status = 'Ready'
    ORDER BY embedding <=> question_embedding
    LIMIT match_count;
END;
$$;