"use client"

import { ColumnDef } from "@tanstack/react-table"
import { useState } from "react"
import type { DocumentTableRow } from "@/schemas/schemas"

// expandable metadata cell
function MetadataCell({ metadata }: { metadata: Record<string, unknown> }) {
    const [isExpanded, setIsExpanded] = useState(false);
  
    const text = JSON.stringify(metadata, null, 2);
  
    return (
      <button
        type="button"
        onClick={() => setIsExpanded((value) => !value)}
        className="max-w-[420px] text-left font-mono text-xs text-muted-foreground"
      >
        {isExpanded ? (
          <pre className="whitespace-pre-wrap break-words rounded-md bg-muted p-2">
            {text}
          </pre>
        ) : (
          <span className="block max-w-[260px] truncate">{JSON.stringify(metadata)}</span>
        )}
      </button>
    );
  }

export const columns: ColumnDef<DocumentTableRow>[] = [
  {
    accessorKey: "doc_id",
    header: "ID",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "source_type",
    header: "Source",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "metadata",
    header: "Metadata",
    cell: ({ row }) => {
      const metadata = row.getValue("metadata") as Record<string, unknown>

      return (
        <MetadataCell metadata={metadata}/>
      )
    },
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      const value = row.getValue("created_at") as string

      return new Date(value).toLocaleString()
    },
  },
  {
    accessorKey: "updated_at",
    header: "Updated",
    cell: ({ row }) => {
      const value = row.getValue("updated_at") as string

      return new Date(value).toLocaleString()
    },
  },
]
