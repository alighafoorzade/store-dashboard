import { Pagination } from "@/components/ui";

import type { OrderQuery, PaginatedOrders } from "../domain";
import { OrderCard } from "./order-card";
import {
  OrderResultsEmpty,
  OrderResultsError,
  OrderResultsLoading,
} from "./order-results-states";
import { OrderTable } from "./order-table";

interface OrderResultsViewProps {
  readonly data?: PaginatedOrders;
  readonly error: boolean;
  readonly loading: boolean;
  readonly onOpenOrder?: (id: string) => void;
  readonly onPageChange: (page: number) => void;
  readonly query: Readonly<OrderQuery>;
  readonly retry: () => void;
}

export function OrderResultsView({
  data,
  error,
  loading,
  onOpenOrder = () => undefined,
  onPageChange,
  query,
  retry,
}: OrderResultsViewProps) {
  if (loading) return <OrderResultsLoading />;
  if (error || !data) return <OrderResultsError retry={retry} />;
  if (data.items.length === 0) {
    const filtered = query.search !== "" || query.statuses.length > 0;
    return <OrderResultsEmpty filtered={filtered} />;
  }
  const firstResult = (data.page - 1) * data.pageSize + 1;
  const lastResult = firstResult + data.items.length - 1;

  return (
    <section aria-labelledby="order-results-title">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id="order-results-title" className="text-lg font-semibold">
          Order results
        </h2>
        <p className="text-muted-foreground text-sm" aria-live="polite">
          Showing {firstResult}–{lastResult} of {data.totalItems} orders
        </p>
      </div>
      <OrderTable
        onOpen={onOpenOrder}
        orders={data.items}
        sortBy={query.sortBy}
        sortDirection={query.sortDirection}
      />
      <div className="space-y-3 md:hidden">
        {data.items.map((order) => (
          <OrderCard key={order.id} order={order} onOpen={onOpenOrder} />
        ))}
      </div>
      <div className="mt-5 flex justify-center">
        <Pagination
          page={data.page}
          totalPages={data.totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </section>
  );
}
