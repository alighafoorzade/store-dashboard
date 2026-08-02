"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createContext, useContext, useState, type ReactNode } from "react";

import type { OrderRepository } from "../domain";
import { mockOrderRepository } from "../infrastructure/mock-orders";

const OrderRepositoryContext = createContext<OrderRepository | null>(null);

export function createOrdersQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        gcTime: 5 * 60 * 1000,
        refetchOnWindowFocus: false,
        retry: false,
        staleTime: 30 * 1000,
      },
    },
  });
}

interface OrdersProviderProps {
  readonly children: ReactNode;
  readonly repository?: OrderRepository;
  readonly queryClient?: QueryClient;
}

export function OrdersProvider({
  children,
  repository = mockOrderRepository,
  queryClient: providedQueryClient,
}: OrdersProviderProps) {
  const [queryClient] = useState(
    () => providedQueryClient ?? createOrdersQueryClient(),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <OrderRepositoryContext.Provider value={repository}>
        {children}
      </OrderRepositoryContext.Provider>
    </QueryClientProvider>
  );
}

export function useOrderRepository(): OrderRepository {
  const repository = useContext(OrderRepositoryContext);

  if (!repository) {
    throw new Error("Order hooks must be used within OrdersProvider.");
  }

  return repository;
}
