import { useEffect, useRef, useState } from "react";
import { CHAOS_MESSAGES, pick } from "@/lib/os-data";
import { Badge, Button, Label, Panel } from "./primitives";

export function ChaosMode({
  active,
  setActive,
}: {
  active: boolean;
  setActive: (v: boolean) => void;
}) {
  const [log, setLog] = useState<string[]>([]);
  const interval = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!active) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    setLog((l) => [pick(CHAOS_MESSAGES), ...l].slice(0, 12));
    interval.current = setInterval(() => {
      setLog((l) => [pick(CHAOS_MESSAGES), ...l].slice(0, 12));
    }, 2200);
    return () => {
      if (interval.current) clearInterval(interval.current);
    };
  }, [active]);

  return (
    <Panel className={active ? "border-chaos/50" : undefined}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Label>Chaos daemon</Label>
          <Badge tone={active ? "chaos" : "muted"}>{active ? "ENGAGED" : "DORMANT"}</Badge>
        </div>
        <div className="flex gap-2">
          <Button variant="chaos" onClick={() => setActive(!active)}>
            {active ? "Exit chaos mode" : "Enter chaos mode"}
          </Button>
          {active && (
            <Button onClick={() => setLog((l) => [pick(CHAOS_MESSAGES), ...l].slice(0, 12))}>
              Another
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {log.length === 0 ? (
          <p className="font-mono text-sm text-muted-foreground">
            Chaos daemon idle. This is temporary.
          </p>
        ) : (
          log.map((m, i) => (
            <p
              key={`${m}-${i}`}
              className={`animate-fade-in border-l-2 pl-3 font-mono text-sm ${
                i === 0 ? "border-chaos text-chaos" : "border-border text-muted-foreground"
              }`}
            >
              {m}
            </p>
          ))
        )}
      </div>
    </Panel>
  );
}
