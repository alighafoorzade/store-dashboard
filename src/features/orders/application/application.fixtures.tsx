import type { PropsWithChildren } from "react";

import {
  ORDERS_PAGE_SIZE,
  type Order,
  type OrderRepository,
  type OrderRepositoryResult,
  type PaginatedOrders,
} from "../domain";
import { OrdersProvider } from "./orders-provider";

export const order: Order = Object.freeze({
  id: "ORD-1001",
  customer: "Avery Johnson",
  price: 129.95,
  items: 3,
  status: "Processing",
  createdAt: "2026-07-31T10:30:00.000Z",
});

export const page: PaginatedOrders = Object.freeze({
  items: Object.freeze([order]),
  page: 1,
  pageSize: ORDERS_PAGE_SIZE,
  totalItems: 1,
  totalPages: 1,
});

interface RepositoryResults {
  readonly orders?: OrderRepositoryResult<PaginatedOrders>;
  readonly order?: OrderRepositoryResult<Order>;
}

export function createRepository(
  results: RepositoryResults = {},
): OrderRepository {
  return {
    getOrders: async () => results.orders ?? { ok: true, data: page },
    getOrder: async () => results.order ?? { ok: true, data: order },
  };
}

export function createWrapper(repository: OrderRepository) {
  return function Wrapper({ children }: PropsWithChildren) {
    return <OrdersProvider repository={repository}>{children}</OrdersProvider>;
  };
}
