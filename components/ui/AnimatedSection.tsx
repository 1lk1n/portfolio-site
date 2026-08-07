import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Sections never change background — in a neumorphic layout every surface shares
 * the page colour, and alternating bands would break the single light source.
 */
export function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-14 md:py-20 ${className}`}>
      <div className="mx-auto max-w-5xl px-5 md:px-6">{children}</div>
    </section>
  );
}
