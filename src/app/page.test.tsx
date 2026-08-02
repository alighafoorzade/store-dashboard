import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import Home from "./page";

vi.mock("next/navigation", () => ({
  usePathname: () => "/orders",
  useRouter: () => ({ replace: vi.fn() }),
  useSearchParams: () => new URLSearchParams(),
}));

describe("Home", () => {
  it("renders the Orders workspace without starter content", () => {
    render(<Home />);

    const main = screen.getByRole("main");
    expect(main).toContainElement(
      screen.getByRole("heading", { level: 1, name: "Orders" }),
    );
    expect(screen.getAllByRole("link", { name: "Orders" })).not.toHaveLength(0);
    expect(screen.queryByText(/edit the page\.tsx/i)).not.toBeInTheDocument();
  });
});
