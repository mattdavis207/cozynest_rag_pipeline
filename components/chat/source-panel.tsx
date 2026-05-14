import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function SourcePanel() {
  // TODO: Display retrieved chunks, document titles, similarity scores, and
  // links to source metadata returned by /api/chat.
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sources</CardTitle>
        <CardDescription>Retrieved context will appear here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          TODO: Add source cards after retrieval is implemented.
        </div>
      </CardContent>
    </Card>
  );
}
