import { describe, expect, it } from "vitest";

import ordersJson from "../../../mocks/orders.json";
import { ORDER_STATUSES } from "../domain";
import { orderSchema, ordersSchema } from "./order-schema";

const validOrder = {
  id: "ORD-9001",
  customer: "Test Customer",
  price: 49.95,
  items: 2,
  status: "Pending",
  createdAt: "2026-08-01T12:00:00.000Z",
} as const;

describe("mock order dataset", () => {
  it("contains at least 30 valid orders with unique IDs", () => {
    const parsedOrders = ordersSchema.parse(ordersJson);
    const ids = parsedOrders.map(({ id }) => id);

    expect(parsedOrders.length).toBeGreaterThanOrEqual(30);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("covers every supported order status", () => {
    const parsedOrders = ordersSchema.parse(ordersJson);
    const statuses = new Set(parsedOrders.map(({ status }) => status));

    expect(statuses).toEqual(new Set(ORDER_STATUSES));
  });
});

describe("orderSchema", () => {
  it.each([
    ["status", { ...validOrder, status: "Refunded" }],
    ["date", { ...validOrder, createdAt: "yesterday" }],
    ["price", { ...validOrder, price: -0.01 }],
    ["item count", { ...validOrder, items: 0 }],
  ])("rejects an invalid %s", (_field, order) => {
    expect(orderSchema.safeParse(order).success).toBe(false);
  });

  it("rejects duplicate IDs across the dataset", () => {
    expect(ordersSchema.safeParse(Array(30).fill(validOrder)).success).toBe(
      false,
    );
  });

  it("rejects datasets with fewer than 30 records", () => {
    expect(ordersSchema.safeParse([validOrder]).success).toBe(false);
  });
});
