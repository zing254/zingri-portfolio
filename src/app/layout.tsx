import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastProvider } from "@/components/Toaster";
import { ThemeProvider } from "@/components/ThemeToggle";
import { siteConfig, personalInfo } from "@/lib/config";


const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({ 
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const orbitron = Orbitron({ 
  subsets: ["latin"],
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${personalInfo.name}`
  },
  description: siteConfig.description,
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: siteConfig.keywords,
  authors: [{ name: personalInfo.name, url: siteConfig.url }],
  creator: personalInfo.name,
  publisher: personalInfo.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: `${personalInfo.name} | Senior Full-Stack Lead - OSCP & CISSP Certified`,
    description: "7+ years architecting secure digital ecosystems. From fintech to AI. Hire-ready for technical leadership.",
    url: siteConfig.url,
    siteName: `${personalInfo.name} Portfolio`,
    locale: "en_US",
    type: "website",
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: `${personalInfo.name} - Full-Stack Developer & Security Specialist`
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@zingri",
    title: `${personalInfo.name} | Senior Full-Stack Lead`,
    description: "Architecting the future with security-first engineering. OSCP & CISSP certified.",
    creator: "@zingri",
    images: [siteConfig.ogImage]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${orbitron.variable} ${jetbrainsMono.variable}`}>
      <body className="font-body antialiased bg-background text-white overflow-x-hidden">
        <ThemeProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
