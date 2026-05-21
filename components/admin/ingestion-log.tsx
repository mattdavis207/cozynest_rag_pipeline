"use client";

import { useCallback, useEffect, useState } from "react";
import {
  ingestionLogRowsSchema,
  type IngestionLogTableRow,
} from "@/schemas/schemas";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

function formatDate(value: string | null) {
  if (!value) {
    return "Not finished";
  }

  return new Date(value).toLocaleString();
}

function getStatusStyles(status: IngestionLogTableRow["status"]) {
  if (status === "Complete") {
    return "border-emerald-200 bg-emerald-50 text-emerald-950";
  }

  if (status === "Failed") {
    return "border-red-200 bg-red-50 text-red-950";
  }

  return "border-amber-200 bg-amber-50 text-amber-950";
}

function getStatusBadgeStyles(status: IngestionLogTableRow["status"]) {
  if (status === "Complete") {
    return "bg-emerald-100 text-emerald-800 ring-emerald-200";
  }

  if (status === "Failed") {
    return "bg-red-100 text-red-800 ring-red-200";
  }

  return "bg-amber-100 text-amber-800 ring-amber-200";
}

export function IngestionLog() {
  const [data, setData] = useState<IngestionLogTableRow[]>([]);

  const fetchIngestionLogs = useCallback(async () => {
    try {
      const response = await fetch("/api/logs");
      const json = await response.json();

      if (!response.ok) {
        throw new Error(json.message ?? "Failed to fetch ingestion logs.");
      }

      const logs = ingestionLogRowsSchema.parse(json.logs);
      const tableData: IngestionLogTableRow[] = logs.map((log) => ({
        document_id: log.document_id,
        source_type: log.source_type,
        status: log.status,
        error_message: log.error_message,
        started_at: log.started_at,
        finished_at: log.finished_at,
        created_at: log.created_at,
      }));

      setData(tableData);
    } catch (err) {
      console.error("Failed to load ingestion logs:", err);
      setData([]);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchIngestionLogs();
  }, [fetchIngestionLogs]);

  return (
    <Card className="w-full">
      <CardContent className="space-y-3">
        {data.length === 0 ? (
          <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
            No ingestion logs found.
          </div>
        ) : (
          data.map((log, index) => (
            <div
              key={`${log.document_id ?? "unlinked"}-${log.created_at}-${index}`}
              className={cn(
                "rounded-md border p-4 text-sm",
                getStatusStyles(log.status)
              )}
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="font-semibold">
                    Document {log.document_id ?? "unlinked"}
                  </p>
                  <p className="mt-1 text-xs opacity-80">
                    Source: {log.source_type.toUpperCase()}
                  </p>
                </div>

                <span
                  className={cn(
                    "rounded-full px-2 py-1 text-xs font-medium ring-1",
                    getStatusBadgeStyles(log.status)
                  )}
                >
                  {log.status}
                </span>
              </div>

              <dl className="mt-4 grid gap-3 sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-medium opacity-70">Started</dt>
                  <dd className="mt-1">{formatDate(log.started_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium opacity-70">Finished</dt>
                  <dd className="mt-1">{formatDate(log.finished_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium opacity-70">Created</dt>
                  <dd className="mt-1">{formatDate(log.created_at)}</dd>
                </div>
                <div>
                  <dt className="text-xs font-medium opacity-70">Error</dt>
                  <dd className="mt-1 break-words">
                    {log.error_message ?? "None"}
                  </dd>
                </div>
              </dl>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
