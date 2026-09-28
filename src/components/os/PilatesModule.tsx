import { useState } from "react";
import { PILATES_MESSAGES, PILATES_SESSIONS, pick } from "@/lib/os-data";
import { useLocalState } from "@/hooks/use-local-state";
import { Badge, Button, Label, Meter, Panel, Textarea } from "./primitives";

const DAYS = ["M", "T", "W", "T", "F", "S", "S"];
const WEEKLY_GOAL = 4;

export function PilatesModule() {
  const [completed, setCompleted] = useLocalState<number>("mercy.pilates.total", 0);
  const [week, setWeek] = useLocalState<boolean[]>(
    "mercy.pilates.week",
    [false, false, false, false, false, false, false],
  );
  const [notes, setNotes] = useLocalState("mercy.pilates.notes", "");
  const [message, setMessage] = useState("System recommends controlled breathing.");

  const doneThisWeek = week.filter(Boolean).length;
  const progress = Math.min(100, (doneThisWeek / WEEKLY_GOAL) * 100);

  function complete(minutes: number) {
    const today = (new Date().getDay() + 6) % 7;
    setWeek((w) => w.map((v, i) => (i === today ? true : v)));
    setCompleted((c) => c + 1);
    setMessage(`${pick(PILATES_MESSAGES)} (${minutes} min logged)`);
  }

  return (
    <div className="space-y-4">
      <Panel className="border-calm/30 bg-calm/5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <Label className="text-calm">Mobility.exe</Label>
            <p className="mt-1 font-mono text-sm text-calm">{message}</p>
          </div>
          <Badge tone="calm">{completed} sessions completed</Badge>
        </div>
        <div className="mt-5 space-y-2">
          <div className="flex justify-between font-mono text-xs text-muted-foreground">
            <span>Weekly consistency</span>
            <span className="text-calm">
              {doneThisWeek}/{WEEKLY_GOAL}
            </span>
          </div>
          <Meter value={progress} tone="calm" />
          <div className="mt-3 flex gap-2">
            {week.map((done, i) => (
              <button
                key={i}
                onClick={() => setWeek((w) => w.map((v, j) => (j === i ? !v : v)))}
                aria-label={`Toggle day ${i + 1}`}
                className={`flex h-9 flex-1 items-center justify-center rounded-md border font-mono text-xs transition-colors ${
                  done
                    ? "border-calm/60 bg-calm/25 text-calm"
                    : "border-border bg-secondary/30 text-muted-foreground hover:border-calm/40"
                }`}
              >
                {DAYS[i]}
              </button>
            ))}
          </div>
        </div>
      </Panel>

      <div className="grid gap-4 sm:grid-cols-2">
        {PILATES_SESSIONS.map((s) => (
          <Panel key={s.id} className="border-calm/20">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-medium">{s.title}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {s.minutes} min · {s.level}
                </p>
              </div>
              <Badge tone="calm">{s.level}</Badge>
            </div>
            <Button variant="calm" className="mt-4 w-full" onClick={() => complete(s.minutes)}>
              Mark completed
            </Button>
          </Panel>
        ))}
      </div>

      <Panel className="border-calm/20">
        <Label className="text-calm">Notes (optional)</Label>
        <Textarea
          rows={3}
          className="mt-2"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Breathing was steady. Wrists complained."
        />
        <div className="mt-3 flex gap-2">
          <Button
            onClick={() => {
              setWeek([false, false, false, false, false, false, false]);
              setMessage("Week reset. Consistency counter re-initializing.");
            }}
          >
            Reset week
          </Button>
        </div>
      </Panel>
    </div>
  );
}
