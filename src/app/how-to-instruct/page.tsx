import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ContentSection } from "@/components/ContentSection";
import { BottomCTA } from "@/components/BottomCTA";
import { InstructForm } from "@/components/InstructForm";
import { JsonLd } from "@/components/JsonLd";
import { breadcrumbJsonLd } from "@/lib/schema";

export const metadata = buildMetadata({
  title: "How to Engage a Fraud Forensic Accountant | Law Firms & Corporations Guide",
  description:
    "How law firms and corporations engage a fraud forensic accountant: civil fraud, criminal defense, internal investigation, or DPA preparation.",
  path: "/how-to-instruct",
});

export default function HowToEngagePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "How to Engage", path: "/how-to-instruct" },
        ])}
      />
      <PageHero
        title="How to Engage a Fraud Forensic Accountant"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "How to Engage" }]}
      />
      <ContentSection>
        <h2>Section 1: Criminal Defense Attorneys</h2>
        <ol>
          <li>Identify proceedings: SFO, FCA, HMRC, CPS, or NCA</li>
          <li>Determine whether POCA analysis or trial expert evidence is required</li>
          <li>Confirm LPP scope with counsel</li>
          <li>Decide: privileged investigation report or disclosed expert report?</li>
          <li>Provide all financial documentation: bank statements, accounts, contracts, correspondence</li>
        </ol>

        <h2>Section 2: Civil Fraud Attorneys</h2>
        <ol>
          <li>Assess urgency: freezing injunction (24-48 hour response) or standard engagement</li>
          <li>Define asset tracing scope: domestic or cross-border</li>
          <li>Confirm whether CPR Part 35 expert report is required for trial</li>
          <li>Provide documents: bank statements, corporate records, contracts, transaction data</li>
        </ol>

        <h2>Section 3: Corporations</h2>
        <ol>
          <li>Engage via external legal counsel to preserve legal professional privilege</li>
          <li>Define investigation scope: individuals, period, business units</li>
          <li>Set self-reporting decision timeline with board and counsel</li>
          <li>If self-reporting: establish DPA preparation pathway and financial quantification scope</li>
        </ol>

        <h2>Matching Timeline</h2>
        <ol>
          <li>Submit inquiry via contact form or email</li>
          <li>Initial response within 1 business day (24 hours for urgent matters)</li>
          <li>Conflict check and credentials confirmation</li>
          <li>Scope discussion with lead attorney or counsel</li>
          <li>Engagement letter and fee estimate</li>
          <li>Document production and investigation commencement</li>
          <li>Interim findings and final report delivery</li>
        </ol>

        <h2>Submit an instruction</h2>
        <p>
          Use the form below to send a confidential engagement brief. We respond within one
          business day (sooner for urgent freezing injunction or SFO Section 2 matters).
        </p>
        <div className="mt-6 max-w-lg">
          <InstructForm />
        </div>

        <h2>Red Flags: When Not to Delay Engageion</h2>
        <ul>
          <li>Assets at risk of dissipation (freezing injunction window closing)</li>
          <li>UWO response deadline approaching</li>
          <li>POCA confiscation hearing listed</li>
          <li>SFO Section 2 notice received</li>
          <li>Whistleblower report received (HMRC reward scheme cases)</li>
          <li>Regulatory inquiry letter from FCA or HMRC</li>
        </ul>
      </ContentSection>
      <BottomCTA />
    </>
  );
}
