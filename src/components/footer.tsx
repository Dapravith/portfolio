import { Github, Linkedin, Mail } from "lucide-react";
import { ViewCounter } from "./ViewCounter";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-primary/20 bg-gradient-to-b from-background to-accent/30 backdrop-blur-lg supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center gap-6">
          {/* Visitor Counter */}
          <ViewCounter />
          
          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Dapravith"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border border-primary/20"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">GitHub</span>
            </a>
            
            <a
              href="https://www.linkedin.com/in/rotha-dapravith/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border border-blue-500/20"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5 text-blue-600 dark:text-blue-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">LinkedIn</span>
            </a>
            
            <a
              href="mailto:rothadapravith@gmail.com"
              className="group flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 hover:bg-red-500/20 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg border border-red-500/20"
              aria-label="Email"
            >
              <Mail className="h-5 w-5 text-red-600 dark:text-red-400 group-hover:rotate-12 transition-transform" />
              <span className="text-sm font-medium hidden sm:inline">Gmail</span>
            </a>
          </div>

          {/* Copyright */}
          <p className="text-center text-muted-foreground text-sm">
            © {currentYear} Rotha Dapravith. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
