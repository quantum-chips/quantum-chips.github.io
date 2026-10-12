import Link from "next/link";

// Quiet in-section link ("The problem in full →"): muted until hovered.
export default function TextLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex items-center gap-1.5 text-sm text-fg-muted transition-colors duration-150 ease-out hover:text-fg"
    >
      {children}
      <span aria-hidden className="transition-transform duration-150 ease-out group-hover:translate-x-0.5">
        →
      </span>
    </Link>
  );
}
