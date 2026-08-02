import type { Order, PaginatedOrders } from "./order";
import {
  normalizeOrderQuery,
  type OrderQueryInput,
} from "./query-normalization";
import { paginateOrders } from "./query-pagination";
import { filterOrders, searchOrders } from "./query-search";
import { sortOrders } from "./query-sort";

export function queryOrders(
  orders: readonly Order[],
  input: Readonly<OrderQueryInput> = {},
): Readonly<PaginatedOrders> {
  const query = normalizeOrderQuery(input);
  const searchedOrders = searchOrders(orders, query.search);
  const filteredOrders = filterOrders(searchedOrders, query.statuses);
  const sortedOrders = sortOrders(
    filteredOrders,
    query.sortBy,
    query.sortDirection,
  );

  return paginateOrders(sortedOrders, query.page);
}
