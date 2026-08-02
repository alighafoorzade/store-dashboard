/** @type {import('dependency-cruiser').IConfiguration} */
module.exports = {
  forbidden: [
    {
      name: "no-circular-dependencies",
      severity: "error",
      from: {},
      to: { circular: true },
    },
    {
      name: "no-ui-to-json",
      severity: "error",
      from: {
        path: "^src/(app|components)/|^src/features/[^/]+/components/",
      },
      to: { path: "^src/mocks/|\\.json$" },
    },
    {
      name: "no-ui-to-infrastructure",
      severity: "error",
      from: {
        path: "^src/(app|components)/|^src/features/[^/]+/components/",
      },
      to: { path: "^src/features/[^/]+/infrastructure/" },
    },
    {
      name: "no-shared-to-features",
      severity: "error",
      from: { path: "^src/(components|lib|test)/" },
      to: { path: "^src/features/" },
    },
    {
      name: "domain-is-independent",
      severity: "error",
      from: { path: "/domain/" },
      to: { path: "/(application|components|infrastructure)/" },
    },
    {
      name: "application-does-not-depend-on-ui",
      severity: "error",
      from: { path: "/application/" },
      to: { path: "/components/" },
    },
    {
      name: "infrastructure-does-not-depend-upstream",
      severity: "error",
      from: { path: "/infrastructure/" },
      to: { path: "/(application|components)/" },
    },
  ],
  options: {
    doNotFollow: { path: "node_modules" },
    includeOnly: "^src",
    tsConfig: { fileName: "tsconfig.json" },
  },
};
