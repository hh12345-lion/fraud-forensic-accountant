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
      <section className="border-b border-border bg-stone py-16 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 sm:px-6 lg:grid-cols-12 lg:gap-16 lg:px-8">
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
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link
                href="/who-we-help/criminal-defence-solicitors"
                className="inline-flex min-h-[44px] items-center justify-center rounded-sm bg-copper px-6 py-3 font-semibold text-white hover:bg-copper-light"
              >
                Criminal Defense
              </Link>
              <Link
                href="/who-we-help/civil-fraud-solicitors"
                className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-navy/20 bg-white px-6 py-3 font-semibold text-navy hover:border-copper hover:text-copper"
              >
                Civil Fraud Recovery
              </Link>
              <Link
                href="/who-we-help/corporations-compliance"
                className="inline-flex min-h-[44px] items-center justify-center rounded-sm border border-navy/20 bg-white px-6 py-3 font-semibold text-navy hover:border-copper hover:text-copper"
              >
                Corporate / Internal
              </Link>
            </div>
          </div>
          <div className="flex items-center lg:col-span-5">
            <div className="w-full border-l-4 border-copper bg-white p-8 shadow-[var(--shadow-card)]">
              <h2 className="font-display text-xl font-semibold text-navy">What we connect you with</h2>
              <ul className="mt-4 space-y-3 text-sm text-body">
                <li className="flex gap-2">
                  <span className="text-copper">—</span>
                  Certified fraud examiners and CPA forensic specialists
                </li>
                <li className="flex gap-2">
                  <span className="text-copper">—</span>
                  Asset tracing and financial reconstruction
                </li>
                <li className="flex gap-2">
                  <span className="text-copper">—</span>
                  Expert witness reports for trial and arbitration
                </li>
                <li className="flex gap-2">
                  <span className="text-copper">—</span>
                  Cross-border investigation support
                </li>
              </ul>
            </div>
          </div>
        </div>
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

      <section className="py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">
            Three Types of Clients We Serve
          </h2>
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {[
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
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="group block border border-border bg-white p-6 shadow-[var(--shadow-elevated)] hover:border-copper/40"
              >
                <h3 className="font-display text-lg font-semibold text-navy group-hover:text-copper">
                  {card.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{card.desc}</p>
                <span className="mt-4 inline-block text-sm font-medium text-copper">
                  Learn more →
                </span>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-center text-body">
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
