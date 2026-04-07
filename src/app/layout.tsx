import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Web3Provider from "@/components/providers/Web3Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Meme-Fusion AI | Hybrid meme studio with SocialFi",
  description: "AI app that fuses meme templates into hybrid formats, turns community traction into SocialFi signals, and routes launch-ready concepts into Four.meme on BNB Chain.",
  metadataBase: new URL("https://memefusion.vercel.app"),
  icons: {
    icon: "/brand/mf-logo.svg",
    shortcut: "/brand/mf-logo.svg",
    apple: "/brand/mf-logo.svg",
  },
  openGraph: {
    title: "Meme-Fusion AI",
    description: "Hybrid meme studio with SocialFi and Four.meme launch paths.",
    images: ["/brand/mf-logo.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="arc-bg" />
        <Web3Provider>
          {children}
        </Web3Provider>
      </body>
    </html>
  );
}
