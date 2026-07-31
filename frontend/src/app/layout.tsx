import type { Metadata } from "next";
import { Space_Grotesk, IBM_Plex_Mono, Inter } from "next/font/google";
import { ThemeProvider } from "../providers/ThemeProvider";

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
  title: 'Portfolio | Full Stack Developer',
  description: 'Personal portfolio and blog showcasing my projects, skills, and experience.',
  keywords: ['developer', 'portfolio', 'full stack', 'react', 'nextjs', 'typescript'],
  authors: [{ name: 'Nikhil' }],
  openGraph: {
    title: 'Portfolio | Full Stack Developer',
    description: 'Personal portfolio and blog showcasing my projects, skills, and experience.',
    type: 'website',
  },
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
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
