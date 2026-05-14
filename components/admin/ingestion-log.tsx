import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function IngestionLog() {
  // TODO: Render ingestion events from Supabase once you create the tables.
  // Track file name, trigger source, status, errors, and timestamps.
  return (
    <Card>
      <CardHeader>
        <CardTitle>Ingestion Log</CardTitle>
        <CardDescription>Automation status placeholder.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          TODO: Add ingestion events after the ingestion route exists.
        </div>
      </CardContent>
    </Card>
  );
}
