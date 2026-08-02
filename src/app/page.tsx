import { AppShell } from "@/components/layout/app-shell";
import { OrderListControls } from "@/features/orders/components/order-list-controls";
import { Suspense } from "react";

export default function Home() {
  return (
    <AppShell>
      <header>
        <p className="text-muted-foreground text-sm font-medium">
          Order management
        </p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight sm:text-4xl">
          Orders
        </h1>
        <p className="text-muted-foreground mt-3 max-w-2xl text-sm leading-6 sm:text-base">
          Find customer orders, review their status, and open order details from
          one workspace.
        </p>
      </header>
      <Suspense fallback={<p className="mt-8">Loading order controls…</p>}>
        <OrderListControls />
      </Suspense>
    </AppShell>
  );
}
