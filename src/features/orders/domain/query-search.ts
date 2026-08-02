import type { Order, OrderStatus } from "./order";

export function searchOrders(
  orders: readonly Order[],
  search: string,
): readonly Order[] {
  const normalizedSearch = search.trim().toLocaleLowerCase("en-US");
  if (normalizedSearch.length === 0) return orders;

  return orders.filter(
    (order) =>
      order.id.toLocaleLowerCase("en-US").includes(normalizedSearch) ||
      order.customer.toLocaleLowerCase("en-US").includes(normalizedSearch),
  );
}

export function filterOrders(
  orders: readonly Order[],
  statuses: readonly OrderStatus[],
): readonly Order[] {
  if (statuses.length === 0) return orders;

  const selectedStatuses = new Set(statuses);
  return orders.filter((order) => selectedStatuses.has(order.status));
}
