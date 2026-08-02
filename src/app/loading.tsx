import { AppShell } from "@/components/layout/app-shell";
import { Skeleton } from "@/components/ui";

export default function Loading() {
  return (
    <AppShell>
      <div role="status" aria-live="polite" aria-label="Loading Orders page">
        <span className="sr-only">Loading Orders page…</span>
        <header>
          <Skeleton className="h-5 w-32" />
          <Skeleton className="mt-3 h-10 w-48" />
          <Skeleton className="mt-4 h-5 w-full max-w-xl" />
        </header>
        <section className="border-border bg-surface mt-8 min-h-56 rounded-xl border p-4">
          <Skeleton className="h-6 w-28" />
          <div className="mt-5 grid gap-5 lg:grid-cols-2">
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
            <Skeleton className="h-20 w-full" />
          </div>
        </section>
        <section className="mt-8 min-h-80 space-y-3">
          <Skeleton className="h-7 w-36" />
          {Array.from({ length: 3 }, (_, index) => (
            <Skeleton key={index} className="h-20 w-full" />
          ))}
        </section>
      </div>
    </AppShell>
  );
}
