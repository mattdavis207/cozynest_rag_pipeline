import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function ChatBox() {
  // TODO: Add client-side chat state and call /api/chat when you are ready.
  // Keep the first implementation simple: message input, loading state, answer,
  // and surfaced citations from the API response.
  return (
    <Card className="min-h-[520px]">
      <CardHeader>
        <CardTitle>Support Chat</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="rounded-md border border-dashed p-4 text-sm text-muted-foreground">
          TODO: Render customer and assistant messages here.
        </div>
        <Textarea
          disabled
          placeholder="Chat input placeholder"
          rows={5}
        />
      </CardContent>
      <CardFooter>
        <Button disabled>Send</Button>
      </CardFooter>
    </Card>
  );
}
