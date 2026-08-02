import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

function sarifFiles(path) {
  if (!statSync(path).isDirectory()) return [path];
  return readdirSync(path, { recursive: true })
    .filter((file) => file.endsWith(".sarif"))
    .map((file) => join(path, file));
}

export function highSeverityFindings(sarif, threshold) {
  return (sarif.runs ?? []).flatMap((run) => {
    const scores = new Map(
      (run.tool?.driver?.rules ?? []).map((rule) => [
        rule.id,
        Number(rule.properties?.["security-severity"] ?? 0),
      ]),
    );

    return (run.results ?? [])
      .filter((result) => (scores.get(result.ruleId) ?? 0) >= threshold)
      .map((result) => ({
        ruleId: result.ruleId,
        uri: result.locations?.[0]?.physicalLocation?.artifactLocation?.uri,
        line: result.locations?.[0]?.physicalLocation?.region?.startLine,
      }));
  });
}

const [path, rawThreshold = "7"] = process.argv.slice(2);

if (path) {
  const threshold = Number(rawThreshold);
  const findings = sarifFiles(path).flatMap((file) =>
    highSeverityFindings(JSON.parse(readFileSync(file, "utf8")), threshold),
  );

  for (const finding of findings) {
    console.error(
      `${finding.ruleId} at ${finding.uri ?? "unknown"}:${finding.line ?? 0}`,
    );
  }

  if (findings.length > 0) {
    console.error(
      `${findings.length} CodeQL finding(s) meet severity ${threshold}.`,
    );
    process.exitCode = 1;
  }
}
