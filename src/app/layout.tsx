import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Project Relentless",
  description: "A focused room for creators who are ready to be consistent.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
