import { normalizeOrderQuery, type OrderQueryInput } from "../domain";

export const orderQueryKeys = Object.freeze({
  all: ["orders"] as const,
  lists: () => [...orderQueryKeys.all, "list"] as const,
  list: (input: Readonly<OrderQueryInput> = {}) =>
    [...orderQueryKeys.lists(), normalizeOrderQuery(input)] as const,
  details: () => [...orderQueryKeys.all, "detail"] as const,
  detail: (id: string) => [...orderQueryKeys.details(), id] as const,
});
