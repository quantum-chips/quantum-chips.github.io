// A row of headline figures divided by hairlines — one shared surface, not a
// card per number.
export default function StatBand({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="grid overflow-hidden rounded-lg border border-line-strong sm:grid-cols-3">
      {stats.map((s) => (
        <div key={s.value} className="border-b border-line p-6 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
          <p className="text-3xl font-semibold tracking-[-0.03em] text-fg">{s.value}</p>
          <p className="mt-2 text-sm leading-relaxed text-fg-muted">{s.label}</p>
        </div>
      ))}
    </div>
  );
}
