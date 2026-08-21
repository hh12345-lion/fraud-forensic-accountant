import Link from "next/link";

export function CardGrid({
  items,
}: {
  items: { title: string; description: string; href: string }[];
}) {
  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className="group block border border-border bg-white p-6 shadow-[var(--shadow-elevated)] transition hover:border-copper/40"
        >
          <h3 className="font-display text-lg font-semibold text-navy group-hover:text-copper">
            {item.title}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-body">{item.description}</p>
          <span className="mt-4 inline-block text-sm font-medium text-copper">
            Learn more →
          </span>
        </Link>
      ))}
    </div>
  );
}
