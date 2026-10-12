// Small mono label in a hairline capsule. The accent dot marks something live or
// active — use it sparingly, it is one of the few places the accent appears.
export default function Pill({ children, dot = false }: { children: React.ReactNode; dot?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-panel px-3 py-1 font-mono text-xs text-fg-muted">
      {dot && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
      {children}
    </span>
  );
}
