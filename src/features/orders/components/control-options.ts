import {
  ORDER_SORT_FIELDS,
  SORT_DIRECTIONS,
  type OrderSortField,
  type SortDirection,
} from "../domain";

const SORT_LABELS: Record<OrderSortField, string> = {
  price: "Price",
  customer: "Customer name",
  createdAt: "Created date",
};

const DIRECTION_LABELS: Record<SortDirection, string> = {
  asc: "Ascending",
  desc: "Descending",
};

export const SORT_OPTIONS = ORDER_SORT_FIELDS.map((value) => ({
  value,
  label: SORT_LABELS[value],
}));

export const DIRECTION_OPTIONS = SORT_DIRECTIONS.map((value) => ({
  value,
  label: DIRECTION_LABELS[value],
}));

export function isOrderSortField(value: string): value is OrderSortField {
  return ORDER_SORT_FIELDS.some((field) => field === value);
}

export function isSortDirection(value: string): value is SortDirection {
  return SORT_DIRECTIONS.some((direction) => direction === value);
}
