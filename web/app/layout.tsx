import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sprout — keep your plants alive without thinking about it",
  description:
    "Sprout is the plant-care sidekick that texts you the day before each plant needs care. One tap, done. Join the waitlist.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
