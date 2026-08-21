import Link from "next/link";

export type Crumb = { label: string; href?: string };

export function Breadcrumbs({
  items,
  variant = "dark",
}: {
  items: Crumb[];
  variant?: "dark" | "light";
}) {
  const textClass = variant === "light" ? "text-muted" : "text-white/60";
  const activeClass = variant === "light" ? "text-navy" : "text-white/80";
  const hoverClass = variant === "light" ? "hover:text-copper" : "hover:text-white/80";

  return (
    <nav aria-label="Breadcrumb" className={`mb-6 text-sm ${textClass}`}>
      <ol className="flex flex-wrap items-center gap-1">
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1">
            {i > 0 && <span aria-hidden="true" className="text-border">/</span>}
            {item.href ? (
              <Link href={item.href} className={hoverClass}>
                {item.label}
              </Link>
            ) : (
              <span className={activeClass}>{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
