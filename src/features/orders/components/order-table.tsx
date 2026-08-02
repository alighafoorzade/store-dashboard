import { Badge } from "@/components/ui";

import type { Order, OrderSortField, SortDirection } from "../domain";
import { formatOrderDate, formatOrderPrice } from "./order-formatters";

interface OrderTableProps {
  readonly orders: readonly Order[];
  readonly sortBy: OrderSortField;
  readonly sortDirection: SortDirection;
}

function ariaSort(
  field: OrderSortField,
  active: OrderSortField,
  direction: SortDirection,
) {
  if (field !== active) return "none" as const;
  return direction === "asc" ? ("ascending" as const) : ("descending" as const);
}

export function OrderTable({ orders, sortBy, sortDirection }: OrderTableProps) {
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
              aria-sort={ariaSort("customer", sortBy, sortDirection)}
            >
              Customer
            </th>
            <th
              className="w-[16%] px-4 py-3"
              scope="col"
              aria-sort={ariaSort("price", sortBy, sortDirection)}
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
              aria-sort={ariaSort("createdAt", sortBy, sortDirection)}
            >
              Created
            </th>
          </tr>
        </thead>
        <tbody className="divide-border divide-y">
          {orders.map((order) => (
            <tr key={order.id}>
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
