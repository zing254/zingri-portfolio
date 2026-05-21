import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ToastProvider } from "@/components/Toaster";
import { ThemeProvider } from "@/components/ThemeToggle";


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
  metadataBase: new URL('https://zingri.dev'),
  title: {
    default: "ZINGRI MASTER | CTO & Senior Full-Stack Lead",
    template: "%s | ZINGRI MASTER"
  },
  description: "Senior Full-Stack Developer, DevOps Architect, and Offensive Security Specialist with 7+ years of expertise. OSCP & CISSP certified. Building high-scale secure digital ecosystems from Nairobi, Kenya 🇰🇪",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Senior Full-Stack Developer", "CTO", "DevOps Architect", "Ethical Hacker", 
    "OSCP", "CISSP", "Next.js", "Cybersecurity Kenya", "Zingri Master", "AWS Solutions Architect"
  ],
  authors: [{ name: "Zingri Master", url: "https://zingri.dev" }],
  creator: "Zingri Master",
  publisher: "Zingri Master",
  openGraph: {
    title: "ZINGRI MASTER | Senior Full-Stack Lead - OSCP & CISSP Certified",
    description: "7+ years architecting secure digital ecosystems. From fintech to AI. Hire-ready for technical leadership.",
    url: "https://zingri.dev",
    siteName: "Zingri Master Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Zingri Master - Full-Stack Developer & Security Specialist"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    site: "@zingrimaster",
    title: "ZINGRI MASTER | Senior Full-Stack Lead",
    description: "Architecting the future with security-first engineering. OSCP & CISSP certified.",
    creator: "@zingrimaster",
    images: ["/og-image.svg"]
  },
  robots: {
    index: true,
    follow: false, // Don't follow external links for focused SEO
    googleBot: {
      index: true,
      follow: false,
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
