import { useState } from "react";
import { Badge, Button, Label, Meter, Panel, Textarea } from "./primitives";

type Level = "LOW" | "MODERATE" | "HIGH";

type Report = {
  scores: { label: string; level: Level; value: number }[];
  suspicious: boolean;
  warning: string;
};

const WARNINGS_BAD = [
  "Please do not deploy this relationship to production.",
  "Rollback recommended. Previous version also failed.",
  "This behaviour passed no tests and was merged anyway.",
  "Effort service unreachable. Retrying is optional.",
];
const WARNINGS_MID = [
  "Staging environment only. Do not promote yet.",
  "Monitoring enabled. Logs will be reviewed.",
  "Acceptable, pending further evidence.",
];
const WARNINGS_GOOD = [
  "All checks passed. Suspiciously so.",
  "Effort detected. Documenting for historical purposes.",
  "System approves, cautiously.",
];

const RULES = [
  { key: "effort", positive: ["planned", "booked", "picked me", "cooked", "paid", "surprised", "drove", "showed up", "date"], negative: ["hasn't planned", "no plan", "come over", "my place", "later maybe", "we'll see", "u up", "you up"] },
  { key: "communication", positive: ["called", "texted", "explained", "told me", "asked", "apologized", "check"], negative: ["ignored", "left on read", "dry", "one word", "ghost", "seen", "didn't reply", "k"] },
  { key: "initiative", positive: ["he planned", "he suggested", "he asked", "he booked", "he called"], negative: ["i always", "i had to", "i planned", "i suggested", "i texted first"] },
  { key: "consistency", positive: ["every week", "always", "consistent", "on time", "keeps"], negative: ["sometimes", "randomly", "disappears", "3am", "only when", "hot and cold", "last minute"] },
];

const LABELS: Record<string, string> = {
  effort: "Effort",
  communication: "Communication",
  initiative: "Initiative",
  consistency: "Consistency",
};

function toLevel(v: number): Level {
  return v >= 66 ? "HIGH" : v >= 36 ? "MODERATE" : "LOW";
}

function analyze(text: string): Report {
  const t = text.toLowerCase();
  const scores = RULES.map((rule) => {
    let v = 50;
    rule.positive.forEach((w) => t.includes(w) && (v += 18));
    rule.negative.forEach((w) => t.includes(w) && (v -= 22));
    v = Math.max(5, Math.min(95, v));
    return { label: LABELS[rule.key]!, level: toLevel(v), value: v };
  });

  const effort = scores[0]!.value;
  const access = /come over|my place|through|link up|pull up|tonight|late/.test(t);
  const ratio = Math.max(5, Math.min(95, access ? Math.round(effort * 0.5) : effort));
  scores.push({
    label: "Physical-access-to-effort ratio",
    level: toLevel(ratio),
    value: ratio,
  });

  const avg = scores.reduce((a, s) => a + s.value, 0) / scores.length;
  const suspicious = avg < 55;
  const warning =
    avg < 40
      ? WARNINGS_BAD[Math.floor(Math.random() * WARNINGS_BAD.length)]!
      : avg < 65
        ? WARNINGS_MID[Math.floor(Math.random() * WARNINGS_MID.length)]!
        : WARNINGS_GOOD[Math.floor(Math.random() * WARNINGS_GOOD.length)]!;

  return { scores, suspicious, warning };
}

export function RomanceModule() {
  const [text, setText] = useState("");
  const [report, setReport] = useState<Report | null>(null);

  return (
    <div className="space-y-4">
      <Panel>
        <Label>Relationship incident response</Label>
        <p className="mt-2 mb-3 text-sm text-muted-foreground">
          Describe the situation. The system will judge it on your behalf, free of charge.
        </p>
        <Textarea
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="He hasn't planned a date but wants me to come over."
        />
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="primary"
            disabled={!text.trim()}
            onClick={() => setReport(analyze(text))}
          >
            Analyze incident
          </Button>
          <Button
            onClick={() => {
              setText("");
              setReport(null);
            }}
          >
            Clear
          </Button>
        </div>
      </Panel>

      {report && (
        <Panel className="animate-fade-in">
          <div className="flex items-center justify-between">
            <Label>Analysis complete</Label>
            <Badge tone={report.suspicious ? "chaos" : "primary"}>
              Suspicious behavior: {report.suspicious ? "DETECTED" : "NOT DETECTED"}
            </Badge>
          </div>
          <div className="mt-4 space-y-3">
            {report.scores.map((s) => (
              <div key={s.label} className="space-y-1.5">
                <div className="flex justify-between font-mono text-xs">
                  <span>{s.label}</span>
                  <span
                    className={
                      s.level === "HIGH"
                        ? "text-primary"
                        : s.level === "MODERATE"
                          ? "text-warn"
                          : "text-chaos"
                    }
                  >
                    {s.level}
                  </span>
                </div>
                <Meter
                  value={s.value}
                  tone={s.level === "HIGH" ? "primary" : s.level === "MODERATE" ? "warn" : "chaos"}
                />
              </div>
            ))}
          </div>
          <p className="mt-5 border-l-2 border-chaos pl-3 font-mono text-sm text-chaos">
            SYSTEM WARNING: "{report.warning}"
          </p>
        </Panel>
      )}
    </div>
  );
}
