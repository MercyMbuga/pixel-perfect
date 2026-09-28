import { useState } from "react";
import { useLocalState } from "@/hooks/use-local-state";
import { Badge, Button, Input, Label, Meter, Panel } from "./primitives";

type Expense = { id: string; name: string; amount: number };

export function FinanceModule() {
  const [amount, setAmount] = useLocalState("mercy.finance.amount", 5000);
  const [days, setDays] = useLocalState("mercy.finance.days", 7);
  const [expenses, setExpenses] = useLocalState<Expense[]>("mercy.finance.expenses", []);
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");

  const spent = expenses.reduce((a, e) => a + e.amount, 0);
  const remaining = amount - spent;
  const daily = days > 0 ? remaining / days : 0;
  const survival = daily > 0 ? remaining / Math.max(1, spent / Math.max(1, expenses.length) || 300) : 0;
  const health = amount > 0 ? Math.max(0, Math.min(100, (remaining / amount) * 100)) : 0;

  const status =
    remaining <= 0
      ? { text: "SYSTEM OFFLINE", tone: "chaos" as const, msg: "Impulse purchases: RETROACTIVELY DENIED." }
      : health < 30
        ? { text: "LOW POWER MODE", tone: "warn" as const, msg: "Transport: REQUIRED. Everything else: negotiable." }
        : health < 65
          ? { text: "RATIONING", tone: "warn" as const, msg: "Food: REQUIRED. Impulse purchases: DENIED." }
          : { text: "OPERATIONAL", tone: "primary" as const, msg: "Stability detected. Do not celebrate with shopping." };

  function addExpense(e: React.FormEvent) {
    e.preventDefault();
    const value = Number(cost);
    if (!name.trim() || !Number.isFinite(value) || value <= 0) return;
    setExpenses((list) => [
      ...list,
      { id: crypto.randomUUID(), name: name.trim(), amount: value },
    ]);
    setName("");
    setCost("");
  }

  return (
    <div className="space-y-4">
      <Panel>
        <Label>Budget input</Label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <div className="space-y-1.5">
            <Label>Money available</Label>
            <Input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </div>
          <div className="space-y-1.5">
            <Label>Number of days</Label>
            <Input
              type="number"
              min={1}
              value={days}
              onChange={(e) => setDays(Math.max(1, Number(e.target.value)))}
            />
          </div>
        </div>
        <form onSubmit={addExpense} className="mt-4 flex flex-wrap gap-2">
          <Input
            className="flex-1 min-w-[140px]"
            placeholder="Expense (e.g. matatu)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            className="w-32"
            type="number"
            min={0}
            placeholder="Amount"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
          />
          <Button variant="primary" type="submit">
            Add
          </Button>
        </form>
        {expenses.length > 0 && (
          <ul className="mt-3 divide-y divide-border font-mono text-sm">
            {expenses.map((ex) => (
              <li key={ex.id} className="flex items-center justify-between py-2">
                <span>{ex.name}</span>
                <span className="flex items-center gap-3">
                  <span className="text-warn">-{ex.amount.toLocaleString()}</span>
                  <button
                    onClick={() => setExpenses((l) => l.filter((x) => x.id !== ex.id))}
                    className="text-[11px] uppercase tracking-widest text-muted-foreground hover:text-destructive"
                  >
                    remove
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}
      </Panel>

      <Panel>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <Label>Financial alert</Label>
          <Badge tone={status.tone}>{status.text}</Badge>
        </div>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <Stat label="Daily budget" value={daily.toFixed(0)} />
          <Stat label="Remaining balance" value={remaining.toLocaleString()} />
          <Stat label="Survival capacity" value={`${survival.toFixed(1)} d`} />
        </div>
        <div className="mt-4 space-y-2">
          <Meter value={health} tone={status.tone === "primary" ? "primary" : status.tone} />
          <p className="font-mono text-sm text-muted-foreground">{status.msg}</p>
        </div>
      </Panel>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/30 p-3">
      <Label>{label}</Label>
      <p className="mt-1 font-mono text-xl text-primary text-glow">{value}</p>
    </div>
  );
}
