import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ContentSection } from "@/components/ContentSection";
import { BottomCTA } from "@/components/BottomCTA";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "Fraud Forensic Accountant Fees | 2025 Hourly Rates & Investigation Costs",
  description:
    "Fraud forensic accountant fees: investigation costs $200-$800/hour, expert witness reports $7,500-$100,000+. Civil, criminal, and corporate engagement costs explained.",
  path: "/fees",
});

export default function FeesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Fees", path: "/fees" },
        ])}
      />
      <PageHero
        title="Fraud Forensic Accountant Fees"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Fees" }]}
      />
      <ContentSection>
        <h2>Investigation Fees</h2>
        <ul>
          <li>Standard investigation: $200-$400/hour (regional markets)</li>
          <li>Senior specialist / major market: $400-$800/hour</li>
          <li>Big 4 / global advisory firm equivalent: $600-$1,200+/hour</li>
        </ul>

        <h2>Expert Witness Report Fees</h2>
        <ul>
          <li>Standard civil fraud report: $7,500-$25,000</li>
          <li>Complex criminal or regulatory case: $25,000-$100,000+</li>
          <li>International arbitration: $60,000-$300,000+</li>
          <li>Deferred prosecution agreement financial quantification: $40,000-$250,000+</li>
          <li>Rebuttal report: $7,500-$25,000</li>
        </ul>

        <h2>Emergency Response</h2>
        <p>
          Civil fraud cases are often urgent. Same-day asset freeze support is available at premium
          emergency rates for preliminary quantum and asset tracing within 24–48 hours.
        </p>

        <h2>Fee Structures</h2>
        <ul>
          <li>Hourly (standard for open-ended investigations)</li>
          <li>Fixed fee (defined scope engagements)</li>
          <li>Retainer (ongoing regulatory matters)</li>
          <li>No contingency fees (not permitted for expert witnesses in most jurisdictions)</li>
        </ul>

        <h2>Public Defender & public defender funding</h2>
        <p>
          Court-appointed or publicly funded defense work may be available in criminal matters.
          Expert fees in publicly funded cases typically require prior court approval where
          applicable. Rates vary by jurisdiction.
        </p>
      </ContentSection>
      <BottomCTA />
    </>
  );
}
