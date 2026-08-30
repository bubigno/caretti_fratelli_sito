import type { Metadata } from "next";
import { DM_Sans, Plus_Jakarta_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "sonner";
import { ChunkLoadErrorHandler } from "@/components/chunk-load-error-handler";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

export const dynamic = "force-dynamic";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  return {
    metadataBase: new URL(baseUrl),
    title: {
      default: "Caretti F.lli Snc – Argenteria, Oreficeria, Premiazioni e Abbigliamento da Lavoro",
      template: "%s | Caretti F.lli Snc",
    },
    description:
      "Da oltre 30 anni, Caretti F.lli Snc offre argenteria, oreficeria, abbigliamento da lavoro, antinfortunistica, premiazioni sportive e materiale promozionale a Loano (SV).",
    icons: {
      icon: "/favicon.svg",
      shortcut: "/favicon.svg",
    },
    openGraph: {
      title: "Caretti F.lli Snc – Qualità e Professionalità dal 1990",
      description:
        "Argenteria, oreficeria, abbigliamento da lavoro, premiazioni sportive e materiale promozionale.",
      images: ["/og-image.png"],
      type: "website",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="it" suppressHydrationWarning>
      <head>
        <Script src="https://apps.abacus.ai/chatllm/appllm-lib.js" strategy="afterInteractive" />
      </head>
      <body
        className={`${dmSans.variable} ${plusJakarta.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <ChunkLoadErrorHandler />
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
          <Toaster position="top-right" richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
