import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ZAFR Global Exports | Quality Indian Products Worldwide",
  description: "ZAFR Global Exports connects premium Indian agricultural products, spices, FMCG, automotive spare parts, and handicrafts with international markets through reliable sourcing.",
  keywords: [
    "ZAFR Global Exports",
    "Export company Kerala",
    "Indian exporters",
    "Coconut products exporter",
    "Indian spices exporter",
    "FMCG products exporter India",
    "Automotive spare parts exporter",
    "Indian handicrafts exporter",
    "Cement and AAC Blocks export",
    "International trade India",
    "Kerala export company",
    "Reliable sourcing India"
  ],
  alternates: {
    canonical: "https://zafrglobalexports.com",
  },
  openGraph: {
    title: "ZAFR Global Exports | Rooted in Quality. Trusted Worldwide.",
    description: "ZAFR Global Exports connects quality Indian products with international markets through reliable sourcing, transparent trade, and long-term partnerships.",
    url: "https://zafrglobalexports.com",
    siteName: "ZAFR Global Exports",
    images: [
      {
        url: "https://zafrglobalexports.com/logo-exact.png",
        width: 1200,
        height: 630,
        alt: "ZAFR Global Exports Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZAFR Global Exports",
    description: "Exporting premium Indian agricultural goods, spices, and industrial products worldwide.",
    images: ["https://zafrglobalexports.com/logo-exact.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ZAFR Global Exports",
    "url": "https://zafrglobalexports.com",
    "logo": "https://zafrglobalexports.com/logo-exact.png",
    "description": "ZAFR Global Exports connects quality Indian products with international markets, specializing in agriculture, FMCG, automotive spare parts, and handicrafts.",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans bg-creme text-charcoal antialiased overflow-x-hidden`}
      >
        <SmoothScroll>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
