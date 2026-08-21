import type { Metadata } from "next";
import { DM_Sans, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsentProvider } from "@/components/cookies/CookieConsentProvider";
import { buildMetadata } from "@/lib/metadata";
import { getDefaultConsentInlineScript } from "@/lib/cookies/consent-mode";
import { SITE_URL } from "@/lib/site";
import { SITE_LOCALE } from "@/lib/region";
import Script from "next/script";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-source-serif",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#0C1929",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...buildMetadata({
    title: "Fraud Forensic Accountant | Global Civil & Criminal Fraud Investigations",
    description:
      "Find a qualified fraud forensic accountant worldwide. Expert witnesses and investigators for civil fraud recovery, criminal defense, DOJ and SEC investigations, asset tracing, and corporate compliance.",
    path: "/",
  }),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={SITE_LOCALE} className={`${dmSans.variable} ${sourceSerif.variable} h-full`}>
      <head>
        <Script id="consent-default" strategy="beforeInteractive">
          {getDefaultConsentInlineScript()}
        </Script>
      </head>
      <body className="flex min-h-full flex-col antialiased">
        <CookieConsentProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CookieConsentProvider>
      </body>
    </html>
  );
}
