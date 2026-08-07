import type { ReactNode } from "react";

type ChipProps = {
  children: ReactNode;
  className?: string;
};

/** A tech tag — sunk into the surface so it reads quieter than the panel around it. */
export function Chip({ children, className = "" }: ChipProps) {
  return (
    <span
      className={`nm-inset-sm rounded-lg px-2.5 py-1.5 font-mono text-[11.5px] leading-none text-muted ${className}`}
    >
      {children}
    </span>
  );
}
