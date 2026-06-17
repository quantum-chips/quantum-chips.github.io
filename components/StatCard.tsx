export default function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="border border-hairline bg-white/40 p-5">
      <div className="font-display text-2xl font-bold text-ink">{value}</div>
      <p className="mt-2 text-sm leading-snug text-graphite">{label}</p>
    </div>
  );
}
