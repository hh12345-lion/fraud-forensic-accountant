import Image from "next/image";
import Link from "next/link";
import { NavDropdown, MobileNavGroup } from "./NavDropdown";
import { MobileNavReset } from "./MobileNavReset";
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
  "inline-flex min-h-[44px] shrink-0 items-center border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-white/80 transition hover:border-mint hover:text-white focus:outline-none focus-visible:border-mint focus-visible:text-white";

const mobileRowClass =
  "flex min-h-[48px] items-center gap-3 border-b border-white/10 px-4 py-3 text-sm font-medium text-white hover:bg-white/5";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-navy shadow-[0_10px_30px_-18px_rgba(22,33,30,0.9)]">
      <MobileNavReset />
      <input id="mobile-nav-toggle" type="checkbox" className="peer sr-only" aria-hidden tabIndex={-1} />

      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 shrink items-center" aria-label="Fraud Forensic Accountant home">
          <Image
            src="/brand/logo.svg"
            alt="Fraud Forensic Accountant"
            width={1081}
            height={128}
            preload
            unoptimized
            className="w-[min(62vw,21rem)]"
          />
        </Link>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <Link
            href="/contact"
            className="hidden min-h-[44px] items-center rounded-full bg-copper px-5 py-2 text-sm font-semibold text-white transition hover:bg-mint hover:text-navy sm:inline-flex"
          >
            Get Matched
          </Link>
          <label
            htmlFor="mobile-nav-toggle"
            className="inline-flex min-h-[44px] cursor-pointer items-center gap-2 rounded-full border border-white/25 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white xl:hidden"
          >
            Menu
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </label>
        </div>
      </div>

      <nav className="hidden border-t border-white/10 bg-navy-light xl:block" aria-label="Main">
        <div className="mx-auto flex max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          {tabLinks.map((link) => (
            <Link key={link.href} href={link.href} className={tabLinkClass}>
              {link.label}
            </Link>
          ))}
          <NavDropdown label="Services" href="/services" links={serviceDropdownLinks} />
          <NavDropdown label="Fraud Types" href="/fraud-types" links={fraudTypeNavLinks} />
          <NavDropdown label="Case Types" href="/case-types" links={caseTypeNavLinks} />
          <NavDropdown label="Resources" links={resourcesNavLinks} />
        </div>
      </nav>
      <div aria-hidden className="h-[3px] bg-gradient-to-r from-copper via-mint to-copper" />

      <nav
        id="mobile-panel"
        aria-label="Mobile"
        className="hidden max-h-[calc(100dvh-5rem)] overflow-y-auto border-t border-white/10 bg-navy peer-checked:block xl:hidden"
      >
        <Link href="/" className={mobileRowClass}>
          Home
        </Link>
        <Link href="/fraud-forensic-accounting-explained" className={mobileRowClass}>
          Overview
        </Link>
        {mobileGroups.map((group) => (
          <MobileNavGroup key={group.title} index={group.index} title={group.title} links={group.links} />
        ))}
        <div className="p-4">
          <Link
            href="/contact"
            className="flex min-h-[48px] w-full items-center justify-center rounded-full bg-copper px-4 py-3 text-sm font-semibold text-white"
          >
            Get Matched
          </Link>
        </div>
      </nav>
    </header>
  );
}
