"use client";

import { AlertTriangle } from "lucide-react";

import { AppShell } from "@/components/layout/app-shell";
import { Button } from "@/components/ui";

interface ErrorBoundaryProps {
  readonly error: Error & { digest?: string };
  readonly unstable_retry: () => void;
}

export default function RouteError({ unstable_retry }: ErrorBoundaryProps) {
  return (
    <AppShell>
      <section
        role="alert"
        aria-labelledby="route-error-title"
        className="border-danger/30 bg-surface mx-auto max-w-xl rounded-xl border p-8 text-center shadow-sm"
      >
        <AlertTriangle
          aria-hidden="true"
          className="text-danger mx-auto size-10"
        />
        <h1 id="route-error-title" className="mt-4 text-2xl font-semibold">
          Orders could not be displayed
        </h1>
        <p className="text-muted-foreground mt-2 text-sm leading-6">
          Something unexpected happened. Try loading this workspace again.
        </p>
        <Button className="mt-6" onClick={unstable_retry}>
          Try again
        </Button>
      </section>
    </AppShell>
  );
}
