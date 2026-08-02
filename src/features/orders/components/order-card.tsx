import { Badge } from "@/components/ui";

import type { Order } from "../domain";
import { activateOrderFromKeyboard } from "./order-activation";
import { formatOrderDate, formatOrderPrice } from "./order-formatters";

interface OrderCardProps {
  readonly onOpen: (id: string) => void;
  readonly order: Order;
}

export function OrderCard({ onOpen, order }: OrderCardProps) {
  const open = () => onOpen(order.id);
  return (
    <div
      aria-label={`View details for order ${order.id}`}
      className="border-border bg-surface focus-visible:outline-focus cursor-pointer rounded-xl border p-4 shadow-sm focus-visible:outline-2 focus-visible:outline-offset-2"
      onClick={open}
      onKeyDown={(event) => activateOrderFromKeyboard(event, open)}
      role="button"
      tabIndex={0}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{order.id}</h3>
          <p className="text-muted-foreground mt-1 text-sm">{order.customer}</p>
        </div>
        <Badge
          variant={order.status.toLowerCase() as Lowercase<typeof order.status>}
        >
          {order.status}
        </Badge>
      </div>
      <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <dt className="text-muted-foreground">Total price</dt>
          <dd className="mt-1 font-medium">{formatOrderPrice(order.price)}</dd>
        </div>
        <div>
          <dt className="text-muted-foreground">Items</dt>
          <dd className="mt-1 font-medium">{order.items}</dd>
        </div>
        <div className="col-span-2">
          <dt className="text-muted-foreground">Created</dt>
          <dd className="mt-1 font-medium">
            {formatOrderDate(order.createdAt)}
          </dd>
        </div>
      </dl>
    </div>
  );
}
