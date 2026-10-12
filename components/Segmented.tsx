"use client";

// A row of mutually exclusive toggle buttons (aria-pressed), e.g. filters.
export default function Segmented<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: [T, string][];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div role="group" aria-label={label} className="inline-flex rounded-sm border border-line-strong bg-panel p-0.5">
      {options.map(([v, text]) => (
        <button
          key={v}
          type="button"
          aria-pressed={value === v}
          onClick={() => onChange(v)}
          className={`rounded-[4px] px-3 py-1.5 text-[13px] transition-colors duration-150 ease-out ${
            value === v ? "bg-lift text-fg" : "text-fg-muted hover:text-fg"
          }`}
        >
          {text}
        </button>
      ))}
    </div>
  );
}
