import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import LayoutContent from '@/components/layout-content'
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`} suppressHydrationWarning={true}>
      <body className="antialiased bg-background text-foreground" suppressHydrationWarning={true}>
        <Providers>
          <div className="flex min-h-screen">
            <LayoutContent>
              <div className="flex flex-col flex-1">
                <header className="flex items-center justify-between h-20 border-b px-4 bg-white">
                  <div className="flex items-center gap-3 md:hidden">
                    <Link href="/" className="text-2xl font-bold text-primary">
                      The Strivers
                    </Link>
                  </div>
                  <div className="hidden md:flex items-center gap-4">
                    <h1 className="text-lg font-semibold text-slate-600 max-w-3xl truncate">
                      AI-Driven Life Cycle Assessment (LCA) Tool for Advancing Circularity and Sustainability in Metallurgy and Mining
                    </h1>
                  </div>
                </header>
                <main className="flex-1 p-6 bg-slate-50">
                  {children}
                </main>
              </div>
            </LayoutContent>
          </div>
        </Providers>
      </body>
    </html>
  );
}
