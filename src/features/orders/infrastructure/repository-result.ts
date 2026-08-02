import type { OrderDomainErrorCode, OrderRepositoryResult } from "../domain";

export function repositorySuccess<T>(data: T): OrderRepositoryResult<T> {
  return Object.freeze({ ok: true, data });
}

export function repositoryFailure<T>(
  code: OrderDomainErrorCode,
  message: string,
): OrderRepositoryResult<T> {
  return Object.freeze({
    ok: false,
    error: Object.freeze({ code, message }),
  });
}
