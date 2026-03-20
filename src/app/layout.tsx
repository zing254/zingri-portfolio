import type { Metadata } from "next";
import { Inter, Space_Grotesk, Orbitron, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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
  title: "ZINGRI MASTER | Full-Stack Developer & Ethical Hacker",
  description: "Cyberpunk portfolio of Zingri Master - Full-Stack Developer, DevOps Engineer, and Ethical Hacker from Nairobi, Kenya 🇰🇪",
  keywords: ["Full-Stack Developer", "DevOps Engineer", "Ethical Hacker", "Nairobi", "Kenya"],
  authors: [{ name: "Zingri Master" }],
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>💀</text></svg>",
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
      </body>
    </html>
  );
}
