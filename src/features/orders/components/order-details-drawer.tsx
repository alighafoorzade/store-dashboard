"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { useRef } from "react";

import { Button } from "@/components/ui";
import type { Order } from "../domain";
import {
  OrderDetailsContent,
  OrderDetailsError,
  OrderDetailsLoading,
} from "./order-details-content";

interface OrderDetailsDrawerProps {
  readonly error: boolean;
  readonly loading: boolean;
  readonly onOpenChange: (open: boolean) => void;
  readonly open: boolean;
  readonly order?: Order;
}

export function OrderDetailsDrawer({
  error,
  loading,
  onOpenChange,
  open,
  order,
}: OrderDetailsDrawerProps) {
  const returnFocus = useRef<HTMLElement | null>(null);
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-40 bg-black/45" />
        <Dialog.Content
          onOpenAutoFocus={() => {
            if (document.activeElement instanceof HTMLElement)
              returnFocus.current = document.activeElement;
          }}
          onCloseAutoFocus={(event) => {
            event.preventDefault();
            returnFocus.current?.focus();
          }}
          className="border-border bg-surface fixed inset-x-0 bottom-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border p-6 shadow-xl outline-none md:inset-y-0 md:right-0 md:left-auto md:h-full md:w-[28rem] md:rounded-none"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <Dialog.Title className="text-xl font-semibold">
                Order details
              </Dialog.Title>
              <Dialog.Description className="text-muted-foreground mt-1 text-sm">
                Review the complete information for the selected order.
              </Dialog.Description>
            </div>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close order details"
              >
                <X aria-hidden="true" className="size-5" />
              </Button>
            </Dialog.Close>
          </div>
          <div className="mt-6">
            {loading ? (
              <OrderDetailsLoading />
            ) : error || !order ? (
              <OrderDetailsError />
            ) : (
              <OrderDetailsContent order={order} />
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
