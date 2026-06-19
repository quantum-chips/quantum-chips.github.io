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
    <header className="sticky top-0 z-40 border-t-[3px] border-t-uqpurple border-b border-b-hairline/80 bg-paper/70 backdrop-blur-md">
      <Container className="flex flex-col gap-1.5 py-3 sm:h-16 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:py-0">
        <Link
          href="/"
          className="font-display text-base font-bold tracking-tight transition-opacity hover:opacity-70 sm:text-lg"
        >
          Quantum-Safe<span className="text-instrument">·</span>Transition
        </Link>
        <nav className="-mx-6 flex gap-x-4 gap-y-1 overflow-x-auto whitespace-nowrap px-6 font-mono text-[13px] sm:mx-0 sm:flex-wrap sm:justify-end sm:gap-x-6 sm:overflow-visible sm:px-0">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="shrink-0 text-graphite transition-colors duration-200 hover:text-ink"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}
