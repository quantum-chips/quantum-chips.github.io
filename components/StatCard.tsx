export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-hairline/70 bg-surface p-6 shadow-card transition-shadow duration-300 hover:shadow-none">
      <div className="font-display text-3xl font-bold tracking-tight text-ink [font-variant-numeric:tabular-nums]">{value}</div>
      <p className="mt-3 text-sm leading-relaxed text-graphite">{label}</p>
    </div>
  );
}
