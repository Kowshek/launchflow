import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"
  ),
  title: "LaunchFlow — Ship Your SaaS 10x Faster",
  description:
    "LaunchFlow is an AI-powered project management tool that helps SaaS teams plan, build, and ship products 10x faster. Automate your workflow, unblock your team, and launch with confidence.",
  keywords: [
    "SaaS project management",
    "AI sprint planning",
    "developer tools",
    "ship faster",
    "agile",
  ],
  openGraph: {
    type: "website",
    url: "/",
    title: "LaunchFlow — Ship Your SaaS 10x Faster",
    description:
      "AI-powered project management for SaaS teams. Plan, build, and ship 10x faster.",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "LaunchFlow" }],
    siteName: "LaunchFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "LaunchFlow — Ship Your SaaS 10x Faster",
    description:
      "AI-powered project management for SaaS teams. Plan, build, and ship 10x faster.",
    images: ["/og.png"],
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
    <html
      lang="en"
      className={`${outfit.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-navy text-warm-white">
        {children}
      </body>
    </html>
  );
}
