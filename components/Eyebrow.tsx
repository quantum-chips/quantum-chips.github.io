export default function Eyebrow({ index, children }: { index?: string; children: React.ReactNode }) {
  return (
    <p className="font-mono text-xs uppercase tracking-widest text-graphite">
      {index ? <span className="text-instrument">[{index}]</span> : null} {children}
    </p>
  );
}
