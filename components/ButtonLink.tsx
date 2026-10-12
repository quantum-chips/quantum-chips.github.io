import Link from "next/link";

// Primary: the one action a section wants. Secondary: a quieter alternative.
// Both are links — every call to action on this site navigates.
export default function ButtonLink({
  href,
  children,
  variant = "primary",
}: {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary";
}) {
  const look =
    variant === "primary"
      ? "bg-fg text-ground hover:bg-white"
      : "border border-line-strong text-fg hover:bg-raised";
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 rounded-sm px-4 py-2.5 text-sm font-medium transition-colors duration-150 ease-out ${look}`}
    >
      {children}
    </Link>
  );
}
