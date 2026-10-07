import Image from "next/image";
import Link from "next/link";
import { EnforcementBanner } from "@/components/EnforcementBanner";
import { BottomCTA } from "@/components/BottomCTA";
import { CardGrid } from "@/components/CardGrid";
import { JsonLd } from "@/components/JsonLd";
import { homepageGraph } from "@/lib/schema";
import { HOMEPAGE_HUB_LINKS } from "@/lib/seo/internal-links";
import { InternalLinkGrid } from "@/components/seo/InternalLinkGrid";
import { ResponsiveTable } from "@/components/ResponsiveTable";
import { services } from "@/data/services";
import { MoneyTrail } from "@/components/MoneyTrail";
import { images } from "@/lib/images";

const routes = [
  {
    title: "Criminal Defense",
    desc: "Defending individuals or corporations facing criminal or regulatory fraud investigations. Asset forfeiture analysis, benefit calculation, and defense support.",
    href: "/who-we-help/criminal-defence-solicitors",
  },
  {
    title: "Civil Fraud Recovery",
    desc: "Pursuing fraudsters through civil proceedings: asset freezes, tracing, discovery orders, civil RICO, and private prosecution support.",
    href: "/who-we-help/civil-fraud-solicitors",
  },
  {
    title: "Corporate / Internal",
    desc: "Internal investigations, regulatory self-disclosure preparation, deferred prosecution agreement support, FCPA compliance advisory, and remediation assessment.",
    href: "/who-we-help/corporations-compliance",
  },
];

const credentials = [
  {
    label: "Certified specialists",
    note: "Fraud examiners and CPA forensic accountants",
    icon: "M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6l7-3zm-3 9l2 2 4-4",
  },
  {
    label: "Asset tracing",
    note: "Financial reconstruction across accounts",
    icon: "M4 17l5-5 4 4 7-8M15 8h5v5",
  },
  {
    label: "Expert witness reports",
    note: "For trial and arbitration",
    icon: "M7 3h7l5 5v13H7V3zm7 0v5h5M10 13h6M10 17h6",
  },
  {
    label: "Cross-border support",
    note: "Investigations across jurisdictions",
    icon: "M12 21a9 9 0 100-18 9 9 0 000 18zM3 12h18M12 3c2.5 2.5 3.8 5.5 3.8 9s-1.3 6.5-3.8 9c-2.5-2.5-3.8-5.5-3.8-9S9.5 5.5 12 3z",
  },
];

const enforcementFacts = [
  { fact: "Corporate fraud enforcement priority", figure: "Expanded 2025", source: "Major regulators" },
  { fact: "Securities enforcement actions (FY2025)", figure: "Elevated", source: "Market regulators" },
  { fact: "Anti-bribery self-reporting credit policy", figure: "Updated 2025", source: "Enforcement guidance" },
  {
    fact: "Whistleblower awards (large cases)",
    figure: "15–30% of recovery",
    source: "Whistleblower programs",
  },
  { fact: "Beneficial ownership transparency rules", figure: "Widely effective 2025", source: "AML frameworks" },
  { fact: "Digital asset registration timelines", figure: "Phased through 2027", source: "Market rulemaking" },
  {
    fact: "Corporate cooperation policy",
    figure: "Early disclosure incentivized",
    source: "Enforcement policy updates",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageGraph()} />
      <section className="bg-stone pt-14 md:pt-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-12 lg:px-8">
          <div className="lg:col-span-7">
            <p className="text-xs font-semibold tracking-[0.2em] text-copper uppercase">
              Global forensic accounting
            </p>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-tight text-navy sm:text-4xl lg:text-5xl lg:leading-tight">
              Fraud Forensic Accountant Services for Law Firms & Corporations
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-body">
              Whether you are defending a fraud prosecution, pursuing civil recovery, conducting an
              internal investigation, or preparing for regulatory self-disclosure, you need a forensic
              accountant who understands the full landscape of fraud: civil, criminal, and regulatory.
              FraudForensicAccountant.com connects law firms and corporations with qualified fraud
              forensic accountants across jurisdictions worldwide.
            </p>
          </div>
          <div className="hidden justify-center lg:col-span-5 lg:flex">
            <div className="monogram-mask relative aspect-[282/341] w-full max-w-[19rem] bg-copper">
              <Image
                src={images.depositBoxes.src}
                alt={images.depositBoxes.alt}
                fill
                preload
                quality={60}
                sizes="320px"
                className="object-cover opacity-70 mix-blend-luminosity"
              />
              <div aria-hidden className="absolute inset-0 bg-gradient-to-br from-mint/25 via-transparent to-navy/45" />
            </div>
          </div>
        </div>

        {/* Route selector */}
        <div className="mx-auto mt-12 max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">Choose your route</p>
          <div className="mt-4 grid gap-5 md:grid-cols-3">
            {routes.map((route, i) => (
              <Link
                key={route.href}
                href={route.href}
                className={`group flex flex-col rounded-xl p-6 shadow-[var(--shadow-elevated)] transition hover:-translate-y-1 md:translate-y-8 md:hover:translate-y-7 ${
                  i === 0 ? "bg-navy text-white" : "border border-border bg-white"
                }`}
              >
                <span className={`font-mono text-xs ${i === 0 ? "text-mint" : "text-copper"}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className={`mt-3 font-display text-xl font-semibold ${i === 0 ? "text-white" : "text-navy"}`}>
                  {route.title}
                </h2>
                <p className={`mt-2 flex-1 text-sm leading-relaxed ${i === 0 ? "text-white/75" : "text-body"}`}>
                  {route.desc}
                </p>
                <span
                  className={`mt-5 inline-flex h-10 w-10 items-center justify-center rounded-full transition group-hover:translate-x-1 ${
                    i === 0 ? "bg-mint text-navy" : "bg-copper text-white"
                  }`}
                  aria-hidden
                >
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Credentials strip */}
      <section aria-label="What we connect you with" className="border-b border-border bg-white pt-6 md:pt-16">
        <ul className="mx-auto grid max-w-6xl px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8">
          {credentials.map((c, i) => (
            <li
              key={c.label}
              className={`flex items-center gap-4 border-border py-6 ${i > 0 ? "border-t sm:border-t-0" : ""} ${
                i % 2 === 1 ? "sm:border-l sm:pl-6" : ""
              } ${i > 1 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:pl-6" : ""} lg:pr-6`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-mist text-navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5" aria-hidden>
                  <path d={c.icon} />
                </svg>
              </span>
              <span>
                <span className="block font-display text-lg font-semibold leading-tight text-navy">{c.label}</span>
                <span className="block text-[13px] text-muted">{c.note}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <EnforcementBanner />

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            What Our Fraud Forensic Accountants Cover
          </h2>
          <div className="mt-8">
            <CardGrid
              items={services.map((s) => ({
                title: s.title,
                description: s.short,
                href: `/services/${s.id}`,
              }))}
            />
          </div>
          <p className="mt-6 text-center">
            <Link href="/services" className="font-medium text-copper hover:underline">
              View all services →
            </Link>
          </p>
        </div>
      </section>

      <MoneyTrail />

      <section className="bg-stone py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            Fraud Enforcement: Key 2025–2026 Facts
          </h2>
          <ResponsiveTable>
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-white">
                  <th className="border border-border px-4 py-3 text-left font-semibold text-navy">
                    Fact
                  </th>
                  <th className="border border-border px-4 py-3 text-left font-semibold text-navy">
                    Figure
                  </th>
                  <th className="border border-border px-4 py-3 text-left font-semibold text-navy">
                    Source
                  </th>
                </tr>
              </thead>
              <tbody>
                {enforcementFacts.map((row) => (
                  <tr key={row.fact} className="bg-white">
                    <td className="border border-border px-4 py-3">{row.fact}</td>
                    <td className="border border-border px-4 py-3 font-medium">{row.figure}</td>
                    <td className="border border-border px-4 py-3 text-body">{row.source}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ResponsiveTable>
          <p className="mt-4 text-xs text-muted">
            Sources: major criminal and securities enforcement agencies; anti-bribery guidance;
            whistleblower programs; AML beneficial ownership frameworks; digital asset rulemaking;
            corporate cooperation policies.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <p className="text-center text-body">
            New to fraud forensic accounting?{" "}
            <Link
              href="/what-is-a-fraud-forensic-accountant"
              className="font-medium text-copper hover:underline"
            >
              What is a fraud forensic accountant?
            </Link>
          </p>
        </div>
      </section>

      <section className="border-t border-border bg-white py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <InternalLinkGrid
            title="Explore fraud forensic accounting resources"
            links={[
              ...HOMEPAGE_HUB_LINKS,
              { href: "/fraud-forensic-accounting-explained", label: "Fraud forensic accounting explained" },
              { href: "/services", label: "All services" },
              { href: "/contact", label: "Request a consultation" },
            ]}
            columns={3}
            className="!mt-0 !border-0 pt-0"
          />
        </div>
      </section>

      <BottomCTA />
    </>
  );
}
