"use client";

import Link from "next/link";
import { useState } from "react";

export type NavLink = { href: string; label: string };

export function NavDropdown({
  label,
  href,
  links,
  onNavigate,
  variant = "light",
}: {
  label: string;
  href?: string;
  links: NavLink[];
  onNavigate?: () => void;
  variant?: "light" | "dark";
}) {
  const [open, setOpen] = useState(false);
  const isDark = variant === "dark";

  const triggerClass = isDark
    ? "rounded-sm px-3 py-2 text-sm text-white/85 transition hover:text-white"
    : "rounded-sm px-3 py-2 text-sm text-body transition hover:text-navy";

  const chevronClass = isDark
    ? `flex min-h-[44px] min-w-[32px] items-center justify-center rounded-sm px-1 py-2 text-white/70 ${open ? "text-white" : ""}`
    : `flex min-h-[44px] min-w-[32px] items-center justify-center rounded-sm px-1 py-2 text-muted ${open ? "text-navy" : ""}`;

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className="flex items-center">
        {href ? (
          <Link href={href} className={triggerClass}>
            {label}
          </Link>
        ) : (
          <span className={triggerClass}>{label}</span>
        )}
        <span className={chevronClass} aria-hidden>
          <svg
            className={`h-4 w-4 transition ${open ? "rotate-180" : ""}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
      <ul
        role="menu"
        className={`absolute left-0 top-full z-50 mt-1 max-h-[min(70vh,24rem)] min-w-[16rem] overflow-y-auto rounded-sm border border-border bg-white py-2 shadow-lg transition-opacity duration-150 ${
          open
            ? "pointer-events-auto visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        }`}
      >
        {links.map((link) => (
          <li key={link.href} role="none">
            <Link
              href={link.href}
              role="menuitem"
              className="block border-l-2 border-transparent px-4 py-2.5 text-sm text-body hover:border-copper hover:bg-stone hover:text-navy"
              onClick={() => {
                setOpen(false);
                onNavigate?.();
              }}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MobileNavGroup({
  title,
  links,
  onNavigate,
}: {
  title: string;
  links: NavLink[];
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="mb-1">
      <button
        type="button"
        className="flex min-h-[44px] w-full items-center justify-between border-l-2 border-copper bg-stone/50 px-3 py-2 text-left text-xs font-semibold tracking-wide text-navy uppercase"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {title}
        <svg
          className={`h-4 w-4 transition ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <ul className="mt-1 space-y-0.5 border-l border-border pl-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-[44px] items-center px-3 py-2 text-sm text-body hover:text-copper"
                onClick={onNavigate}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
