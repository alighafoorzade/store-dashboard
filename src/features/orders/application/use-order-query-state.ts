"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import {
  normalizeOrderQuery,
  type OrderQuery,
  type OrderSortField,
  type OrderStatus,
  type SortDirection,
} from "../domain";
import {
  buildOrderSearchParams,
  createOrderUrl,
  parseOrderSearchParams,
} from "./order-url-query";

export const SEARCH_DEBOUNCE_MS = 300;

interface PendingSearch {
  readonly base: string;
  readonly value: string;
}

function haveEqualParameters(left: URLSearchParams, right: URLSearchParams) {
  const sortedLeft = new URLSearchParams(left);
  const sortedRight = new URLSearchParams(right);
  sortedLeft.sort();
  sortedRight.sort();
  return sortedLeft.toString() === sortedRight.toString();
}

export function useOrderQueryState() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const query = parseOrderSearchParams(searchParams);
  const [pendingSearch, setPendingSearch] = useState<PendingSearch | null>(
    null,
  );

  const replaceQuery = useCallback(
    (nextQuery: Readonly<OrderQuery>) => {
      const current = new URLSearchParams(searchParams.toString());
      const next = buildOrderSearchParams(current, nextQuery);
      if (haveEqualParameters(next, current)) return;
      router.replace(createOrderUrl(pathname, next), { scroll: false });
    },
    [pathname, router, searchParams],
  );

  useEffect(() => {
    if (!pendingSearch) return;
    const timer = window.setTimeout(() => {
      const nextQuery = normalizeOrderQuery({
        ...query,
        search: pendingSearch.value,
        page: 1,
      });
      if (nextQuery.search === query.search) setPendingSearch(null);
      replaceQuery(nextQuery);
    }, SEARCH_DEBOUNCE_MS);
    return () => window.clearTimeout(timer);
  }, [pendingSearch, query, replaceQuery]);

  const updateQuery = (changes: Partial<OrderQuery>, resetPage = true) =>
    replaceQuery(
      normalizeOrderQuery({
        ...query,
        ...changes,
        page: resetPage ? 1 : changes.page,
      }),
    );

  return {
    query,
    isSearchPending: pendingSearch !== null,
    searchInput:
      pendingSearch?.base === query.search ? pendingSearch.value : query.search,
    setSearch: (value: string) =>
      setPendingSearch({ base: query.search, value }),
    setStatuses: (statuses: readonly OrderStatus[]) =>
      updateQuery({ statuses }),
    setSorting: (sortBy: OrderSortField, sortDirection: SortDirection) =>
      updateQuery({ sortBy, sortDirection }),
    setPage: (page: number) => updateQuery({ page }, false),
    clear: () => {
      setPendingSearch(null);
      replaceQuery(normalizeOrderQuery());
    },
  } as const;
}
