import type { Metadata } from "next";
import "./globals.css";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";

export const metadata: Metadata = {
  title: "Project Relentless",
  description:
    "A focused room for creators who are ready to be consistent. 30 days. 10 creators. No excuses.",
  openGraph: {
    title: "Project Relentless",
    description:
      "A focused room for creators who are ready to be consistent. 30 days. 10 creators. No excuses.",
    url: "https://projectrelentless.live",
    siteName: "Project Relentless",
    images: [
      {
        url: "https://projectrelentless.live/og-image.png",
        width: 1200,
        height: 630,
        alt: "Project Relentless",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Project Relentless",
    description:
      "A focused room for creators who are ready to be consistent. 30 days. 10 creators. No excuses.",
    images: ["https://projectrelentless.live/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
