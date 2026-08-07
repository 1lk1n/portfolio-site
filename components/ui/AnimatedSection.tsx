import type { ReactNode } from "react";

type AnimatedSectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
};

/**
 * Sections sit directly on the page colour — rhythm comes from whitespace and
 * from grey cards inside each section, not from alternating background bands.
 */
export function AnimatedSection({ id, children, className = "" }: AnimatedSectionProps) {
  return (
    <section id={id} className={`scroll-mt-20 py-16 md:py-24 ${className}`}>
      <div className="mx-auto max-w-5xl px-5 md:px-6">{children}</div>
    </section>
  );
}
