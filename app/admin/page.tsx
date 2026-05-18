
import { DocumentIngestion } from "@/components/admin/document-ingestion";

export default function AdminPage() {
  // TODO: Wire this page to document and ingestion components after the data
  // model and admin API routes exist.
  return (
    <main>
      <h1 className="text-2xl font-semibold">Admin</h1>
      <p className="mt-2 text-muted-foreground">
        TODO: Add document management after you create the Supabase schema.
      </p>

      <DocumentIngestion/>

    </main>
  );
}
