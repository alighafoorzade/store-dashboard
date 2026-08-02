"use client";

import { Button, Input, Select } from "@/components/ui";

import { useOrderQueryState } from "../application/use-order-query-state";
import { DEFAULT_ORDER_QUERY, ORDER_STATUSES } from "../domain";
import {
  DIRECTION_OPTIONS,
  isOrderSortField,
  isSortDirection,
  SORT_OPTIONS,
} from "./control-options";
import { StatusFilters } from "./status-filters";

export function OrderListControls() {
  const state = useOrderQueryState();
  const { query } = state;
  const hasActiveControls =
    state.searchInput.trim() !== "" ||
    query.statuses.length > 0 ||
    query.sortBy !== DEFAULT_ORDER_QUERY.sortBy ||
    query.sortDirection !== DEFAULT_ORDER_QUERY.sortDirection;

  return (
    <section aria-labelledby="order-controls-title" className="mt-8">
      <h2 id="order-controls-title" className="text-lg font-semibold">
        Find orders
      </h2>
      <div className="mt-4 grid gap-5 rounded-xl border p-4 lg:grid-cols-2">
        <div>
          <label htmlFor="order-search" className="text-sm font-semibold">
            Search orders
          </label>
          <Input
            id="order-search"
            value={state.searchInput}
            onChange={(event) => state.setSearch(event.target.value)}
            placeholder="Order number or customer name"
            className="mt-2"
          />
          <p className="text-muted-foreground mt-2 text-xs" aria-live="polite">
            {state.isSearchPending
              ? "Updating search…"
              : "Search is up to date"}
          </p>
        </div>
        <StatusFilters
          options={ORDER_STATUSES}
          selected={query.statuses}
          onChange={state.setStatuses}
        />
        <div>
          <p className="text-sm font-semibold">Sort orders</p>
          <div className="mt-2 flex flex-wrap gap-2">
            <Select
              label="Sort field"
              value={query.sortBy}
              onValueChange={(value) => {
                if (isOrderSortField(value))
                  state.setSorting(value, query.sortDirection);
              }}
              options={SORT_OPTIONS}
            />
            <Select
              label="Sort direction"
              value={query.sortDirection}
              onValueChange={(value) => {
                if (isSortDirection(value))
                  state.setSorting(query.sortBy, value);
              }}
              options={DIRECTION_OPTIONS}
            />
          </div>
        </div>
        <div className="flex flex-col items-start justify-end gap-2">
          <p className="text-muted-foreground text-sm" aria-live="polite">
            {query.statuses.length === 0
              ? "All statuses selected"
              : `${query.statuses.length} status filters selected`}
          </p>
          <Button
            variant="secondary"
            onClick={state.clear}
            disabled={!hasActiveControls}
          >
            Clear controls
          </Button>
        </div>
      </div>
    </section>
  );
}
