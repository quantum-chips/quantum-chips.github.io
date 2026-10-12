import Container from "./Container";
import Pill from "./Pill";
import Headline from "./Headline";

// Shared hero for the project home and the module landing: statement on top, the
// "product shot" pinned underneath. Each page passes its own shot, so the two
// read as related but never identical.
export default function Hero({
  pill,
  title,
  lede,
  actions,
  children,
}: {
  pill: string;
  title: string;
  lede: string;
  actions: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero-mesh relative overflow-hidden">
      <Container className="pb-16 pt-16 md:pb-24 md:pt-28">
        <Pill>{pill}</Pill>
        <h1 className="mt-6 max-w-3xl text-[clamp(2.5rem,5.6vw,4rem)] font-semibold leading-[1.04] tracking-[-0.035em]">
          <Headline text={title} />
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">{lede}</p>
        <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        {children && <div className="mt-14 md:mt-20">{children}</div>}
      </Container>
    </section>
  );
}
