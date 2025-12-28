import type { Metadata } from "next";
import { VT323 } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

const vt323 = VT323({
  variable: "--font-terminal",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "T3RM | Terminal Portfolio",
  description: "A retro CRT-style terminal portfolio with interactive command-line navigation. Type 'help' to explore.",
  keywords: ["portfolio", "terminal", "developer", "retro", "CRT", "interactive"],
  authors: [{ name: "Your Name" }],
  openGraph: {
    title: "T3RM | Terminal Portfolio",
    description: "A retro CRT-style terminal portfolio with interactive command-line navigation.",
    url: "https://your-domain.com",
    siteName: "T3RM",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "T3RM | Terminal Portfolio",
    description: "A retro CRT-style terminal portfolio with interactive command-line navigation.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${vt323.variable} antialiased`}>
        <Analytics />
        {children}
      </body>
    </html>
  );
}
