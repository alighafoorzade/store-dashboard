import { z } from "zod";

import { ORDER_STATUSES, type Order } from "../domain";

export const orderSchema: z.ZodType<Order> = z.object({
  id: z.string().regex(/^ORD-\d{4,}$/),
  customer: z.string().trim().min(1).max(120),
  price: z.number().finite().nonnegative(),
  items: z.number().int().positive(),
  status: z.enum(ORDER_STATUSES),
  createdAt: z.iso.datetime({ offset: true }),
});

export const ordersSchema = z
  .array(orderSchema)
  .min(30)
  .superRefine((orders, context) => {
    const ids = new Set<string>();

    orders.forEach((order, index) => {
      if (ids.has(order.id)) {
        context.addIssue({
          code: "custom",
          message: "Order IDs must be unique.",
          path: [index, "id"],
        });
      }
      ids.add(order.id);
    });
  });
