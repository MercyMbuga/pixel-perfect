import { useState } from "react";
import { useLocalState } from "@/hooks/use-local-state";
import { Badge, Button, Input, Label, Panel } from "./primitives";

type Status = "Watching" | "Paused" | "Completed" | "Abandoned";
const STATUSES: Status[] = ["Watching", "Paused", "Completed", "Abandoned"];

type Show = {
  id: string;
  title: string;
  season: number;
  episode: number;
  status: Status;
};

export function EntertainmentModule() {
  const [shows, setShows] = useLocalState<Show[]>("mercy.shows", []);
  const [title, setTitle] = useState("");
  const [season, setSeason] = useState("1");
  const [episode, setEpisode] = useState("1");

  function add(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    setShows((s) => [
      ...s,
      {
        id: crypto.randomUUID(),
        title: title.trim(),
        season: Number(season) || 1,
        episode: Number(episode) || 1,
        status: "Watching",
      },
    ]);
    setTitle("");
    setSeason("1");
    setEpisode("1");
  }

  function update(id: string, patch: Partial<Show>) {
    setShows((s) => s.map((x) => (x.id === id ? { ...x, ...patch } : x)));
  }

  return (
    <div className="space-y-4">
      <Panel className="flex flex-wrap items-center justify-between gap-2">
        <Label>Media subsystem</Label>
        <Badge tone="chaos">Spoiler protection: MAXIMUM</Badge>
      </Panel>

      <Panel>
        <Label>Register media</Label>
        <form onSubmit={add} className="mt-3 flex flex-wrap gap-2">
          <Input
            className="flex-1 min-w-[160px]"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Input
            className="w-24"
            type="number"
            min={1}
            aria-label="Season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
          />
          <Input
            className="w-24"
            type="number"
            min={1}
            aria-label="Episode"
            value={episode}
            onChange={(e) => setEpisode(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
        <p className="mt-2 font-mono text-[11px] text-muted-foreground">
          Plot details are never stored or displayed. The system refuses to spoil anything.
        </p>
      </Panel>

      {shows.length === 0 ? (
        <Panel>
          <p className="font-mono text-sm text-muted-foreground">
            No media registered. The queue is empty and so, briefly, is the guilt.
          </p>
        </Panel>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {shows.map((s) => (
            <Panel key={s.id}>
              <div className="flex items-start justify-between gap-2">
                <p className="font-medium">{s.title}</p>
                <button
                  onClick={() => setShows((l) => l.filter((x) => x.id !== s.id))}
                  className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
                >
                  delete
                </button>
              </div>
              <p className="mt-1 font-mono text-xs text-primary">
                S{String(s.season).padStart(2, "0")} · E{String(s.episode).padStart(2, "0")}
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Button onClick={() => update(s.id, { episode: s.episode + 1 })}>+1 episode</Button>
                <Button
                  onClick={() => update(s.id, { season: s.season + 1, episode: 1 })}
                >
                  Next season
                </Button>
              </div>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {STATUSES.map((st) => (
                  <button
                    key={st}
                    onClick={() => update(s.id, { status: st })}
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.15em] transition-colors ${
                      s.status === st
                        ? "border-primary/60 bg-primary/15 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      )}
    </div>
  );
}
