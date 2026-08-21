import Link from "next/link";
import { CookieSettingsButton } from "@/components/cookies/CookieSettingsButton";
import { SITE_EMAIL } from "@/lib/site";
import { SITE_JURISDICTION_NOTE, SITE_REGION_LABEL } from "@/lib/region";
import { serviceNavLinks, fraudTypeNavLinks } from "@/data/navigation";

const practiceLinks = serviceNavLinks.slice(0, 5);
const insightLinks = [
  { href: "/guides", label: "Guides" },
  { href: "/how-to-instruct", label: "How to Engage" },
  { href: "/qualifications", label: "Qualifications" },
  { href: "/glossary", label: "Glossary" },
  { href: "/fraud-forensic-accounting-explained", label: "Forensic Accounting Overview" },
];
const clientLinks = [
  { href: "/who-we-help/criminal-defence-solicitors", label: "Criminal Defense Attorneys" },
  { href: "/who-we-help/civil-fraud-solicitors", label: "Civil Fraud Attorneys" },
  { href: "/who-we-help/corporations-compliance", label: "Corporations & Compliance" },
  { href: "/experts", label: "Expert Directory" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  return (
    <footer className="mt-auto">
      <div className="border-t-4 border-copper bg-navy text-white/80">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-5">
            <p className="font-display text-[0.65rem] font-semibold tracking-[0.2em] text-copper-light uppercase">
              {SITE_REGION_LABEL}
            </p>
            <p className="mt-2 font-display text-2xl leading-tight text-white sm:text-3xl">
              Fraud Forensic Accountant
            </p>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/70">
              FraudForensicAccountant.com connects law firms, corporations, and government agencies
              with qualified fraud forensic accountants across civil, criminal, and regulatory
              matters worldwide. We are not a law firm and do not provide legal advice.
            </p>
            <a
              href={`mailto:${SITE_EMAIL}`}
              className="mt-4 inline-block text-sm font-medium text-copper-light hover:text-white"
            >
              {SITE_EMAIL}
            </a>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 lg:col-span-7">
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
                Practice Areas
              </h3>
              <ul className="space-y-2.5 text-sm">
                {practiceLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/services" className="font-medium text-copper-light hover:text-white">
                    All services →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
                Fraud Categories
              </h3>
              <ul className="space-y-2.5 text-sm">
                {fraudTypeNavLinks.slice(0, 5).map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link href="/fraud-types" className="font-medium text-copper-light hover:text-white">
                    All fraud types →
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="mb-4 text-xs font-semibold tracking-[0.15em] text-copper-light uppercase">
                Clients & Insights
              </h3>
              <ul className="space-y-2.5 text-sm">
                {clientLinks.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 sm:px-6 lg:px-8">
            {insightLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-xs text-white/60 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-border bg-stone px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="text-center text-xs text-muted sm:text-left">{SITE_JURISDICTION_NOTE}</p>
          <p className="mt-3 text-center text-xs text-muted sm:text-left">
            &copy; 2025 FraudForensicAccountant. {SITE_REGION_LABEL}.{" "}
            <Link href="/privacy" className="underline hover:text-navy">
              Privacy
            </Link>
            {" · "}
            <Link href="/cookies" className="underline hover:text-navy">
              Cookies
            </Link>
            {" · "}
            <Link href="/terms" className="underline hover:text-navy">
              Terms
            </Link>
            {" · "}
            <CookieSettingsButton className="underline hover:text-navy" />
          </p>
        </div>
      </div>
    </footer>
  );
}
