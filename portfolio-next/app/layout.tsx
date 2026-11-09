import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { LazyChatModal } from "@/components/chat/LazyChatModal";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jawads.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Jawad Ahmad | Full-stack & AI Application Engineer",
    template: "%s | Jawad Ahmad",
  },
  description:
    "Full-stack and AI application engineer building web apps, React Native mobile apps and AI voice and chat systems, from idea to production.",
  keywords: [
    "Jawad Ahmad",
    "Full-stack Engineer",
    "AI Application Engineer",
    "Next.js",
    "React Native",
    "AI Voice Receptionist",
    "TripFusion",
    "Hisab Kitab",
  ],
  authors: [{ name: "Jawad Ahmad", url: SITE_URL }],
  creator: "Jawad Ahmad",
  alternates: {
    canonical: "./",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: "/icon.svg",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Jawad Ahmad | Full-stack & AI Application Engineer",
    description:
      "Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.",
    siteName: "Jawad Ahmad Portfolio",
  },
  twitter: {
    card: "summary_large_image",
    title: "Jawad Ahmad | Full-stack & AI Application Engineer",
    description:
      "Turning ideas into scalable, impactful products. Web, mobile and AI, built end to end.",
  },
  verification: {
    google:
      process.env.GOOGLE_SITE_VERIFICATION ||
      "mgLANLB6EOzYy732gwAy9uupntizO8nxjqBzSEhfNwc",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-text selection:bg-accent/30 selection:text-text font-sans">
        <ThemeProvider>
          <ChatProvider>
            <SkipToContent />
            <Navbar />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <LazyChatModal />
            {process.env.VERCEL ? <Analytics /> : null}
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
