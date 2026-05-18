import type { Metadata } from "next";
import "./globals.css";
import { NavigationMenuComp } from "./nav-menu";

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
      <body className="min-h-screen bg-background font-sans text-foreground">
        <NavigationMenuComp />
        <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
          {children}
        </div>
      </body>
    </html>
  );
}
