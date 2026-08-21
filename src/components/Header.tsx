"use client";

import Link from "next/link";
import { useState } from "react";
import { NavDropdown, MobileNavGroup } from "./NavDropdown";
import { SITE_EMAIL } from "@/lib/site";
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

const mobileGroups = [
  { title: "Services", links: serviceDropdownLinks },
  {
    title: "Who We Help",
    links: [
      { href: "/who-we-help", label: "Overview" },
      { href: "/who-we-help/criminal-defence-solicitors", label: "Criminal Defense" },
      { href: "/who-we-help/civil-fraud-solicitors", label: "Civil Fraud" },
      { href: "/who-we-help/corporations-compliance", label: "Corporations" },
    ],
  },
  {
    title: "Fraud Types",
    links: [{ href: "/fraud-types", label: "All Fraud Types" }, ...fraudTypeNavLinks],
  },
  {
    title: "Case Types",
    links: [{ href: "/case-types", label: "All Case Types" }, ...caseTypeNavLinks],
  },
  { title: "Resources", links: resourcesNavLinks },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const closeMobile = () => setOpen(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border bg-stone">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs text-muted sm:px-6 lg:px-8">
          <span className="font-medium tracking-wide text-navy uppercase">
            {SITE_REGION_LABEL} forensic accounting network
          </span>
          <a
            href={`mailto:${SITE_EMAIL}`}
            className="hidden hover:text-copper sm:inline-flex"
          >
            {SITE_EMAIL}
          </a>
        </div>
      </div>

      <div className="border-b border-navy-light/40 bg-navy">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="group shrink-0">
            <span className="block font-display text-[0.65rem] font-semibold tracking-[0.2em] text-copper-light uppercase sm:text-xs">
              Fraud
            </span>
            <span className="block font-display text-lg leading-tight text-white sm:text-xl">
              Forensic Accountant
            </span>
          </Link>

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            <Link
              href="/"
              className="rounded-sm px-3 py-2 text-sm text-white/85 transition hover:text-white"
            >
              Home
            </Link>
            <NavDropdown label="Services" href="/services" links={serviceDropdownLinks} variant="dark" />
            <Link
              href="/fraud-forensic-accounting-explained"
              className="rounded-sm px-3 py-2 text-sm text-white/85 transition hover:text-white"
            >
              Overview
            </Link>
            <Link
              href="/who-we-help"
              className="rounded-sm px-3 py-2 text-sm text-white/85 transition hover:text-white"
            >
              Who We Help
            </Link>
            <NavDropdown label="Fraud Types" href="/fraud-types" links={fraudTypeNavLinks} variant="dark" />
            <NavDropdown label="Case Types" href="/case-types" links={caseTypeNavLinks} variant="dark" />
            <NavDropdown label="Resources" links={resourcesNavLinks} variant="dark" />
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="hidden min-h-[44px] items-center rounded-sm border border-copper bg-copper px-5 py-2 text-sm font-semibold text-white transition hover:bg-copper-light hover:border-copper-light lg:inline-flex"
            >
              Request Consultation
            </Link>
            <button
              type="button"
              className="inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-sm border border-white/20 p-2 text-white xl:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen(!open)}
            >
              {open ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-navy/60 xl:hidden"
            aria-label="Close menu"
            onClick={closeMobile}
          />
          <div
            id="mobile-menu"
            className="fixed inset-y-0 right-0 z-50 w-full max-w-sm overflow-y-auto border-l border-border bg-white shadow-2xl xl:hidden"
            style={{ animation: "slideInRight 0.2s ease-out" }}
          >
            <div className="flex items-center justify-between border-b border-border bg-stone px-4 py-4">
              <span className="font-display text-lg text-navy">Menu</span>
              <button
                type="button"
                className="min-h-[44px] min-w-[44px] rounded-sm p-2 text-navy"
                aria-label="Close menu"
                onClick={closeMobile}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-4 py-4">
              <Link
                href="/"
                className="mb-2 flex min-h-[44px] items-center border-l-2 border-transparent px-3 py-2 font-medium text-navy hover:border-copper hover:bg-stone"
                onClick={closeMobile}
              >
                Home
              </Link>
              <Link
                href="/fraud-forensic-accounting-explained"
                className="mb-2 flex min-h-[44px] items-center border-l-2 border-transparent px-3 py-2 text-body hover:border-copper hover:bg-stone"
                onClick={closeMobile}
              >
                Overview
              </Link>
              {mobileGroups.map((group) => (
                <MobileNavGroup
                  key={group.title}
                  title={group.title}
                  links={group.links}
                  onNavigate={closeMobile}
                />
              ))}
              <Link
                href="/contact"
                className="mt-6 flex min-h-[44px] w-full items-center justify-center rounded-sm bg-copper px-4 py-3 font-semibold text-white hover:bg-copper-light"
                onClick={closeMobile}
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
