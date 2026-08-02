import { existsSync, readFileSync } from "node:fs";

import { describe, expect, it } from "vitest";

const propertiesPath = "sonar-project.properties";

function readProperties() {
  return Object.fromEntries(
    readFileSync(propertiesPath, "utf8")
      .split(/\r?\n/)
      .filter(Boolean)
      .map((line) => {
        const separator = line.indexOf("=");
        return [line.slice(0, separator), line.slice(separator + 1)];
      }),
  );
}

describe("Sonar configuration", () => {
  it("maps repository source, test, and coverage paths", () => {
    const properties = readProperties();

    expect(properties["sonar.sources"]).toBe("src");
    expect(properties["sonar.tests"]).toBe("src,tests");
    expect(properties["sonar.javascript.lcov.reportPaths"]).toBe(
      "coverage/lcov.info",
    );
    expect(properties["sonar.typescript.tsconfigPaths"]).toBe("tsconfig.json");
    expect(existsSync("src")).toBe(true);
    expect(existsSync("tests")).toBe(true);
    expect(existsSync("tsconfig.json")).toBe(true);
  });

  it("keeps colocated tests out of production sources", () => {
    const properties = readProperties();

    expect(properties["sonar.exclusions"]).toContain("src/**/*.test.ts");
    expect(properties["sonar.test.inclusions"]).toContain("tests/**/*.ts");
  });

  it("contains no fabricated service identity or credentials", () => {
    const properties = readProperties();
    const forbiddenKeys = [
      "sonar.host.url",
      "sonar.login",
      "sonar.organization",
      "sonar.projectKey",
      "sonar.token",
    ];

    for (const key of forbiddenKeys) expect(properties[key]).toBeUndefined();
  });
});
