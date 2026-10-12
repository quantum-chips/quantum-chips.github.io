import Container from "./Container";

// A page band: hairline on top, a real h2 when the section has a title. No eyebrow
// labels — the heading says what the section is.
export default function Section({
  id,
  title,
  intro,
  bordered = true,
  flushTop = false,
  className = "",
  children,
}: {
  id?: string;
  title?: string;
  intro?: React.ReactNode;
  bordered?: boolean;
  // Drop the top padding when the band continues straight on from a page header.
  flushTop?: boolean;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section id={id} className={`scroll-mt-20 ${bordered ? "border-t border-line" : ""} ${className}`}>
      <Container className={flushTop ? "pb-20 md:pb-24" : "py-20 md:py-24"}>
        {title && (
          <h2 className="max-w-2xl text-[clamp(1.75rem,3.2vw,2.25rem)] font-semibold leading-tight tracking-[-0.025em]">
            {title}
          </h2>
        )}
        {intro && <div className="mt-4 max-w-2xl text-lg leading-relaxed text-fg-muted">{intro}</div>}
        {children && <div className={title || intro ? "mt-10 md:mt-12" : ""}>{children}</div>}
      </Container>
    </section>
  );
}
