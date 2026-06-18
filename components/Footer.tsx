import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-hairline py-12">
      <Container className="flex flex-col gap-3 font-mono text-xs uppercase tracking-[0.15em] text-graphite sm:flex-row sm:items-center sm:justify-between">
        <span><span className="text-uqpurple">The University of Queensland</span><span className="text-instrument"> · </span>SEMICON TREND</span>
        <span>Automating Security Testing of Quantum-Safe Chips</span>
        <span className="text-instrument/80">Demo figures are illustrative</span>
      </Container>
    </footer>
  );
}
