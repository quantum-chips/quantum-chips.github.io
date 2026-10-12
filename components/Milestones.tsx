import Link from "next/link";
import { MILESTONES } from "@/content/milestones";

// Where the module stands. Only delivered work carries a date and the accent dot.
export default function Milestones() {
  return (
    <ol className="grid gap-3 md:grid-cols-3">
      {MILESTONES.map((m) => {
        const delivered = m.status === "Delivered";
        return (
          <li
            key={m.id}
            className={`rounded-lg border p-6 ${delivered ? "border-line-strong bg-panel" : "border-line"}`}
          >
            <p className={`flex items-center gap-2 font-mono text-[11px] ${delivered ? "text-accent" : "text-fg-subtle"}`}>
              {delivered && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />}
              {delivered ? `${m.id} · Delivered ${m.when}` : m.status}
            </p>
            <h3 className="mt-4 text-base font-medium text-fg">
              {m.href ? (
                <Link href={m.href} className="group underline-offset-4 hover:underline">
                  {m.title}
                  <span aria-hidden className="ml-1.5 inline-block transition-transform duration-150 group-hover:translate-x-0.5">
                    →
                  </span>
                </Link>
              ) : (
                m.title
              )}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-fg-muted">{m.body}</p>
          </li>
        );
      })}
    </ol>
  );
}
