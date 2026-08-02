import { describe, expect, it } from "vitest";

import {
  createContentSecurityPolicy,
  createSecurityHeaders,
} from "../../security-headers";

function asRecord(isDevelopment: boolean) {
  return Object.fromEntries(
    createSecurityHeaders(isDevelopment).map(({ key, value }) => [key, value]),
  );
}

describe("security headers", () => {
  it("sets the required production protections", () => {
    expect(asRecord(false)).toMatchObject({
      "Strict-Transport-Security":
        "max-age=63072000; includeSubDomains; preload",
      "X-Frame-Options": "DENY",
      "X-Content-Type-Options": "nosniff",
      "Referrer-Policy": "strict-origin-when-cross-origin",
      "Permissions-Policy":
        "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    });
  });

  it("uses a restrictive production CSP", () => {
    const policy = createContentSecurityPolicy(false);

    expect(policy).toContain("frame-ancestors 'none'");
    expect(policy).toContain("object-src 'none'");
    expect(policy).toContain("upgrade-insecure-requests");
    expect(policy).not.toContain("'unsafe-eval'");
    expect(policy).not.toContain(" *");
    expect(policy).not.toContain("http:");
  });

  it("limits development concessions to development", () => {
    const headers = asRecord(true);

    expect(headers["Strict-Transport-Security"]).toBeUndefined();
    expect(headers["Content-Security-Policy"]).toContain("'unsafe-eval'");
    expect(headers["Content-Security-Policy"]).toContain("ws:");
    expect(headers["Content-Security-Policy"]).not.toContain(
      "upgrade-insecure-requests",
    );
  });
});
