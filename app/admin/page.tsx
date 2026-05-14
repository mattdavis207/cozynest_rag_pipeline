import { DocumentsTable } from "@/components/admin/documents-table";
import { IngestionLog } from "@/components/admin/ingestion-log";

export default function AdminPage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-6 px-6 py-8">
      <section>
        <h1 className="text-2xl font-semibold tracking-tight">Admin Console</h1>
        <p className="text-muted-foreground">
          Document ingestion and knowledge-base management placeholders.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <DocumentsTable />
        <IngestionLog />
      </div>
    </main>
  );
}
