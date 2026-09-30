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
  title: "ZAFR Global Exports | Rooted in Quality. Trusted Worldwide.",
  description: "ZAFR Global Exports connects quality Indian products with international markets through reliable sourcing, transparent trade, and long-term partnerships.",
  keywords: [
    "ZAFR Global Exports",
    "Export company Kerala",
    "Indian exporters",
    "Coconut exporter",
    "Coconut products",
    "Indian spices exporter",
    "Coffee products",
    "Fresh fruits exporter",
    "Fresh vegetables exporter",
    "Industrial products exporter",
    "International trade",
    "Kerala export company"
  ],
  openGraph: {
    title: "ZAFR Global Exports | Rooted in Quality. Trusted Worldwide.",
    description: "ZAFR Global Exports connects quality Indian products with international markets through reliable sourcing, transparent trade, and long-term partnerships.",
    url: "https://zafrglobalexports.com",
    siteName: "ZAFR Global Exports",
    locale: "en_US",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${montserrat.variable} font-sans bg-white text-charcoal antialiased overflow-x-hidden`}
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
