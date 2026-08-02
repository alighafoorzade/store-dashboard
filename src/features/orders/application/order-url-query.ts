import {
  DEFAULT_ORDER_QUERY,
  normalizeOrderQuery,
  type OrderQuery,
} from "../domain";

const ORDER_QUERY_PARAMETERS = [
  "q",
  "status",
  "sort",
  "direction",
  "page",
] as const;

function parsePage(value: string | null): number | undefined {
  if (!value || !/^\d+$/.test(value)) return undefined;
  const page = Number(value);
  return Number.isSafeInteger(page) ? page : undefined;
}

function parseStatuses(params: Pick<URLSearchParams, "getAll">): string[] {
  return params
    .getAll("status")
    .flatMap((status) => status.split(","))
    .map((status) => status.trim())
    .filter(Boolean);
}

export function parseOrderSearchParams(
  params: Pick<URLSearchParams, "get" | "getAll">,
): Readonly<OrderQuery> {
  return normalizeOrderQuery({
    search: params.get("q") ?? "",
    statuses: parseStatuses(params),
    sortBy: params.get("sort"),
    sortDirection: params.get("direction"),
    page: parsePage(params.get("page")),
  });
}

export function buildOrderSearchParams(
  current: URLSearchParams,
  query: Readonly<OrderQuery>,
): URLSearchParams {
  const next = new URLSearchParams(current);
  ORDER_QUERY_PARAMETERS.forEach((parameter) => next.delete(parameter));

  if (query.search) next.set("q", query.search);
  query.statuses.forEach((status) => next.append("status", status));
  if (query.sortBy !== DEFAULT_ORDER_QUERY.sortBy)
    next.set("sort", query.sortBy);
  if (query.sortDirection !== DEFAULT_ORDER_QUERY.sortDirection) {
    next.set("direction", query.sortDirection);
  }
  if (query.page !== DEFAULT_ORDER_QUERY.page)
    next.set("page", String(query.page));

  return next;
}

export function createOrderUrl(
  pathname: string,
  params: URLSearchParams,
): string {
  const safePathname = pathname.startsWith("/") ? pathname : "/";
  const queryString = params.toString();
  return queryString ? `${safePathname}?${queryString}` : safePathname;
}
