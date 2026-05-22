"use client"

import { DocumentIngestion } from "@/components/admin/document-ingestion";
import { DocumentsTable } from "@/components/admin/documents-table";
import { IngestionLog } from "@/components/admin/ingestion-log";
import { useState } from "react";

export default function AdminPage() {

  const [refreshKey, setRefreshKey] = useState(0);

  // rerenders all components on ingestion
  function refreshAdminData(){
    setRefreshKey((key) => key + 1);
  }

  return (
    <main className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Admin</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Upload documents, inspect indexed records, and review ingestion status.
        </p>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.4fr)]">
        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <h2 className="text-base font-semibold">Document Ingestion</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Add CSV, PDF, or TXT files to the knowledge base.
            </p>
            <div className="mt-5">
              <DocumentIngestion onIngested={refreshAdminData} />
            </div>
          </div>

          <div className="rounded-lg border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-base font-semibold">Documents</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Current document records stored in Supabase.
              </p>
            </div>
            <DocumentsTable refreshKey={refreshKey} />
          </div>
        </div>

        <aside className="rounded-lg border bg-card p-5 shadow-sm">
          <div className="mb-4">
            <h2 className="text-base font-semibold">Ingestion Logs</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Scroll through recent ingestion attempts and errors.
            </p>
          </div>
          <div className="max-h-[calc(100vh-14rem)] overflow-y-auto pr-2">
            <IngestionLog refreshKey={refreshKey} />
          </div>
        </aside>
      </section>
    </main>
  );
}
