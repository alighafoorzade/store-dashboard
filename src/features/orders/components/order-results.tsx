"use client";

import { OrdersProvider, useOrderQueryState, useOrders } from "../application";
import { OrderResultsView } from "./order-results-view";

function OrderResultsContent() {
  const { query } = useOrderQueryState();
  const orders = useOrders(query);

  return (
    <OrderResultsView
      data={orders.data}
      error={orders.isError}
      loading={orders.isPending}
      query={query}
      retry={() => void orders.refetch()}
    />
  );
}

export function OrderResults() {
  return (
    <OrdersProvider>
      <OrderResultsContent />
    </OrdersProvider>
  );
}
