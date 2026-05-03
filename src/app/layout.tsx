import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/react";


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
  title: "ZINGRI MASTER | CTO & Senior Full-Stack Lead",
  description: "Senior Full-Stack Developer, DevOps Architect, and Offensive Security Specialist with 7+ years of expertise. Building high-scale secure digital ecosystems from Nairobi, Kenya 🇰🇪",
  icons: {
    icon: "/icon.svg",
    apple: "/icon.svg",
  },
  keywords: [
    "Senior Full-Stack Developer", "CTO", "DevOps Architect", "Ethical Hacker", 
    "OSCP", "CISSP", "Next.js", "Cybersecurity Kenya", "Zingri Master"
  ],
  authors: [{ name: "Zingri Master" }],
  openGraph: {
    title: "ZINGRI MASTER | Senior Full-Stack Lead",
    description: "7+ years of expertise in full-stack development, cloud architecture, and security auditing.",
    url: "https://zingri.dev",
    siteName: "Zingri Master Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ZINGRI MASTER | Senior Full-Stack Lead",
    description: "Architecting the future with security-first engineering.",
    creator: "@zingrimaster",
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
        {children}
        <Analytics />
      </body>
    </html>
  );
}
