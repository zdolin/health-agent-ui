import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { HeartPulse } from "lucide-react";
import "./globals.css";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Health & Rx Agent",
  description: "AI-powered health and Rx information assistant interface (POC)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.className
        )}
      >
        <div className="relative flex min-h-screen flex-col container mx-auto">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center">
              <div className="mr-4 flex">
                <Link className="mr-6 flex items-center space-x-2" href="/">
                  <HeartPulse className="h-5 w-5" />
                  <h1 className="font-bold">Health & Rx Assistant POC</h1>
                </Link>
              </div>
            </div>
          </header>
          <main className="flex-1">
            <div className="container py-6">{children}</div>
          </main>
          <footer className="border-t py-6 md:py-0">
            <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                Built with Next.js and shadcn/ui
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
