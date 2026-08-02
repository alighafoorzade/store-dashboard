import type { Order } from "./order";

export const orders = Object.freeze([
  {
    id: "ORD-1001",
    customer: "Zoë Adams",
    price: 120,
    items: 2,
    status: "Pending",
    createdAt: "2026-07-06T08:00:00.000Z",
  },
  {
    id: "ORD-1002",
    customer: "avery Johnson",
    price: 75,
    items: 1,
    status: "Processing",
    createdAt: "2026-07-04T08:00:00.000Z",
  },
  {
    id: "ORD-1003",
    customer: "Mina Patel",
    price: 75,
    items: 4,
    status: "Completed",
    createdAt: "2026-07-05T08:00:00.000Z",
  },
  {
    id: "ORD-1004",
    customer: "Avery Stone",
    price: 240,
    items: 3,
    status: "Cancelled",
    createdAt: "2026-07-02T08:00:00.000Z",
  },
] as const satisfies readonly Order[]);

export const ids = (items: readonly Order[]) => items.map(({ id }) => id);
