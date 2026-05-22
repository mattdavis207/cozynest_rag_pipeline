"use client";

import { columns } from './columns';
import { DataTable } from './data-table';
import { useCallback, useEffect, useState } from 'react';
import {
  documentsRowSchema,
  type DocumentTableRow,
} from '@/schemas/schemas';


type DocumentsTableProps = {
  refreshKey: number;
};

export function DocumentsTable({ refreshKey }: DocumentsTableProps) {
  // TODO: Fetch document metadata from /api/documents and render real rows.
  // Useful columns: title, source type, status, chunk count, updated date.

  const [data, setData] = useState<DocumentTableRow[]>([])
  
  const fetchDocuments = useCallback(async () => {
    try{
      const response = await fetch("/api/documents");

      const json = await response.json();

      if (!response.ok){
          throw new Error(json.message ?? "Failed to fetch documents.");
      }

      const documents = documentsRowSchema.parse(json.documents);
      const tableData: DocumentTableRow[] = documents.map((document) => ({
        doc_id: document.doc_id,
        title: document.title,
        source_type: document.source_type,
        status: document.status,
        metadata: document.metadata,
        created_at: document.created_at,
        updated_at: document.updated_at,
      }));

      setData(tableData);
    
    } catch (err) {
      console.error("Failed to load documents:", err);
      setData([]);
    }
    
  }, []);


  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDocuments()
  }, [fetchDocuments, refreshKey]);


  return (
    <DataTable columns={columns} data={data} />
  );
}
