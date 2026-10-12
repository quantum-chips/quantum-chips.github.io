import Container from "./Container";
import Pill from "./Pill";
import Headline from "./Headline";

// Header for inner pages: a quieter sibling of Hero (smaller title, no product shot).
export default function PageHeader({
  pill,
  title,
  lede,
  children,
}: {
  pill?: string;
  title: string;
  lede?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <section className="hero-mesh">
      <Container className="pb-14 pt-16 md:pb-20 md:pt-24">
        {pill && <Pill>{pill}</Pill>}
        <h1 className={`${pill ? "mt-6 " : ""}max-w-3xl text-[clamp(2.25rem,4.8vw,3.5rem)] font-semibold leading-[1.05] tracking-[-0.03em]`}>
          <Headline text={title} />
        </h1>
        {lede && <div className="mt-5 max-w-2xl text-lg leading-relaxed text-fg-muted">{lede}</div>}
        {children && <div className="mt-10 md:mt-12">{children}</div>}
      </Container>
    </section>
  );
}
