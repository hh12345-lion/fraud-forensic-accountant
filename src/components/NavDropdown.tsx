import Link from "next/link";

export type NavLink = { href: string; label: string };

const triggerClass =
  "inline-flex min-h-[44px] items-center gap-1.5 border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition group-hover/nav:border-mint group-hover/nav:text-white group-focus-within/nav:border-mint group-focus-within/nav:text-white focus:outline-none focus-visible:text-white";

function Chevron() {
  return (
    <svg
      className="h-3.5 w-3.5 text-white/50 transition group-hover/nav:rotate-180 group-hover/nav:text-mint group-focus-within/nav:rotate-180 group-focus-within/nav:text-mint"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
    </svg>
  );
}

/**
 * Desktop dropdown. Opens on hover and keyboard focus with CSS only, so the
 * header renders on the server and the panel never needs its own scrollbar.
 */
export function NavDropdown({
  label,
  href,
  links,
}: {
  label: string;
  href?: string;
  links: NavLink[];
}) {
  const wide = links.length > 6;

  return (
    <div className="group/nav relative shrink-0">
      {href ? (
        <Link href={href} className={triggerClass}>
          {label}
          <Chevron />
        </Link>
      ) : (
        <button type="button" className={triggerClass} aria-haspopup="true">
          {label}
          <Chevron />
        </button>
      )}
      <ul
        className={`pointer-events-none invisible absolute left-0 top-full z-50 grid gap-x-2 rounded-b-md border border-t-0 border-border bg-white p-2 opacity-0 shadow-[0_18px_40px_-16px_rgba(22,33,30,0.45)] transition-opacity duration-150 group-hover/nav:pointer-events-auto group-hover/nav:visible group-hover/nav:opacity-100 group-focus-within/nav:pointer-events-auto group-focus-within/nav:visible group-focus-within/nav:opacity-100 ${
          wide ? "w-[34rem] grid-cols-2" : "w-64 grid-cols-1"
        }`}
      >
        {links.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="block rounded-sm border-l-2 border-transparent px-3 py-2.5 text-sm text-body hover:border-copper hover:bg-stone hover:text-navy focus:outline-none focus-visible:border-copper focus-visible:bg-stone"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Mobile group: a native disclosure, so it works without client state. */
export function MobileNavGroup({
  title,
  index,
  links,
}: {
  title: string;
  index?: string;
  links: NavLink[];
}) {
  return (
    <details className="group/m border-b border-white/10">
      <summary className="flex min-h-[48px] cursor-pointer list-none items-center gap-3 px-4 py-3 [&::-webkit-details-marker]:hidden">
        {index && (
          <span className="font-mono text-xs text-mint" aria-hidden>
            {index}
          </span>
        )}
        <span className="flex-1 text-sm font-medium text-white">{title}</span>
        <svg
          className="h-4 w-4 shrink-0 text-white/50 transition group-open/m:rotate-180"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </summary>
      <ul className="space-y-0.5 bg-white/5 pb-3 pl-11 pr-4 pt-1">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="flex min-h-[40px] items-center text-sm text-white/75 hover:text-mint">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </details>
  );
}
