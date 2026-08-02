import type { OrderDomainError } from "./error";
import type { Order, OrderQuery, PaginatedOrders } from "./order";

export type OrderRepositoryResult<T> =
  | Readonly<{ ok: true; data: T }>
  | Readonly<{ ok: false; error: OrderDomainError }>;

export interface OrderRepository {
  getOrders(
    query: Readonly<OrderQuery>,
  ): Promise<OrderRepositoryResult<PaginatedOrders>>;
  getOrder(id: string): Promise<OrderRepositoryResult<Order>>;
}
