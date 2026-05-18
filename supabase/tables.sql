-- CREATE EXTENSION vector, needed for supabase extension vector
drop
  extension if exists vector;
create extension vector
with
  schema extensions;
-- Example: disable the "vector" extension


CREATE DOMAIN file_type_dom AS VARCHAR(15)
CHECK ( VALUE IN ('pdf', 'csv', 'txt'));

CREATE DOMAIN doc_status_dom AS VARCHAR(15)
CHECK ( VALUE IN ('Pending', 'Processing', 'Ready', 'Failed'));

CREATE DOMAIN ingestion_status_dom AS VARCHAR(15)
CHECK ( VALUE IN ('Queued', 'Processing', 'Complete', 'Failed'));


CREATE TABLE DOCUMENTS(
    doc_id SERIAL,
    title TEXT,
    source_type file_type_dom,
    source_uri TEXT,
    content_hash TEXT,
    status doc_status_dom DEFAULT 'pending', 
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT documents_PK PRIMARY KEY(doc_id)
);


CREATE TABLE DOCUMENT_CHUNKS(
    id SERIAL,
    document_id INTEGER,
    chunk_index INTEGER, -- order of chunk inside document
    content TEXT,
    token_count INTEGER,
    metadata JSONB DEFAULT '{}',
    embedding extensions.vector(768),
    embedding_model TEXT, 
    created_at TIMESTAMP,
    CONSTRAINT document_chunks_PK PRIMARY KEY(id),
    CONSTRAINT document_chunks_FK FOREIGN KEY(document_id) REFERENCES DOCUMENTS(doc_id)
        ON DELETE CASCADE
);

/* 
For scalable design: could have separate table for embeddings 
(remove embeddings & embedding_model from DOCUMENT_CHUNKS)

    CREATE TABLE DOCUMENT_EMBEDDINGS(
        id SERIAL PRIMARY KEY,
        chunk_id INTEGER FOREIGN KEY REFERENCES DOCUMENT_CHUNKS(id),
        embedding vector(some dimension),
        embedding_model TEXT,
        embedding_dimensions INTEGER,
        created_at TIMESTAMP
    )
*/

CREATE TABLE INGESTION_LOGS(
    ingestion_id SERIAL,
    document_id INTEGER, 
    source_type file_type_dom, 
    source_uri TEXT,
    status ingestion_status_dom,
    error_message TEXT,
    started_at TIMESTAMP DEFAULT NOW(),
    finished_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    CONSTRAINT ingestions_logs_PK PRIMARY KEY(ingestion_id),
    CONSTRAINT ingestion_logs_FK FOREIGN KEY(document_id) REFERENCES DOCUMENTS(doc_id)
        ON DELETE CASCADE
);

-- index for fast retrieval of chunks for each document
CREATE INDEX idx_chunks_document ON DOCUMENT_CHUNKS(document_id, chunk_index);

-- index for documents based on status
CREATE INDEX idx_documents_status ON DOCUMENTS(status);


