import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import Home from "./page";

describe("Home", () => {
  it("renders the starter page heading in the main landmark", () => {
    render(<Home />);

    const main = screen.getByRole("main");

    expect(main).toContainElement(
      screen.getByRole("heading", {
        level: 1,
        name: "To get started, edit the page.tsx file.",
      }),
    );
  });
});
