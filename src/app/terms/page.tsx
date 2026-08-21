import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ContentSection } from "@/components/ContentSection";
import { SITE_REGION_LABEL } from "@/lib/region";

export const metadata = buildMetadata({
  title: "Terms of Use | FraudForensicAccountant.com",
  description: "Terms of use for FraudForensicAccountant.com referral service.",
  path: "/terms",
  noindex: true,
  follow: true,
});

export default function TermsPage() {
  return (
    <>
      <PageHero title="Terms of Use" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Terms" }]} />
      <ContentSection>
        <p>Last updated: August 2026</p>
        <h2>Nature of Service</h2>
        <p>
          FraudForensicAccountant.com is a referral service connecting law firms, corporations, and
          other professionals with qualified fraud forensic accountants worldwide. We are not a law
          firm, not an accountancy practice, and do not provide legal or accounting advice.
        </p>
        <h2>No Professional Relationship</h2>
        <p>
          Submitting an inquiry does not create a professional relationship with
          FraudForensicAccountant.com. Any engagement is directly between you and the forensic
          accountant retained.
        </p>
        <h2>Accuracy of Information</h2>
        <p>
          Content on this website is for general information purposes. Legal and regulatory positions
          vary by jurisdiction and change over time. You should obtain specific legal advice from a
          qualified attorney before acting on any matter described on this site.
        </p>
        <h2>Expert Credentials</h2>
        <p>
          We endeavor to refer inquiries only to forensic accountants holding relevant credentials
          (CFE, CPA, or equivalent). You are responsible for conducting your own due diligence
          before retaining any expert.
        </p>
        <h2>Limitation of Liability</h2>
        <p>
          To the fullest extent permitted by applicable law, FraudForensicAccountant.com accepts no
          liability for acts or omissions of referred forensic accountants or for reliance on website
          content.
        </p>
        <h2>Governing Law</h2>
        <p>
          These terms are governed by the laws of the State of Delaware, United States, without
          regard to conflict-of-law principles. Disputes are subject to the exclusive jurisdiction of
          the courts located in Delaware, except where mandatory consumer protection laws in your
          jurisdiction provide otherwise. This service operates on a {SITE_REGION_LABEL.toLowerCase()}{" "}
          basis; local laws may apply to your specific matter.
        </p>
      </ContentSection>
    </>
  );
}
