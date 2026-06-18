// `index` is accepted for call-site compatibility but no longer rendered —
// decorative section numbers were dropped in favour of the tick + label.
export default function Eyebrow({ children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-graphite">
      <span aria-hidden className="h-px w-7 bg-uqpurple/70" />
      <span>{children}</span>
    </p>
  );
}
