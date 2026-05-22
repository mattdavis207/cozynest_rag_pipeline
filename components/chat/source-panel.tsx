"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { ChatSource } from "./chat-ui";

type SourcePanelProps = {
  sources?: ChatSource[];
};

function clampScore(score: number | undefined) {
  if (typeof score !== "number" || Number.isNaN(score)) {
    return 0;
  }

  return Math.min(1, Math.max(0, score));
}

function getScoreTone(score: number) {
  if (score >= 0.75) {
    return {
      label: "Strong match",
      textClass: "text-emerald-700",
      barClass: "[&_[data-slot=progress-indicator]]:bg-emerald-500",
    };
  }

  if (score >= 0.45) {
    return {
      label: "Moderate match",
      textClass: "text-amber-700",
      barClass: "[&_[data-slot=progress-indicator]]:bg-amber-500",
    };
  }

  return {
    label: "Weak match",
    textClass: "text-red-700",
    barClass: "[&_[data-slot=progress-indicator]]:bg-red-500",
  };
}

function formatMetadata(metadata: Record<string, unknown> | undefined) {
  if (!metadata || Object.keys(metadata).length === 0) {
    return "None";
  }

  return JSON.stringify(metadata, null, 2);
}

export function SourcePanel({ sources }: SourcePanelProps) {
  const visibleSources = sources ?? [];

  return (
    <Card className="w-full border-border/70 shadow-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-base">Sources Used</CardTitle>
        <CardDescription>
          Retrieved chunks cited by the assistant response.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-3">
        {visibleSources.length === 0 ? (
          <div className="rounded-md border border-dashed px-4 py-6 text-center text-sm text-muted-foreground">
            No cited sources yet.
          </div>
        ) : (
          visibleSources.map((source, index) => {
            const score = clampScore(source.similarity_score);
            const scorePercent = Math.round(score * 100);
            const tone = getScoreTone(score);

            return (
              <Card
                key={source.id ?? `${source.title}-${source.chunk_index}-${index}`}
                className="overflow-hidden border-border/70 bg-muted/20 shadow-none"
              >
                <CardHeader className="space-y-3 pb-3">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="min-w-0 space-y-1">
                      <CardTitle className="truncate text-sm">
                        {source.title ?? "Untitled source"}
                      </CardTitle>
                      <CardDescription className="flex flex-wrap gap-2 text-xs">
                        <span className="rounded-md bg-background px-2 py-1 font-medium uppercase text-foreground">
                          {source.source_type}
                        </span>
                        <span className="rounded-md bg-background px-2 py-1">
                          Chunk {source.chunk_index}
                        </span>
                        {source.id && (
                          <span className="rounded-md bg-background px-2 py-1">
                            {source.id}
                          </span>
                        )}
                      </CardDescription>
                    </div>

                    <div
                      className={cn(
                        "rounded-md bg-background px-2.5 py-1 text-xs font-medium",
                        tone.textClass,
                      )}
                    >
                      {scorePercent}% {tone.label}
                    </div>
                  </div>

                  <Progress
                    value={scorePercent}
                    className={cn(
                      "[&_[data-slot=progress-track]]:h-2",
                      tone.barClass,
                    )}
                  />
                </CardHeader>

                <CardContent className="space-y-3 pt-0 text-sm">
                  <div>
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                      Content
                    </p>
                    <p className="max-h-32 overflow-y-auto rounded-md bg-background p-3 leading-6 text-foreground">
                      {source.content}
                    </p>
                  </div>

                  <div>
                    <p className="mb-1 text-xs font-medium uppercase text-muted-foreground">
                      Metadata
                    </p>
                    <pre className="max-h-28 overflow-auto rounded-md bg-background p-3 text-xs leading-5 text-muted-foreground">
                      {formatMetadata(source.metadata)}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
