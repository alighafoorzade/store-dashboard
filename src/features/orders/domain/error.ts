export const ORDER_DOMAIN_ERROR_CODES = Object.freeze([
  "INVALID_DATA",
  "NOT_FOUND",
  "UNEXPECTED",
] as const);

export type OrderDomainErrorCode = (typeof ORDER_DOMAIN_ERROR_CODES)[number];

export interface OrderDomainError {
  readonly code: OrderDomainErrorCode;
  readonly message: string;
}
