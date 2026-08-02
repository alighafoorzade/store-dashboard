import ordersJson from "../../../mocks/orders.json";
import type { OrderRepository } from "../domain";
import { MockOrderRepository } from "./mock-order-repository";

export const mockOrderRepository: OrderRepository = new MockOrderRepository(
  ordersJson,
);
