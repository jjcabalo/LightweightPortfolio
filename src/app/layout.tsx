import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";
import SmoothScroller from "@/components/SmoothScroller";
import Scene from "@/components/Scene";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata: Metadata = {
  title: "JOHN | Multimedia Artist",
  description: "Portfolio of JOHN, a minimal and modern multimedia artist.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${archivo.variable} ${spaceGrotesk.variable} antialiased scroll-smooth`}>
      <body className="bg-transparent text-white font-sans min-h-screen selection:bg-white selection:text-black">
        <ThemeProvider>
          <SmoothScroller>
            <Scene />
            {children}
          </SmoothScroller>
        </ThemeProvider>
      </body>
    </html>
  );
}
