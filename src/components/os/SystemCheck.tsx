import { useEffect, useRef, useState } from "react";
import { BOOT_LINES, SUBSYSTEMS, pick } from "@/lib/os-data";
import { Badge, Button, Label, Meter, Panel } from "./primitives";

type Result = { name: string; state: string };

export function SystemCheck({ onHealth }: { onHealth: (n: number) => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState<Result[] | null>(null);
  const [health, setHealth] = useState<number | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  function run() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRunning(true);
    setResults(null);
    setLines([]);
    const steps = [...BOOT_LINES].sort(() => Math.random() - 0.5).slice(0, 6);
    steps.forEach((line, i) => {
      timers.current.push(
        setTimeout(() => setLines((l) => [...l, line]), 380 * (i + 1)),
      );
    });
    timers.current.push(
      setTimeout(
        () => {
          const picked = [...SUBSYSTEMS]
            .sort(() => Math.random() - 0.5)
            .slice(0, 6)
            .map((s) => ({ name: s.name, state: pick(s.states) }));
          const score = 58 + Math.floor(Math.random() * 38);
          setResults(picked);
          setHealth(score);
          onHealth(score);
          setRunning(false);
        },
        380 * (steps.length + 1),
      ),
    );
  }

  return (
    <Panel className="scanlines">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Label>Diagnostics</Label>
        <Button variant="primary" onClick={run} disabled={running}>
          {running ? "Running..." : "Run system check"}
        </Button>
      </div>

      <div className="mt-4 min-h-[120px] rounded-lg border border-border bg-background/60 p-4 font-mono text-[13px] leading-relaxed">
        {lines.length === 0 && !results && (
          <p className="text-muted-foreground">
            Awaiting instruction<span className="caret">_</span>
          </p>
        )}
        {lines.map((l, i) => (
          <p key={i} className="animate-fade-in text-foreground/80">
            <span className="text-primary">›</span> {l}
          </p>
        ))}
        {results && (
          <div className="mt-3 animate-fade-in space-y-1">
            <p className="text-primary text-glow">SYSTEM DIAGNOSTIC COMPLETE</p>
            {results.map((r) => (
              <p key={r.name} className="flex flex-wrap justify-between gap-2">
                <span className="text-foreground/80">{r.name}:</span>
                <span className="text-warn">{r.state}</span>
              </p>
            ))}
          </div>
        )}
      </div>

      {health !== null && (
        <div className="mt-4 space-y-2">
          <div className="flex items-center justify-between">
            <Label>Overall system health</Label>
            <Badge tone={health > 75 ? "primary" : health > 55 ? "warn" : "chaos"}>
              {health}%
            </Badge>
          </div>
          <Meter value={health} tone={health > 75 ? "primary" : health > 55 ? "warn" : "chaos"} />
        </div>
      )}
    </Panel>
  );
}
