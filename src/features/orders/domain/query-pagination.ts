import { ORDERS_PAGE_SIZE, type Order, type PaginatedOrders } from "./order";

export function paginateOrders(
  orders: readonly Order[],
  requestedPage: number,
): Readonly<PaginatedOrders> {
  const totalItems = orders.length;
  const totalPages = Math.ceil(totalItems / ORDERS_PAGE_SIZE);
  const lastAvailablePage = Math.max(totalPages, 1);
  const validRequestedPage =
    Number.isSafeInteger(requestedPage) && requestedPage > 0
      ? requestedPage
      : 1;
  const page = Math.min(validRequestedPage, lastAvailablePage);
  const startIndex = (page - 1) * ORDERS_PAGE_SIZE;

  return Object.freeze({
    items: Object.freeze(
      orders.slice(startIndex, startIndex + ORDERS_PAGE_SIZE),
    ),
    page,
    pageSize: ORDERS_PAGE_SIZE,
    totalItems,
    totalPages,
  });
}
