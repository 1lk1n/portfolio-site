import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/** A tech tag — a page-coloured pill on a grey card, in full-strength type so the stack reads at a glance. */
export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`rounded-full bg-background px-3 py-1.5 text-xs leading-none text-foreground ${className}`}
    >
      {children}
    </span>
  );
}
