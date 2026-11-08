import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/providers";

export const metadata: Metadata = {
  title: "Rotha Dapravith - Full-Stack Developer & DevOps Engineer",
  description:
    "Portfolio of Rotha Dapravith, a Full-Stack Developer and DevOps Engineer working with Java Spring Boot, React, cloud platforms, and AI-assisted engineering.",
  keywords: ["Full-Stack Developer", "DevOps Engineer", "Java Spring Boot", "React", "Next.js", "Microservices", "Docker", "Kubernetes", "AI-assisted engineering"],
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
        className="antialiased font-sans"
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
