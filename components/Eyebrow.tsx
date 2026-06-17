export default function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-[0.22em] text-graphite">
      <span aria-hidden className="h-px w-7 bg-instrument/70" />
      {index ? <span className="text-instrument">{index}</span> : null}
      <span>{children}</span>
    </p>
  );
}
