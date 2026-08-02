import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8");

describe("architecture tooling", () => {
  it("tracks application, test, and configuration entry points", () => {
    const config = JSON.parse(readProjectFile("knip.json")) as {
      entry: string[];
      project: string[];
    };
    expect(config.entry).toContain("src/app/**/*.{ts,tsx}");
    expect(config.entry).toContain("tests/**/*.{ts,tsx}");
    expect(config.entry).toContain("*.config.{js,mjs,ts,mts}");
    expect(config.project).toContain("src/**/*.{ts,tsx,css}");
  });

  it("enforces required dependency boundaries", () => {
    const config = readProjectFile(".dependency-cruiser.cjs");
    for (const rule of [
      "no-circular-dependencies",
      "no-ui-to-json",
      "no-ui-to-infrastructure",
      "no-shared-to-features",
      "domain-is-independent",
      "application-does-not-depend-on-ui",
      "infrastructure-does-not-depend-upstream",
    ]) {
      expect(config).toContain(`name: \"${rule}\"`);
    }
  });
});
