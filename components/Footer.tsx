import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-line py-10">
      <Container className="flex flex-col gap-3 text-[13px] text-fg-subtle sm:flex-row sm:items-center sm:justify-between sm:gap-8">
        <p>
          <span className="text-fg-muted">The University of Queensland</span>
          <span aria-hidden> · </span>QDSA Collaborative Research Grant
        </p>
        <p className="font-mono text-xs">Demo figures are illustrative</p>
      </Container>
    </footer>
  );
}
