import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

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
