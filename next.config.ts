import type { NextConfig } from "next";

import { createSecurityHeaders } from "./security-headers";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: createSecurityHeaders(process.env.NODE_ENV === "development"),
      },
    ];
  },
  poweredByHeader: false,
  reactCompiler: true,
};

export default nextConfig;
