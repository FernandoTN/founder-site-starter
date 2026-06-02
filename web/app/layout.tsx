import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fernando Torres — building Memori",
  description: "Founder & CEO of Memori. Your AI, on your terms.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
