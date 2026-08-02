export type SecurityHeader = { key: string; value: string };

const sharedDirectives = [
  "default-src 'self'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' blob: data:",
  "font-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
];

export function createContentSecurityPolicy(isDevelopment: boolean) {
  const scriptSources = ["'self'", "'unsafe-inline'"];
  const directives = [...sharedDirectives];

  if (isDevelopment) {
    scriptSources.push("'unsafe-eval'");
    directives.push("connect-src 'self' ws: http:");
  } else {
    directives.push("connect-src 'self'", "upgrade-insecure-requests");
  }

  directives.splice(1, 0, `script-src ${scriptSources.join(" ")}`);
  return `${directives.join("; ")};`;
}

export function createSecurityHeaders(
  isDevelopment: boolean,
): SecurityHeader[] {
  const headers: SecurityHeader[] = [
    {
      key: "Content-Security-Policy",
      value: createContentSecurityPolicy(isDevelopment),
    },
    { key: "X-Frame-Options", value: "DENY" },
    { key: "X-Content-Type-Options", value: "nosniff" },
    { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
    {
      key: "Permissions-Policy",
      value: "camera=(), microphone=(), geolocation=(), payment=(), usb=()",
    },
  ];

  if (!isDevelopment) {
    headers.push({
      key: "Strict-Transport-Security",
      value: "max-age=63072000; includeSubDomains; preload",
    });
  }

  return headers;
}
