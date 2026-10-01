import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE = "https://piktkh.vercel.app";
const TITLE = "PIKT — វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | PIKT" },
  description:
    "វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT) ផ្ដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈដ៏ល្អប្រសើរ ដើម្បីអភិវឌ្ឍធនធានមនុស្សសម្រាប់ប្រទេសកម្ពុជា។ មាន ១០+ ឯកទេសសិក្សា ស្ថិតក្នុងក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ។",
  keywords: ["PIKT", "វិទ្យាស្ថានបច្ចេកទេស", "កំពង់ធំ", "Polytechnic Institute Kampong Thom", "ការអប់រំបច្ចេកទេស", "IT", "អគ្គិសនី", "កសិកម្ម", "ពាណិជ្ជកម្ម"],
  authors: [{ name: "PIKT — Polytechnic Institute of Kampong Thom" }],
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    type: "website",
    siteName: TITLE,
    title: TITLE,
    description:
      "ផ្ដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈដ៏ល្អប្រសើរ • ១០+ ឯកទេសសិក្សា • IT • អគ្គិសនី • ពាណិជ្ជកម្ម • កសិកម្ម • ក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ",
    url: "/",
    locale: "km_KH",
    alternateLocale: ["en_US"],
    images: [{ url: "/og-image.jpg", width: 1200, height: 630, type: "image/jpeg", alt: "វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT)" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "ផ្ដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈ • ១០+ ឯកទេសសិក្សា • ក្រុងស្ទឹងសែន ខេត្តកំពង់ធំ",
    images: [{ url: "/og-image.jpg", alt: "វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT)" }],
  },
  other: { "msapplication-TileColor": "#003070" },
};

export const viewport: Viewport = { themeColor: "#003070" };

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ",
  alternateName: "PIKT",
  url: SITE,
  logo: `${SITE}/logo.png`,
  image: `${SITE}/og-image.jpg`,
  description:
    "វិទ្យាស្ថានពហុបច្ចេកទេស ខេត្តកំពង់ធំ (PIKT) ផ្ដល់ការអប់រំបច្ចេកទេស និងវិជ្ជាជីវៈដ៏ល្អប្រសើរ ដើម្បីអភិវឌ្ឍធនធានមនុស្សសម្រាប់ប្រទេសកម្ពុជា",
  foundingDate: "2001",
  address: {
    "@type": "PostalAddress",
    streetAddress: "ភូមិអ្នកលក់, ឃុំអ្នកលក់",
    addressLocality: "ក្រុងស្ទឹងសែន",
    addressRegion: "ខេត្តកំពង់ធំ",
    addressCountry: "KH",
  },
  contactPoint: { "@type": "ContactPoint", telephone: "+855-12-926-232", email: "ekhieng.pikt@gmail.com", contactType: "admissions" },
  sameAs: ["https://www.facebook.com/pikt"],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="km">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Battambang:wght@100;300;400;700;900&family=Moul&family=Koulen&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Share+Tech&display=swap"
          rel="stylesheet"
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
