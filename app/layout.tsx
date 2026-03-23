import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "sonner";
import { Sidebar } from "@/components/sidebar";
import { SecurityBanner } from "@/components/security-banner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Custom Feed Middleware",
  description:
    "Plugin-first feed middleware for multi-source ingest, filtering, and multi-channel delivery.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="flex h-full min-h-screen">
        <Sidebar />
        <main className="flex-1 overflow-y-auto">
          <SecurityBanner />
          {children}
        </main>
        <Toaster richColors position="bottom-right" />
      </body>
    </html>
  );
}
