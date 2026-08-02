import { Badge } from "@/components/ui";

import type { Order, OrderSortField, SortDirection } from "../domain";
import { activateOrderFromKeyboard } from "./order-activation";
import { formatOrderDate, formatOrderPrice } from "./order-formatters";
import { getAriaSort } from "./order-sort-aria";

interface OrderTableProps {
  readonly orders: readonly Order[];
  readonly onOpen: (id: string) => void;
  readonly sortBy: OrderSortField;
  readonly sortDirection: SortDirection;
}

export function OrderTable({
  onOpen,
  orders,
  sortBy,
  sortDirection,
}: OrderTableProps) {
  return (
    <div className="border-border bg-surface hidden rounded-xl border md:block">
      <table className="w-full table-fixed text-left text-sm">
        <caption className="sr-only">Order results</caption>
        <thead className="bg-muted/60">
          <tr>
            <th className="w-[16%] px-4 py-3" scope="col">
              Order number
            </th>
            <th
              className="w-[22%] px-4 py-3"
              scope="col"
              aria-sort={getAriaSort("customer", sortBy, sortDirection)}
            >
              Customer
            </th>
            <th
              className="w-[16%] px-4 py-3"
              scope="col"
              aria-sort={getAriaSort("price", sortBy, sortDirection)}
            >
              Total price
            </th>
            <th className="w-[10%] px-4 py-3" scope="col">
              Items
            </th>
            <th className="w-[16%] px-4 py-3" scope="col">
              Status
            </th>
            <th
              className="w-[20%] px-4 py-3"
              scope="col"
              aria-sort={getAriaSort("createdAt", sortBy, sortDirection)}
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {orders.map((order) => (
            <tr
              key={order.id}
              aria-label={`View details for order ${order.id}`}
              className="focus-visible:outline-focus cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-[-2px]"
              onClick={() => onOpen(order.id)}
              onKeyDown={(event) =>
                activateOrderFromKeyboard(event, () => onOpen(order.id))
              }
              tabIndex={0}
            >
              <th className="px-4 py-4 font-semibold" scope="row">
                {order.id}
              </th>
              <td className="px-4 py-4 break-words">{order.customer}</td>
              <td className="px-4 py-4">{formatOrderPrice(order.price)}</td>
              <td className="px-4 py-4">{order.items}</td>
              <td className="px-4 py-4">
                <Badge
                  variant={
                    order.status.toLowerCase() as Lowercase<typeof order.status>
                  }
                >
                  {order.status}
                </Badge>
              </td>
              <td className="px-4 py-4">{formatOrderDate(order.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
