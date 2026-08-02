export const MOCK_ORDER_DELAY_MS = 300;

export type RepositoryDelay = () => Promise<void>;

export function createRepositoryDelay(
  durationMs = MOCK_ORDER_DELAY_MS,
): RepositoryDelay {
  return () =>
    new Promise((resolve) => {
      setTimeout(resolve, durationMs);
    });
}
