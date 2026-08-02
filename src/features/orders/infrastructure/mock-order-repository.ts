import type {
  Order,
  OrderQuery,
  OrderRepository,
  OrderRepositoryResult,
  PaginatedOrders,
} from "../domain";
import { queryOrders } from "../domain";
import { ordersSchema } from "./order-schema";
import {
  createRepositoryDelay,
  type RepositoryDelay,
} from "./repository-delay";
import { repositoryFailure, repositorySuccess } from "./repository-result";

type RepositoryOperation<T> = (
  orders: readonly Order[],
) => OrderRepositoryResult<T>;

export class MockOrderRepository implements OrderRepository {
  constructor(
    private readonly rawOrders: unknown,
    private readonly delay: RepositoryDelay = createRepositoryDelay(),
  ) {}

  getOrders(
    query: Readonly<OrderQuery>,
  ): Promise<OrderRepositoryResult<PaginatedOrders>> {
    return this.withValidatedOrders((orders) =>
      repositorySuccess(queryOrders(orders, query)),
    );
  }

  getOrder(id: string): Promise<OrderRepositoryResult<Order>> {
    return this.withValidatedOrders((orders) => {
      const order = orders.find((candidate) => candidate.id === id);

      return order
        ? repositorySuccess(order)
        : repositoryFailure("NOT_FOUND", "Order not found.");
    });
  }

  private async withValidatedOrders<T>(
    operation: RepositoryOperation<T>,
  ): Promise<OrderRepositoryResult<T>> {
    try {
      await this.delay();
      const parsedOrders = ordersSchema.safeParse(this.rawOrders);

      if (!parsedOrders.success) {
        return repositoryFailure("INVALID_DATA", "Order data is unavailable.");
      }

      return operation(parsedOrders.data);
    } catch {
      return repositoryFailure("UNEXPECTED", "Unable to load orders.");
    }
  }
}
