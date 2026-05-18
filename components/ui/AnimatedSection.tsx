import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  alternate?: boolean;
};

export function AnimatedSection({
  id,
  children,
  className = "",
  alternate = false,
}: AnimatedSectionProps) {
  return (
    <section
      id={id}
      className={`py-20 md:py-28 ${alternate ? "bg-white" : "bg-cream"} ${className}`}
    >
      <div className="mx-auto max-w-6xl px-6">{children}</div>
    </section>
  );
}
