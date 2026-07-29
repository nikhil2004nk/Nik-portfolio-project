import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "../components/layout/ThemeProvider";
import { Navbar } from "../components/ui/Navbar";
import { Footer } from "../components/ui/Footer";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nik | Full Stack Developer",
  description: "Portfolio of Nik, a full-stack developer specializing in Next.js, NestJS, and AI.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} ${ibmPlexMono.variable} ${inter.variable} min-h-screen flex flex-col font-body antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
