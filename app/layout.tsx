import type { Metadata } from "next";

import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "DevStash — Developer Knowledge Hub",
  description: "Fast, searchable, AI-enhanced knowledge & resource hub for developers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("dark h-full antialiased font-sans", geist.variable)}
    >
      <body className="min-h-full bg-background text-foreground flex flex-col">{children}</body>
    </html>
  );
}
