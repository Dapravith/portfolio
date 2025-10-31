import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Rotha Dapravith - Full-Stack Developer & DevOps Engineer",
  description:
    "Portfolio of Rotha Dapravith, a Full-Stack Developer and DevOps Engineer with expertise in Java Spring Boot, React, and passionate DevOps Engineer.",
  keywords: ["Full-Stack Developer", "DevOps Engineer", "Java Spring Boot", "React", "Next.js", "Microservices", "Docker", "Kubernetes"],
  authors: [{ name: "Rotha Dapravith" }],
  openGraph: {
    title: "Rotha Dapravith - Full-Stack Developer & DevOps Engineer",
    description: "Portfolio of Rotha Dapravith showcasing expertise in full-stack development and DevOps engineering.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              try {
                const theme = localStorage.getItem('theme');
                if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              } catch (e) {}
            `,
          }}
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider defaultTheme="system" storageKey="theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
