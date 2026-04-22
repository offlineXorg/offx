import type { Metadata, Viewport } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://offlinex.org";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "OffX · Tweet without internet",
    template: "%s · OffX",
  },
  description:
    "Post on X by sending an SMS to our number. Works when X is blocked, when your data is down, when the cell network throttles everything but text.",
  keywords: [
    "tweet via SMS",
    "internet shutdown",
    "censorship",
    "offline twitter",
    "SMS to tweet",
    "OffX",
    "free speech",
    "Access Now",
    "KeepItOn",
  ],
  authors: [{ name: "OffX" }],
  openGraph: {
    type: "website",
    url: siteUrl,
    siteName: "OffX",
    title: "OffX · Tweet without internet",
    description:
      "Post on X by sending an SMS. Built for censorship, blackouts, and broken networks.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "OffX" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "OffX · Tweet without internet",
    description:
      "Post on X by sending an SMS. Built for censorship, blackouts, and broken networks.",
    images: ["/og.png"],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
