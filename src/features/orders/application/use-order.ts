"use client";

import { useQuery, type UseQueryResult } from "@tanstack/react-query";

import type { Order, OrderDomainError } from "../domain";
import { orderQueryKeys } from "./order-query-keys";
import { useOrderRepository } from "./orders-provider";
import { unwrapRepositoryResult } from "./repository-query";

export function useOrder(
  id: string | null,
): UseQueryResult<Order, OrderDomainError> {
  const repository = useOrderRepository();
  const orderId = id ?? "";

  return useQuery({
    queryKey: orderQueryKeys.detail(orderId),
    enabled: orderId.length > 0,
    queryFn: async () =>
      unwrapRepositoryResult(await repository.getOrder(orderId)),
  });
}
