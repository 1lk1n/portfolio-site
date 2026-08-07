import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/** A tech tag — a quiet page-coloured pill that sits on a grey card. */
export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`rounded-full bg-background px-3 py-1.5 text-xs leading-none text-muted ${className}`}
    >
      {children}
    </span>
  );
}
