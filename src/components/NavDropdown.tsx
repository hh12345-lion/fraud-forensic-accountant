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
  variant?: "light" | "dark" | "tab";
}) {
  const [open, setOpen] = useState(false);

  const triggerClass =
    variant === "tab"
      ? "inline-flex min-h-[44px] items-center gap-1 border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-body transition hover:border-copper/50 hover:text-navy"
      : variant === "dark"
        ? "rounded-sm px-3 py-2 text-sm text-white/85 transition hover:text-white"
        : "rounded-sm px-3 py-2 text-sm text-body transition hover:text-navy";

  const chevronClass =
    variant === "tab"
      ? `text-muted ${open ? "text-copper" : ""}`
      : variant === "dark"
        ? `flex min-h-[44px] min-w-[32px] items-center justify-center rounded-sm px-1 py-2 text-white/70 ${open ? "text-white" : ""}`
        : `flex min-h-[44px] min-w-[32px] items-center justify-center rounded-sm px-1 py-2 text-muted ${open ? "text-navy" : ""}`;

  const openTabClass = variant === "tab" && open ? "border-copper text-navy" : "";

  return (
    <div
      className="relative shrink-0"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div className={`flex items-center ${openTabClass}`}>
        {href ? (
          <Link href={href} className={`${triggerClass} ${openTabClass}`}>
            {label}
          </Link>
        ) : (
          <span className={`${triggerClass} ${openTabClass}`}>{label}</span>
        )}
        <span className={chevronClass} aria-hidden>
          <svg
            className={`h-3.5 w-3.5 transition ${open ? "rotate-180" : ""}`}
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
        className={`absolute left-0 top-full z-50 mt-0 max-h-[min(70vh,24rem)] min-w-[16rem] overflow-y-auto border border-border bg-white py-2 shadow-lg transition-opacity duration-150 ${
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
  index,
  links,
  onNavigate,
}: {
  title: string;
  index?: string;
  links: NavLink[];
  onNavigate?: () => void;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex min-h-[48px] w-full items-center gap-3 px-4 py-3 text-left"
        aria-expanded={expanded}
        onClick={() => setExpanded(!expanded)}
      >
        {index && (
          <span className="font-mono text-xs text-copper" aria-hidden>
            {index}
          </span>
        )}
        <span className="flex-1 text-sm font-medium text-navy">{title}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-muted transition ${expanded ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {expanded && (
        <ul className="space-y-0.5 bg-stone/40 pb-3 pl-11 pr-4">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="flex min-h-[40px] items-center text-sm text-body hover:text-copper"
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
