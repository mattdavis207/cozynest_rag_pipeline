import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CozyNest RAG Pipeline",
  description: "Learning project for an e-commerce customer support RAG pipeline.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-sans">{children}</body>
    </html>
  );
}
