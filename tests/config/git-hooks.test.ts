import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

const readProjectFile = (path: string) =>
  readFileSync(resolve(process.cwd(), path), "utf8").replaceAll("\r\n", "\n");

describe("Git quality hooks", () => {
  it("runs staged checks and Conventional Commit validation", () => {
    expect(readProjectFile(".husky/pre-commit").trim()).toBe(
      "npx --no-install lint-staged",
    );
    expect(readProjectFile(".husky/commit-msg").trim()).toBe(
      'npx --no-install commitlint --edit "$1"',
    );
  });

  it("runs pre-push verification without recursive Git commands", () => {
    const hook = readProjectFile(".husky/pre-push");
    expect(hook.trim().split("\n")).toEqual([
      "npm run typecheck",
      "npm run test:unit -- --run",
      "npm run build",
    ]);
    expect(hook).not.toMatch(/\bgit\b|npm run validate|pre-push/);
  });

  it("configures lint-staged for code and content files", () => {
    const config = readProjectFile("lint-staged.config.mjs");
    expect(config).toContain('"*.{js,mjs,cjs,ts,tsx}"');
    expect(config).toContain('"eslint --fix"');
    expect(config).toContain('"prettier --write"');
    expect(config).toContain('"*.{json,md,css,yml,yaml}"');
  });
});
