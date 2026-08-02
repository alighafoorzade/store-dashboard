import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const read = (path: string) => readFileSync(path, "utf8");

describe("project documentation", () => {
  it("documents every operational command", () => {
    const readme = read("README.md");
    const scripts = [
      "dev",
      "build",
      "start",
      "test:unit",
      "test:coverage",
      "test:e2e",
      "format:check",
      "lint",
      "typecheck",
      "check:dead-code",
      "check:cycles",
      "check:architecture",
      "security:audit",
      "validate",
    ];

    for (const script of scripts) expect(readme).toContain(`npm run ${script}`);
    expect(readme).toContain("npm ci");
  });

  it("covers required architecture and scale topics", () => {
    const documentation = `${read("README.md")}\n${read("DECISIONS.md")}`;
    const topics = [
      "OrderRepository",
      "REST",
      "Authentication",
      "authorization",
      "server-side",
      "observability",
      "caches",
      "indexes",
      "Virtualize",
      "100,000",
      "Vite",
      "React Router",
    ];

    for (const topic of topics) {
      expect(documentation.toLowerCase()).toContain(topic.toLowerCase());
    }
  });

  it("keeps local documentation links valid", () => {
    expect(existsSync("DECISIONS.md")).toBe(true);
    expect(existsSync("docs/sonar.md")).toBe(true);
  });
});
