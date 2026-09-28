import { useState } from "react";
import { useLocalState } from "@/hooks/use-local-state";
import { Badge, Button, Input, Label, Meter, Panel } from "./primitives";

type Process = { id: string; name: string; load: number; killable: boolean };

const DEFAULTS: Process[] = [
  { id: "p1", name: "overthinking.daemon", load: 34, killable: false },
  { id: "p2", name: "assignment_due_thursday", load: 22, killable: true },
  { id: "p3", name: "that_conversation_from_2019", load: 11, killable: true },
  { id: "p4", name: "snack_evaluation_service", load: 9, killable: true },
  { id: "p5", name: "career_planning (suspended)", load: 7, killable: true },
];

const KILL_NOTES = [
  "Process terminated. It will restart at 2 AM.",
  "Freed 12% RAM. Do not spend it all at once.",
  "Terminated. The thought has been noted and ignored.",
  "Killed successfully. Suspiciously easy.",
];

export function BrainModule() {
  const [procs, setProcs] = useLocalState<Process[]>("mercy.brain.procs", DEFAULTS);
  const [input, setInput] = useState("");
  const [note, setNote] = useState("Cognitive scheduler running in fair-ish mode.");

  const load = Math.min(100, procs.reduce((a, p) => a + p.load, 0));

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim()) return;
    setProcs((p) => [
      ...p,
      {
        id: crypto.randomUUID(),
        name: input.trim().toLowerCase().replace(/\s+/g, "_"),
        load: 5 + Math.floor(Math.random() * 20),
        killable: true,
      },
    ]);
    setInput("");
    setNote("New process spawned. Memory pressure increasing.");
  }

  return (
    <div className="space-y-4">
      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Cognitive load</Label>
          <Badge tone={load > 75 ? "chaos" : load > 45 ? "warn" : "primary"}>{load}% used</Badge>
        </div>
        <div className="mt-3">
          <Meter value={load} tone={load > 75 ? "chaos" : load > 45 ? "warn" : "primary"} />
        </div>
        <p className="mt-2 font-mono text-sm text-muted-foreground">{note}</p>
      </Panel>

      <Panel>
        <Label>Running processes</Label>
        <ul className="mt-3 divide-y divide-border">
          {procs.map((p) => (
            <li key={p.id} className="flex items-center gap-3 py-2.5">
              <span className="flex-1 font-mono text-sm">{p.name}</span>
              <span className="font-mono text-xs text-primary">{p.load}%</span>
              <Button
                disabled={!p.killable}
                onClick={() => {
                  setProcs((l) => l.filter((x) => x.id !== p.id));
                  setNote(KILL_NOTES[Math.floor(Math.random() * KILL_NOTES.length)]!);
                }}
              >
                {p.killable ? "Kill" : "Immortal"}
              </Button>
            </li>
          ))}
        </ul>
        <form onSubmit={add} className="mt-4 flex flex-wrap gap-2">
          <Input
            className="flex-1 min-w-[160px]"
            placeholder="New thought taking up space"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Spawn
          </Button>
          <Button
            type="button"
            onClick={() => {
              setProcs(DEFAULTS);
              setNote("Brain rebooted. Nothing was actually resolved.");
            }}
          >
            Reboot brain
          </Button>
        </form>
      </Panel>
    </div>
  );
}
