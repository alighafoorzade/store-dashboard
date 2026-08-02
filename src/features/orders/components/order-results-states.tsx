import { AlertTriangle, PackageSearch } from "lucide-react";

import { Button, EmptyState, Skeleton } from "@/components/ui";

export function OrderResultsLoading() {
  return (
    <div role="status" aria-label="Loading orders" className="space-y-3">
      <span className="sr-only">Loading orders…</span>
      {Array.from({ length: 3 }, (_, index) => (
        <Skeleton key={index} className="h-20 w-full" />
      ))}
    </div>
  );
}

export function OrderResultsEmpty({
  filtered,
}: {
  readonly filtered: boolean;
}) {
  return (
    <EmptyState
      icon={<PackageSearch aria-hidden="true" className="size-8" />}
      title={filtered ? "No matching orders" : "No orders available"}
      description={
        filtered
          ? "Try clearing or changing your search and filters."
          : "Orders will appear here when they become available."
      }
    />
  );
}

export function OrderResultsError({ retry }: { readonly retry: () => void }) {
  return (
    <EmptyState
      icon={<AlertTriangle aria-hidden="true" className="size-8" />}
      title="Orders could not be loaded"
      description="Try again. If the problem continues, contact support."
      action={<Button onClick={retry}>Try again</Button>}
    />
  );
}
