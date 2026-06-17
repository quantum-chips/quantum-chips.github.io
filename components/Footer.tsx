import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-hairline py-12">
      <Container className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.15em] text-graphite sm:flex-row sm:items-center sm:justify-between">
        <span className="text-ink">Quantum-Safe<span className="text-instrument">·</span>Silicon</span>
        <span>Research project</span>
        <span className="text-instrument/80">Demo figures are illustrative simulations</span>
      </Container>
    </footer>
  );
}
