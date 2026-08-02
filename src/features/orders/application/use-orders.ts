"use client";

import {
  keepPreviousData,
  useQuery,
  type UseQueryResult,
} from "@tanstack/react-query";

import {
  normalizeOrderQuery,
  type OrderDomainError,
  type OrderQueryInput,
  type PaginatedOrders,
} from "../domain";
import { orderQueryKeys } from "./order-query-keys";
import { useOrderRepository } from "./orders-provider";
import { unwrapRepositoryResult } from "./repository-query";

export function useOrders(
  input: Readonly<OrderQueryInput> = {},
): UseQueryResult<PaginatedOrders, OrderDomainError> {
  const repository = useOrderRepository();
  const query = normalizeOrderQuery(input);

  return useQuery({
    queryKey: orderQueryKeys.list(query),
    placeholderData: keepPreviousData,
    queryFn: async () =>
      unwrapRepositoryResult(await repository.getOrders(query)),
  });
}
