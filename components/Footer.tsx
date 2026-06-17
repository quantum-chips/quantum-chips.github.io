import Container from "./Container";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-hairline py-10">
      <Container className="flex flex-col gap-2 font-mono text-xs text-graphite sm:flex-row sm:justify-between">
        <span>Quantum-Safe Silicon — research project</span>
        <span>Demo figures are illustrative simulations.</span>
      </Container>
    </footer>
  );
}
