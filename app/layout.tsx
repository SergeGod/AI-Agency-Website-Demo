import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "NexusAI — AI Agency for Modern Businesses",
    template: "%s | NexusAI",
  },
  description:
    "We build AI-powered systems that automate operations, generate leads, and drive growth.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}