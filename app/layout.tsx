import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { ClerkProvider } from "@clerk/nextjs";

import { cn } from "@/lib/utils";

import Header from "@/components/header";
import Providers from "@/components/providers";
import { Container } from "@/components/ui/container";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "JobJourney",
  description: "Helping through the journey to the job",
};

const clerk_pub_key = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider publishableKey={clerk_pub_key}>
      <html lang="en">
        <body className={cn(inter.className, "h-screen flex flex-col")}>
          <Providers>
            <Header />
            <Container>{children}</Container>
            <Analytics />
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}
