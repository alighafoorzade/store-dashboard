import { Badge, Skeleton } from "@/components/ui";

import type { Order } from "../domain";
import { formatOrderDate, formatOrderPrice } from "./order-formatters";

export function OrderDetailsLoading() {
  return (
    <div role="status" aria-label="Loading order details">
      <Skeleton className="h-40 w-full" />
    </div>
  );
}

export function OrderDetailsError() {
  return (
    <div
      role="alert"
      className="border-danger/30 bg-danger/5 rounded-lg border p-4"
    >
      <h3 className="font-semibold">Order details unavailable</h3>
      <p className="text-muted-foreground mt-1 text-sm">
        This order could not be found. Close the panel and try another order.
      </p>
    </div>
  );
}

export function OrderDetailsContent({ order }: { readonly order: Order }) {
  const details = [
    ["Order number", order.id],
    ["Customer", order.customer],
    ["Total price", formatOrderPrice(order.price)],
    ["Item count", String(order.items)],
    ["Created date", formatOrderDate(order.createdAt)],
  ];
  return (
    <div className="space-y-5">
      <Badge
        variant={order.status.toLowerCase() as Lowercase<typeof order.status>}
      >
        {order.status}
      </Badge>
      <dl className="divide-border divide-y">
        {details.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-4 py-3 text-sm">
            <dt className="text-muted-foreground">{label}</dt>
            <dd className="text-right font-medium break-words">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
