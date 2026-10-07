import { buildMetadata } from "@/lib/metadata";
import { PageHero } from "@/components/PageHero";
import { ContentSection } from "@/components/ContentSection";
import { imageCredits } from "@/lib/images";

export const metadata = buildMetadata({
  title: "Image Credits | FraudForensicAccountant.com",
  description: "Sources and licences for the photographs used on FraudForensicAccountant.com.",
  path: "/image-credits",
  noindex: true,
  follow: true,
});

export default function ImageCreditsPage() {
  return (
    <>
      <PageHero
        title="Image Credits"
        subtitle="Photographs on this site come from Wikimedia Commons. Each is shown in greyscale with a colour wash."
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Image credits" }]}
      />
      <ContentSection>
        <ul className="!list-none !pl-0">
          {imageCredits.map((credit) => (
            <li key={credit.source} className="border-b border-border py-4">
              <strong className="text-heading">{credit.title}</strong>
              <br />
              {credit.author}. {credit.license}.{" "}
              <a href={credit.source} target="_blank" rel="noopener noreferrer">
                View source
              </a>
            </li>
          ))}
        </ul>
      </ContentSection>
    </>
  );
}
