import type { Order, OrderSortField, SortDirection } from "./order";

function compareOrders(
  left: Readonly<Order>,
  right: Readonly<Order>,
  sortBy: OrderSortField,
): number {
  switch (sortBy) {
    case "price":
      return left.price - right.price;
    case "customer":
      return left.customer.localeCompare(right.customer, "en-US", {
        sensitivity: "base",
      });
    case "createdAt":
      return left.createdAt.localeCompare(right.createdAt);
  }
}

export function sortOrders(
  orders: readonly Order[],
  sortBy: OrderSortField,
  direction: SortDirection,
): readonly Order[] {
  const directionMultiplier = direction === "asc" ? 1 : -1;

  return orders
    .map((order, index) => ({ order, index }))
    .sort((left, right) => {
      const comparison =
        compareOrders(left.order, right.order, sortBy) * directionMultiplier;
      return comparison === 0 ? left.index - right.index : comparison;
    })
    .map(({ order }) => order);
}
