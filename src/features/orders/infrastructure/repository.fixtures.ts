import ordersJson from "../../../mocks/orders.json";
import { normalizeOrderQuery } from "../domain";
import { MockOrderRepository } from "./mock-order-repository";

export const immediateDelay = () => Promise.resolve();

export const createRepository = (data: unknown = ordersJson) =>
  new MockOrderRepository(data, immediateDelay);

export const defaultQuery = normalizeOrderQuery();
