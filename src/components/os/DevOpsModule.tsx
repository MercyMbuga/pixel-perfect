import { useEffect, useMemo, useRef, useState } from "react";
import { DEVOPS_INCIDENTS, DEVOPS_SKILLS, TERMINAL_RESPONSES, pick } from "@/lib/os-data";
import { Badge, Button, Input, Label, Meter, Panel } from "./primitives";

export function DevOpsModule() {
  const [incident, setIncident] = useState(() => DEVOPS_INCIDENTS[0]!);
  const [history, setHistory] = useState<string[]>([
    "Mercy shell v1.0 — type `help` for available commands.",
  ]);
  const [command, setCommand] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: "end" });
  }, [history]);

  const avg = useMemo(
    () => Math.round(DEVOPS_SKILLS.reduce((a, s) => a + s.value, 0) / DEVOPS_SKILLS.length),
    [],
  );

  function run(e: React.FormEvent) {
    e.preventDefault();
    const cmd = command.trim().toLowerCase();
    if (!cmd) return;
    if (cmd === "clear") {
      setHistory([]);
      setCommand("");
      return;
    }
    const output = TERMINAL_RESPONSES[cmd] ?? [
      `command not found: ${cmd}`,
      'SYSTEM MESSAGE: "Bold of you to assume that exists. Try `help`."',
    ];
    setHistory((h) => [...h, `$ ${cmd}`, ...output, ""]);
    setCommand("");
  }

  return (
    <div className="space-y-4">
      <Panel>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
          <Label>Skill pipeline</Label>
          <Badge>Overall build: {avg}%</Badge>
        </div>
        <div className="grid gap-4 sm:grid-cols-2">
          {DEVOPS_SKILLS.map((s) => (
            <div key={s.name} className="space-y-1.5">
              <div className="flex items-baseline justify-between font-mono text-xs">
                <span className="text-foreground">{s.name}</span>
                <span className="text-primary">{s.value}%</span>
              </div>
              <Meter value={s.value} tone={s.value > 65 ? "primary" : "warn"} />
              <p className="font-mono text-[11px] text-muted-foreground">{s.note}</p>
            </div>
          ))}
        </div>
      </Panel>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Label>Active incident</Label>
          <Button onClick={() => setIncident(pick(DEVOPS_INCIDENTS))}>New incident</Button>
        </div>
        <p className="mt-3 font-mono text-sm text-warn">
          Current incident: {incident.incident}
        </p>
        <p className="mt-1 font-mono text-sm text-muted-foreground">
          Suggested remediation: {incident.remediation}
        </p>
      </Panel>

      <Panel className="scanlines p-0">
        <div className="flex items-center gap-2 border-b border-border px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-warn/70" />
          <span className="h-2.5 w-2.5 rounded-full bg-primary/70" />
          <Label className="ml-2">mercy@localhost — ~/devops</Label>
        </div>
        <div className="h-64 overflow-y-auto px-4 py-3 font-mono text-[13px] leading-relaxed">
          {history.map((line, i) => (
            <div
              key={i}
              className={line.startsWith("$") ? "text-primary" : "text-foreground/80"}
            >
              {line || "\u00a0"}
            </div>
          ))}
          <div ref={endRef} />
        </div>
        <form onSubmit={run} className="flex items-center gap-2 border-t border-border px-4 py-3">
          <span className="font-mono text-sm text-primary">$</span>
          <input
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            placeholder="try: docker ps"
            aria-label="Terminal command"
            className="flex-1 bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/50"
          />
          <Button variant="primary" type="submit">
            Run
          </Button>
        </form>
      </Panel>
      <div className="hidden">
        <Input />
      </div>
    </div>
  );
}
