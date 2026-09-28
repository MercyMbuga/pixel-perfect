import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Panel({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return <div className={cn("panel p-5", className)}>{children}</div>;
}

export function Label({
  children,
  className,
}: {
  children: ReactNode;
  className?: string | undefined;
}) {
  return (
    <span
      className={cn(
        "font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "chaos" | "calm";
};

export function Button({ variant = "ghost", className, ...props }: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 font-mono text-xs uppercase tracking-[0.15em] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed active:translate-y-px";
  const variants = {
    primary:
      "bg-primary text-primary-foreground hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--primary)]",
    ghost:
      "border border-border bg-secondary/40 text-foreground hover:border-primary/60 hover:text-primary",
    chaos:
      "bg-chaos text-primary-foreground hover:brightness-110 hover:shadow-[0_0_24px_-4px_var(--chaos)]",
    calm: "bg-calm/20 border border-calm/40 text-calm hover:bg-calm/30",
  } as const;
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function Input({ className, ...props }: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "w-full rounded-lg border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/70 focus:ring-2 focus:ring-primary/20",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "w-full rounded-lg border border-input bg-background/60 px-3 py-2 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/60 focus:border-primary/70 focus:ring-2 focus:ring-primary/20",
        className,
      )}
      {...props}
    />
  );
}

export function Meter({
  value,
  tone = "primary",
}: {
  value: number;
  tone?: "primary" | "warn" | "calm" | "chaos";
}) {
  const colors = {
    primary: "bg-primary",
    warn: "bg-warn",
    calm: "bg-calm",
    chaos: "bg-chaos",
  } as const;
  return (
    <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
      <div
        className={cn("h-full rounded-full transition-all duration-700", colors[tone])}
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

export function Badge({
  children,
  tone = "primary",
}: {
  children: ReactNode;
  tone?: "primary" | "warn" | "calm" | "chaos" | "muted";
}) {
  const tones = {
    primary: "border-primary/40 text-primary",
    warn: "border-warn/40 text-warn",
    calm: "border-calm/40 text-calm",
    chaos: "border-chaos/40 text-chaos",
    muted: "border-border text-muted-foreground",
  } as const;
  return (
    <span
      className={cn(
        "rounded-full border px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.18em]",
        tones[tone],
      )}
    >
      {children}
    </span>
  );
}
