"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Container from "./Container";

// Ordered to follow the module's own narrative: what we test, why it matters,
// what can go wrong, how we test, see it run — then the supporting pages.
const LINKS = [
  { href: "/chip-testing/", label: "Chip Testing" },
  { href: "/problem/", label: "Problem" },
  { href: "/threat-model/", label: "Threat Model" },
  { href: "/method/", label: "Method" },
  { href: "/demo/", label: "Demo" },
  { href: "/team/", label: "Team" },
  { href: "/resources/", label: "Resources" },
];

export default function Nav() {
  // usePathname returns null when rendered outside the app router (e.g. in unit
  // tests); the nullish default just means no link is marked current.
  const pathname = usePathname() ?? "";

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ground/80 backdrop-blur-md">
      <Container className="flex flex-col gap-2 py-3 lg:h-14 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:py-0">
        <Link href="/" className="whitespace-nowrap text-[15px] font-semibold tracking-tight text-fg transition-opacity hover:opacity-80">
          Quantum-Safe Transition
        </Link>
        <nav
          aria-label="Primary"
          // Below lg the seven links don't fit beside the brand (they need ~900px), so
          // they sit on their own row and scroll sideways, bleeding to the container
          // edge; the fade at the right says there is more.
          className="-mx-6 flex gap-x-1 overflow-x-auto whitespace-nowrap px-6 text-sm [mask-image:linear-gradient(to_right,black_82%,transparent)] md:-mx-8 md:px-8 lg:mx-0 lg:overflow-visible lg:px-0 lg:[mask-image:none]"
        >
          {LINKS.map((l) => {
            const current = pathname.replace(/\/$/, "") === l.href.replace(/\/$/, "");
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={current ? "page" : undefined}
                className={`shrink-0 rounded-sm px-2.5 py-1.5 transition-colors duration-150 ease-out ${
                  current ? "bg-raised text-fg" : "text-fg-muted hover:text-fg"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>
      </Container>
    </header>
  );
}
