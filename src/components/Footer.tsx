import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { SITE_EMAIL } from "@/lib/site";
import { SITE_JURISDICTION_NOTE, SITE_REGION_LABEL } from "@/lib/region";
import { serviceNavLinks, fraudTypeNavLinks, resourcesNavLinks } from "@/data/navigation";

const registrySections = [
  {
    numeral: "I",
    title: "Services",
    links: [
      ...serviceNavLinks.slice(0, 4),
      { href: "/services", label: "All services" },
    ],
  },
  {
    numeral: "II",
    title: "Fraud Types",
    links: [
      ...fraudTypeNavLinks.slice(0, 4),
      { href: "/fraud-types", label: "All fraud types" },
    ],
  },
  {
    numeral: "III",
    title: "Resources & Clients",
    links: [
      ...resourcesNavLinks,
      { href: "/who-we-help", label: "Who we help" },
      { href: "/experts", label: "Expert directory" },
      { href: "/contact", label: "Contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto border-t-[3px] border-copper bg-stone">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 border-b border-border pb-10 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="font-mono text-[10px] font-medium uppercase tracking-[0.2em] text-copper">
              Site registry · {SITE_REGION_LABEL}
            </p>
            <p className="mt-2 font-display text-2xl font-semibold text-navy sm:text-3xl">
              Fraud Forensic Accountant
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:items-end">
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="text-sm font-medium text-navy hover:text-copper"
            >
              {SITE_EMAIL}
            </a>
            <Link
              href="/contact"
              className="text-sm font-medium text-copper underline-offset-2 hover:underline"
            >
              Submit an inquiry →
            </Link>
          </div>
        </div>

        <div className="grid gap-10 pt-10 md:grid-cols-3">
          {registrySections.map((section) => (
            <div key={section.numeral}>
              <h3 className="flex items-baseline gap-2 font-mono text-xs text-copper">
                <span className="text-base font-normal">{section.numeral}.</span>
                <span className="uppercase tracking-[0.12em]">{section.title}</span>
              </h3>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-body transition hover:text-copper"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <p className="mt-10 max-w-3xl text-xs leading-relaxed text-muted">
          FraudForensicAccountant.com connects law firms and corporations with qualified fraud
          forensic accountants. We are not a law firm and do not provide legal advice.{" "}
          {SITE_JURISDICTION_NOTE}
        </p>
      </div>

      <div className="border-t border-border bg-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-4 text-center text-xs text-muted sm:flex-row sm:px-6 sm:text-left lg:px-8">
          <p>
            &copy; {year} FraudForensicAccountant · {SITE_REGION_LABEL}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 sm:justify-end">
            <Link href="/privacy" className="hover:text-navy">
              Privacy
            </Link>
            <span aria-hidden>·</span>
            <Link href="/cookies" className="hover:text-navy">
              Cookies
            </Link>
            <span aria-hidden>·</span>
            <Link href="/terms" className="hover:text-navy">
              Terms
            </Link>
            <span aria-hidden>·</span>
            <CookieSettingsButton className="hover:text-navy" />
          </p>
        </div>
      </div>
    </footer>
  );
}
