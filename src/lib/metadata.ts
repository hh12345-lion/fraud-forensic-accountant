import type { Metadata } from "next";
import { SITE_URL } from "./site";
import { SITE_LOCALE } from "./region";

const DEFAULT_OG_IMAGE = `${SITE_URL}/opengraph-image`;

export function buildMetadata({
  title,
  description,
  path = "",
  noindex = false,
  follow = true,
  ogImage = DEFAULT_OG_IMAGE,
}: {
  title: string;
  description: string;
  path?: string;
  noindex?: boolean;
  follow?: boolean;
  ogImage?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        [SITE_LOCALE]: url,
        "x-default": url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "FraudForensicAccountant.com",
      locale: SITE_LOCALE.replace("-", "_"),
      type: "website",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Fraud Forensic Accountant",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: noindex
      ? { index: false, follow, googleBot: { index: false, follow } }
      : { index: true, follow: true },
    ...(process.env.GOOGLE_SITE_VERIFICATION && {
      verification: { google: process.env.GOOGLE_SITE_VERIFICATION },
    }),
    ...(process.env.BING_SITE_VERIFICATION && {
      other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION },
    }),
  };
}
