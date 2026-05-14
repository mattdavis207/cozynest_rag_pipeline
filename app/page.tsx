import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-6 px-6 py-10">
      <section className="space-y-3">
        <h1 className="text-3xl font-semibold tracking-tight">
          CozyNest RAG Pipeline
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Backend-first learning scaffold for an e-commerce support assistant.
        </p>
      </section>

      <div className="grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Customer Chat</CardTitle>
            <CardDescription>
              Placeholder surface for the grounded support assistant.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link className={buttonVariants()} href="/chat">
              Open chat
            </Link>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Admin Console</CardTitle>
            <CardDescription>
              Placeholder surface for documents and ingestion status.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link
              className={buttonVariants({ variant: "secondary" })}
              href="/admin"
            >
              Open admin
            </Link>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
