# Sonar Analysis

The repository includes credential-free SonarQube/SonarCloud scanner settings.
Analysis is intentionally not enabled in CI until an authorized maintainer
selects a server, organization, and project.

## Prerequisites

1. Create or select the project in the authorized Sonar service.
2. Set `SONAR_HOST_URL` and `SONAR_TOKEN` in the local environment or an
   approved CI secret store. Never commit either value.
3. Generate the LCOV report with `npm run test:coverage`.

## Run Analysis

Pass the service-owned identifiers at runtime:

```bash
npm run quality:sonar -- -Dsonar.projectKey=<authorized-project-key>
```

For SonarCloud, also pass the organization assigned by the service:

```bash
npm run quality:sonar -- -Dsonar.projectKey=<key> -Dsonar.organization=<org>
```

Do not add analysis to CI until repository administrators have configured the
required secrets and confirmed that the target project permits analysis.
