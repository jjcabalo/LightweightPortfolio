import type { Metadata } from "next";
import { Archivo, Space_Grotesk } from "next/font/google";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

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
      <body className="bg-black text-neutral-50 font-sans min-h-screen selection:bg-neutral-50 selection:text-neutral-950">
        <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -left-[10%] w-[70vw] h-[70vw] bg-neutral-950/60 rounded-full blur-[120px] animate-[spin_40s_linear_infinite] origin-bottom-right" />
          <div className="absolute -bottom-[20%] -right-[10%] w-[80vw] h-[60vw] bg-neutral-950/50 rounded-full blur-[150px] animate-[spin_50s_linear_infinite_reverse] origin-top-left" />
          <div className="absolute inset-0 opacity-[0.06] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.5' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        </div>
        {children}
      </body>
    </html>
  );
}
