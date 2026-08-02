"use client";

import * as SelectPrimitive from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import { useId } from "react";

import { cn } from "@/lib/cn";

export interface SelectOption {
  readonly label: string;
  readonly value: string;
  readonly disabled?: boolean;
}

interface SelectProps {
  readonly label: string;
  readonly onValueChange: (value: string) => void;
  readonly options: readonly SelectOption[];
  readonly placeholder?: string;
  readonly value?: string;
  readonly className?: string;
}

export function Select({
  className,
  label,
  onValueChange,
  options,
  placeholder,
  value,
}: SelectProps) {
  const labelId = useId();

  return (
    <SelectPrimitive.Root value={value} onValueChange={onValueChange}>
      <span id={labelId} className="sr-only">
        {label}
      </span>
      <SelectPrimitive.Trigger
        aria-labelledby={labelId}
        className={cn(
          "border-border bg-surface text-foreground focus-visible:border-focus focus-visible:ring-focus/25 data-[placeholder]:text-muted-foreground flex h-11 min-w-44 items-center justify-between gap-2 rounded-lg border px-3 text-sm shadow-sm outline-none focus-visible:ring-2",
          className,
        )}
      >
        <SelectPrimitive.Value placeholder={placeholder} />
        <SelectPrimitive.Icon aria-hidden="true">
          <ChevronDown className="size-4" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Content className="border-border bg-surface text-foreground z-50 overflow-hidden rounded-lg border p-1 shadow-lg">
          <SelectPrimitive.Viewport>
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                disabled={option.disabled}
                className="focus:bg-muted relative flex min-h-11 cursor-default items-center rounded-md py-2 pr-8 pl-3 text-sm outline-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
                <SelectPrimitive.ItemIndicator className="absolute right-2">
                  <Check aria-hidden="true" className="size-4" />
                </SelectPrimitive.ItemIndicator>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
