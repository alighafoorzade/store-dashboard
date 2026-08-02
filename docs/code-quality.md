---

# Git Quality Automation

The project must enforce code quality automatically before code reaches the repository.

## File Size

Every source and test file must remain at or below 100 lines of code. When a file exceeds 100 lines, refactor it by responsibility into cohesive modules before merging. Do not evade this rule by compressing formatting, combining statements, or moving complexity into generated code.

Whenever setting up a new project, configure the following tools unless explicitly instructed otherwise.

## Husky

Use **Husky** to run Git hooks.

Required hooks:

- `pre-commit`
- `commit-msg`
- `pre-push`

Never rely solely on developers remembering to run quality checks manually.

---

## lint-staged

Use **lint-staged** to run checks only against staged files.

Typical tasks:

- ESLint (`--fix`)
- Prettier (`--write`)
- TypeScript type checking (when appropriate)
- Unit tests related to changed files if supported

Example responsibilities:

- Automatically format staged files.
- Automatically fix lint issues when possible.
- Reject commits if linting fails.
- Reject commits if formatting cannot be applied.
- Reject commits when type checking fails.

---

## CommitLint

Use **CommitLint** to enforce the Conventional Commits specification.

Every commit message must pass validation.

Allowed commit types:

- feat
- fix
- docs
- style
- refactor
- perf
- test
- build
- ci
- chore
- revert

Commit format:

```text
type(scope): short description
```

Examples:

```text
feat(auth): add password reset
fix(api): handle expired tokens
refactor(users): simplify repository layer
```

Reject commits that do not follow the standard.

---

## EditorConfig

Include an `.editorconfig` file to ensure consistent formatting across editors.

Enforce:

- UTF-8
- LF line endings
- Final newline
- Trim trailing whitespace
- Consistent indentation

---

## Prettier

Automatically format code before commits.

Never allow unformatted code to be committed.

---

## ESLint

Lint staged files before commits.

Automatically fix problems when safe.

Reject commits if lint errors remain.

---

## TypeScript

Run strict type checking before pushing changes.

Reject pushes when type errors exist.

---

## Knip

Prevent merging unused code.

Reject changes introducing:

- unused exports
- unused dependencies
- unused files
- unused imports

---

## Madge

Run circular dependency detection.

Reject pushes that introduce circular imports.

---

## Dependency Cruiser

Validate architectural boundaries.

Reject changes that violate project architecture.

Examples:

- Feature importing another feature
- UI importing infrastructure
- Shared depending on application code

---

## SonarQube / SonarCloud

The project should pass the Quality Gate.

Do not introduce:

- code smells
- duplicated code
- excessive complexity
- maintainability issues
- security hotspots

---

## Testing

Before pushing:

- Run unit tests.
- Run integration tests.
- Run Playwright E2E tests when affected.
- Reject pushes if tests fail.

---

## Secret Scanning

Prevent accidental commits containing:

- API keys
- passwords
- private keys
- access tokens
- cloud credentials
- `.env` secrets

Recommended tools:

- gitleaks
- git-secrets
- TruffleHog

Reject commits containing sensitive information.

---

## Dependency Security

Regularly scan dependencies using:

- npm audit
- Snyk
- Dependabot

Reject builds containing critical vulnerabilities unless explicitly accepted.

---

## Continuous Integration

Every Pull Request must execute:

- Install dependencies
- TypeScript type check
- ESLint
- Prettier verification
- Knip
- Dependency Cruiser
- Madge
- Unit tests
- Integration tests
- Playwright
- Build application
- SonarQube analysis (if configured)

A Pull Request must not be merged unless every required check passes.

---

# Pull Request Standards

Every Pull Request should:

- Solve a single logical problem.
- Be easy to review.
- Avoid unrelated changes.
- Include tests when appropriate.
- Update documentation when necessary.
- Keep diffs as small as practical.

---

# Code Generation Requirements

Whenever generating code:

- Produce code that passes all configured quality tools on the first attempt.
- Do not generate placeholder implementations unless requested.
- Do not disable lint rules to silence warnings.
- Do not bypass type checking.
- Do not ignore failing tests.
- Do not suppress SonarQube issues without justification.
- Do not introduce architectural violations.
- Assume every commit will be validated automatically by Husky, CommitLint, lint-staged, CI pipelines, and code review.
