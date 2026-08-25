"use client";

import Link from "next/link";
import { useState } from "react";
import { NavDropdown, MobileNavGroup } from "./NavDropdown";
import { SITE_REGION_LABEL } from "@/lib/region";
import {
  serviceNavLinks,
  fraudTypeNavLinks,
  caseTypeNavLinks,
  resourcesNavLinks,
} from "@/data/navigation";

const serviceDropdownLinks = [
  { href: "/services", label: "All Services" },
  ...serviceNavLinks,
];

const tabLinks = [
  { href: "/", label: "Home" },
  { href: "/fraud-forensic-accounting-explained", label: "Overview" },
  { href: "/who-we-help", label: "Who We Help" },
];

const mobileGroups = [
  { index: "01", title: "Services", links: serviceDropdownLinks },
  {
    index: "02",
    title: "Who We Help",
    links: [
      { href: "/who-we-help", label: "Overview" },
      { href: "/who-we-help/criminal-defence-solicitors", label: "Criminal Defense" },
      { href: "/who-we-help/civil-fraud-solicitors", label: "Civil Fraud" },
      { href: "/who-we-help/corporates-compliance", label: "Corporations" },
    ],
  },
  {
    index: "03",
    title: "Fraud Types",
    links: [{ href: "/fraud-types", label: "All Fraud Types" }, ...fraudTypeNavLinks],
  },
  {
    index: "04",
    title: "Case Types",
    links: [{ href: "/case-types", label: "All Case Types" }, ...caseTypeNavLinks],
  },
  { index: "05", title: "Resources", links: resourcesNavLinks },
];

const tabLinkClass =
  "inline-flex min-h-[44px] shrink-0 items-center border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-body transition hover:border-copper/50 hover:text-navy";

export function Header() {
  const [open, setOpen] = useState(false);
  const closeMobile = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50 border-b-[3px] border-copper bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink-0 items-center gap-3">
          <span
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-copper bg-stone font-mono text-[10px] font-bold tracking-wider text-navy"
            aria-hidden
          >
            FFA
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate font-display text-base font-semibold text-navy sm:text-lg">
              Fraud Forensic Accountant
            </span>
            <span className="block truncate text-[10px] font-medium uppercase tracking-[0.18em] text-muted">
              {SITE_REGION_LABEL} referral network
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden min-h-[44px] items-center rounded-full border-2 border-navy px-5 py-2 text-sm font-semibold text-navy transition hover:bg-navy hover:text-white sm:inline-flex"
          >
            Get Matched
          </Link>
          <button
            type="button"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-sm border border-border bg-stone px-3 py-2 text-xs font-semibold uppercase tracking-wide text-navy xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? "Close" : "Index"}
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      <nav
        className="hidden border-t border-border bg-stone/60 xl:block"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-7xl items-center overflow-x-auto px-4 sm:px-6 lg:px-8">
          {tabLinks.map((link) => (
            <Link key={link.href} href={link.href} className={tabLinkClass}>
              {link.label}
            </Link>
          ))}
          <NavDropdown
            label="Services"
            href="/services"
            links={serviceDropdownLinks}
            variant="tab"
          />
          <NavDropdown label="Fraud Types" href="/fraud-types" links={fraudTypeNavLinks} variant="tab" />
          <NavDropdown label="Case Types" href="/case-types" links={caseTypeNavLinks} variant="tab" />
          <NavDropdown label="Resources" links={resourcesNavLinks} variant="tab" />
        </div>
      </nav>

      <div
        id="mobile-panel"
        aria-hidden={!open}
        className={`overflow-hidden border-t border-border bg-white transition-[max-height] duration-300 xl:hidden ${
          open ? "max-h-[min(80vh,640px)]" : "max-h-0 pointer-events-none"
        }`}
      >
        <nav className="overflow-y-auto" aria-label="Mobile">
          <Link
            href="/"
            className="flex min-h-[48px] items-center gap-3 border-b border-border px-4 py-3 text-sm font-medium text-navy hover:bg-stone"
            onClick={closeMobile}
          >
            <span className="font-mono text-xs text-copper">—</span>
            Home
          </Link>
          <Link
            href="/fraud-forensic-accounting-explained"
            className="flex min-h-[48px] items-center gap-3 border-b border-border px-4 py-3 text-sm text-body hover:bg-stone"
            onClick={closeMobile}
          >
            <span className="font-mono text-xs text-copper">—</span>
            Overview
          </Link>
          {mobileGroups.map((group) => (
            <MobileNavGroup
              key={group.title}
              index={group.index}
              title={group.title}
              links={group.links}
              onNavigate={closeMobile}
            />
          ))}
          <div className="p-4">
            <Link
              href="/contact"
              className="flex min-h-[48px] w-full items-center justify-center rounded-full border-2 border-navy bg-navy px-4 py-3 text-sm font-semibold text-white hover:bg-navy-light"
              onClick={closeMobile}
            >
              Get Matched
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
