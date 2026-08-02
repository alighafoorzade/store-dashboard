import type { OrderStatus } from "../domain";

interface StatusFiltersProps {
  readonly onChange: (statuses: readonly OrderStatus[]) => void;
  readonly options: readonly OrderStatus[];
  readonly selected: readonly OrderStatus[];
}

export function StatusFilters({
  onChange,
  options,
  selected,
}: StatusFiltersProps) {
  const toggle = (status: OrderStatus, checked: boolean) =>
    onChange(
      checked
        ? [...selected, status]
        : selected.filter((value) => value !== status),
    );

  return (
    <fieldset className="min-w-0">
      <legend className="text-sm font-semibold">Status</legend>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((status) => (
          <label
            key={status}
            className="border-border bg-surface has-[:checked]:border-primary has-[:checked]:bg-primary/10 flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border px-3 text-sm"
          >
            <input
              type="checkbox"
              checked={selected.includes(status)}
              onChange={(event) => toggle(status, event.target.checked)}
              className="accent-primary size-4"
            />
            {status}
          </label>
        ))}
      </div>
    </fieldset>
  );
}
