import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";

import Header from "@/components/header";

import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobJourney",
  description: "Helping through the journey to the job",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn(inter.className, "h-screen flex flex-col")}>
          <Header />
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
