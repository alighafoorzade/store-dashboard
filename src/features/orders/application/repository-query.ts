import type { OrderRepositoryResult } from "../domain";

export function unwrapRepositoryResult<T>(result: OrderRepositoryResult<T>): T {
  if (!result.ok) throw result.error;
  return result.data;
}
