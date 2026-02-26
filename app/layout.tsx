import type { Metadata } from "next";
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

const sans = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-sans"
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500"]
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://elaxptr.dev"),
  title: "Joel P. | Software Developer",
  description: "Modern developer portfolio for Joel P. (elaxptr).",
  icons: {
    icon: "/icon.svg"
  },
  openGraph: {
    title: "Joel P. | Software Developer",
    description: "Modern developer portfolio for Joel P. (elaxptr).",
    type: "website",
    url: "/",
    siteName: "elaxptr.dev",
    images: [
      {
        url: "/og-card.svg",
        width: 1200,
        height: 630,
        alt: "Joel P. - Software Developer"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Joel P. | Software Developer",
    description: "Modern developer portfolio for Joel P. (elaxptr).",
    images: ["/og-card.svg"]
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
