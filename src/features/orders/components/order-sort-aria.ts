import type { OrderSortField, SortDirection } from "../domain";

export function getAriaSort(
  field: OrderSortField,
  active: OrderSortField,
  direction: SortDirection,
) {
  if (field !== active) return "none" as const;
  return direction === "asc" ? ("ascending" as const) : ("descending" as const);
}
