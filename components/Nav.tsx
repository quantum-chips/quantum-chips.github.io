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
    <header className="sticky top-0 z-40 border-b border-hairline/80 bg-paper/70 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-lg font-bold tracking-tight transition-opacity hover:opacity-70">
          Quantum-Safe<span className="text-instrument">·</span>Silicon
        </Link>
        <nav className="flex flex-wrap justify-end gap-x-6 gap-y-1 font-mono text-[13px]">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-graphite transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
