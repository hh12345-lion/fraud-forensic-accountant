import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ContentSection } from "@/components/ContentSection";
import { SITE_EMAIL } from "@/lib/site";

export const metadata = buildMetadata({
  title: "Privacy Policy | FraudForensicAccountant.com",
  description: "Privacy policy for FraudForensicAccountant.com global referral service.",
  path: "/privacy",
  noindex: true,
  follow: true,
});

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" breadcrumbs={[{ label: "Home", href: "/" }, { label: "Privacy" }]} />
      <ContentSection>
        <p>Last updated: August 2026</p>
        <h2>Who We Are</h2>
        <p>
          FraudForensicAccountant.com operates as a global referral service connecting law firms and
          corporations with qualified fraud forensic accountants. For privacy inquiries, contact{" "}
          {SITE_EMAIL}.
        </p>
        <h2>Data We Collect</h2>
        <p>
          When you submit an inquiry form, we collect: your name, organization, role, email, phone
          (optional), case category, fraud type, approximate fraud value, urgency, and case
          description. We use this data solely to match you with an appropriate forensic accountant.
        </p>
        <h2>Legal Basis</h2>
        <p>
          We process personal data on the basis of legitimate interests (responding to your inquiry)
          and, where applicable, pre-contractual steps at your request. Additional rights may apply
          under applicable privacy laws in your jurisdiction, including state privacy laws in the
          United States and GDPR for individuals in the European Economic Area.
        </p>
        <h2>Data Sharing</h2>
        <p>
          Inquiry data may be shared with qualified fraud forensic accountants in our network for the
          purpose of responding to your engagement request. We do not sell personal data.
        </p>
        <h2>Retention</h2>
        <p>
          Inquiry data is retained for up to 24 months unless a longer period is required for legal or
          regulatory purposes.
        </p>
        <h2>Your Rights</h2>
        <p>
          Depending on your location, you may have rights of access, correction, deletion, restriction,
          portability, and objection. Contact {SITE_EMAIL} to exercise your rights.
        </p>
        <h2>Cookies & Analytics</h2>
        <p>
          We may use Google Analytics if configured via NEXT_PUBLIC_GA_MEASUREMENT_ID. Analytics cookies
          are used only with appropriate consent mechanisms where required.
        </p>
        <h2>Form Processing</h2>
        <p>
          Contact form submissions are processed by third-party form handlers. Their privacy policies
          apply to data processed on their platforms.
        </p>
      </ContentSection>
    </>
  );
}
