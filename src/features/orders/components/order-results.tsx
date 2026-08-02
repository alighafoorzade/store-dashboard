"use client";

import { useState } from "react";

import {
  OrdersProvider,
  useOrder,
  useOrderQueryState,
  useOrders,
} from "../application";
import { OrderDetailsDrawer } from "./order-details-drawer";
import { OrderResultsView } from "./order-results-view";

function OrderResultsContent() {
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const { query, setPage } = useOrderQueryState();
  const orders = useOrders(query);
  const selectedOrder = useOrder(selectedOrderId);

  return (
    <>
      <OrderResultsView
        data={orders.data}
        error={orders.isError}
        loading={orders.isPending}
        onOpenOrder={setSelectedOrderId}
        onPageChange={setPage}
        query={query}
        retry={() => void orders.refetch()}
      />
      <OrderDetailsDrawer
        error={selectedOrder.isError}
        loading={selectedOrder.isPending && selectedOrderId !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedOrderId(null);
        }}
        open={selectedOrderId !== null}
        order={selectedOrder.data}
      />
    </>
  );
}

export function OrderResults() {
  return (
    <OrdersProvider>
      <OrderResultsContent />
    </OrdersProvider>
  );
}
