import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { ChatProvider } from "@/components/chat/ChatProvider";
import { ChatModal } from "@/components/chat/ChatModal";
import { SkipToContent } from "@/components/layout/SkipToContent";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://jawads.vercel.app"),
  title: {
    default: "Jawad Ahmad | Full-stack & AI Application Engineer",
    template: "%s | Jawad Ahmad",
  },
  description:
    "Full-stack and AI application engineer building web apps, React Native mobile apps and AI voice and chat systems, from idea to production.",
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
            <ChatModal />
          </ChatProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
