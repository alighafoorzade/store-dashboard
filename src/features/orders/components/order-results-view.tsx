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
  readonly query: Readonly<OrderQuery>;
  readonly retry: () => void;
}

export function OrderResultsView({
  data,
  error,
  loading,
  query,
  retry,
}: OrderResultsViewProps) {
  if (loading) return <OrderResultsLoading />;
  if (error || !data) return <OrderResultsError retry={retry} />;
  if (data.items.length === 0) {
    const filtered = query.search !== "" || query.statuses.length > 0;
    return <OrderResultsEmpty filtered={filtered} />;
  }

  return (
    <section aria-labelledby="order-results-title">
      <div className="mb-3 flex items-baseline justify-between gap-4">
        <h2 id="order-results-title" className="text-lg font-semibold">
          Order results
        </h2>
        <p className="text-muted-foreground text-sm">
          {data.totalItems} orders
        </p>
      </div>
      <OrderTable
        orders={data.items}
        sortBy={query.sortBy}
        sortDirection={query.sortDirection}
      />
      <div className="space-y-3 md:hidden">
        {data.items.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </section>
  );
}
