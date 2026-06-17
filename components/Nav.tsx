import Link from "next/link";
import Container from "./Container";

const LINKS = [
  { href: "/problem", label: "Problem" },
  { href: "/demo", label: "Demo" },
  { href: "/method", label: "Method" },
  { href: "/team", label: "Team" },
  { href: "/resources", label: "Resources" },
];

export default function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b border-hairline bg-paper/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-tight">
          Quantum-Safe<span className="text-instrument">·</span>Silicon
        </Link>
        <nav className="flex gap-6 font-mono text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-graphite hover:text-ink">
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
