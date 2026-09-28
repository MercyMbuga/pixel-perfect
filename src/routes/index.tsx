import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { BrainModule } from "@/components/os/BrainModule";
import { ChaosMode } from "@/components/os/ChaosMode";
import { DevOpsModule } from "@/components/os/DevOpsModule";
import { EntertainmentModule } from "@/components/os/EntertainmentModule";
import { FinanceModule } from "@/components/os/FinanceModule";
import { PilatesModule } from "@/components/os/PilatesModule";
import { RomanceModule } from "@/components/os/RomanceModule";
import { Badge, Button, Label, Meter, Panel } from "@/components/os/primitives";
import { SystemCheck } from "@/components/os/SystemCheck";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MERCY.EXE — Personal Operating System" },
      {
        name: "description",
        content:
          "A fictional personal operating system: run system checks, debug DevOps skills, budget for survival, track Pilates, and enter chaos mode.",
      },
      { property: "og:title", content: "MERCY.EXE — Personal Operating System" },
      {
        property: "og:description",
        content:
          "Diagnostics, a fake terminal, relationship incident response, budget survival maths, and a chaos daemon.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Desktop,
});

const MODULES = [
  { id: "brain", icon: "🧠", name: "Brain", desc: "Process manager for thoughts", status: "34% load" },
  { id: "devops", icon: "💻", name: "DevOps", desc: "Skills, incidents, terminal", status: "Progressing" },
  { id: "romance", icon: "❤️", name: "Romance", desc: "Incident response unit", status: "Supervised" },
  { id: "finance", icon: "💰", name: "Finance", desc: "Survival budget simulator", status: "Low power" },
  { id: "pilates", icon: "🧘🏾‍♀️", name: "Pilates", desc: "Consistency tracker", status: "Initializing" },
  { id: "entertainment", icon: "📺", name: "Entertainment", desc: "Watchlist, spoiler-safe", status: "Protected" },
] as const;

type ModuleId = (typeof MODULES)[number]["id"];

function Desktop() {
  const [open, setOpen] = useState<ModuleId | null>(null);
  const [chaos, setChaos] = useState(false);
  const [health, setHealth] = useState(78);
  const [clock, setClock] = useState("");

  useEffect(() => {
    const tick = () =>
      setClock(
        new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" }),
      );
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  const active = MODULES.find((m) => m.id === open);

  return (
    <main className={`min-h-screen px-4 py-8 sm:px-8 ${chaos ? "chaos-shake" : ""}`}>
      <div className="mx-auto max-w-5xl space-y-6">
        <header className="panel scanlines glow flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <h1 className="font-mono text-3xl font-bold tracking-[0.18em] text-primary text-glow sm:text-4xl">
              MERCY.EXE
            </h1>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
              Personal Operating System v1.0
            </p>
          </div>
          <div className="space-y-2 text-right">
            <div className="flex items-center justify-end gap-2">
              <span className="h-2 w-2 animate-pulse rounded-full bg-primary" />
              <Badge tone={chaos ? "chaos" : "primary"}>
                {chaos ? "Online (unstable)" : "Online"}
              </Badge>
            </div>
            <p className="font-mono text-xs text-muted-foreground">{clock}</p>
            <div className="w-44">
              <Meter value={health} tone={health > 75 ? "primary" : health > 55 ? "warn" : "chaos"} />
              <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                System health {health}%
              </p>
            </div>
          </div>
        </header>

        <SystemCheck onHealth={setHealth} />

        <ChaosMode active={chaos} setActive={setChaos} />

        <section>
          <div className="mb-3 flex items-center justify-between">
            <Label>Installed modules</Label>
            {open && <Button onClick={() => setOpen(null)}>Close module</Button>}
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {MODULES.map((m) => (
              <button
                key={m.id}
                onClick={() => setOpen(open === m.id ? null : m.id)}
                className={`panel group p-5 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 ${
                  open === m.id ? "border-primary/60 glow" : ""
                }`}
              >
                <div className="flex items-start justify-between">
                  <span className="text-2xl">{m.icon}</span>
                  <Badge tone="muted">{m.status}</Badge>
                </div>
                <p className="mt-3 font-mono text-sm uppercase tracking-[0.16em] text-foreground group-hover:text-primary">
                  {m.name}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{m.desc}</p>
                <span className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.2em] text-primary">
                  {open === m.id ? "▾ opened" : "▸ open module"}
                </span>
              </button>
            ))}
          </div>
        </section>

        {active && (
          <section className="animate-fade-in space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h2 className="font-mono text-lg uppercase tracking-[0.2em] text-primary text-glow">
                {active.icon} {active.name} module
              </h2>
              <Button onClick={() => setOpen(null)}>Close</Button>
            </div>
            {open === "brain" && <BrainModule />}
            {open === "devops" && <DevOpsModule />}
            {open === "romance" && <RomanceModule />}
            {open === "finance" && <FinanceModule />}
            {open === "pilates" && <PilatesModule />}
            {open === "entertainment" && <EntertainmentModule />}
          </section>
        )}

        <Panel className="text-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
            Mercy.exe — no cloud, no login, everything stored on this device.
          </p>
        </Panel>
      </div>
    </main>
  );
}
