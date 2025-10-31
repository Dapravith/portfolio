import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Twitter, Mail, Heart } from "lucide-react";
import { SiNextdotjs } from "react-icons/si";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-accent/50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Rotha Dapravith</h3>
            <p className="text-muted-foreground">
              Full-Stack Developer & DevOps Engineer building scalable applications with modern technologies.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-muted-foreground hover:text-foreground">
                  Home
                </a>
              </li>
              <li>
                <a href="#about" className="text-muted-foreground hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#projects" className="text-muted-foreground hover:text-foreground">
                  Projects
                </a>
              </li>
              <li>
                <a href="#skills" className="text-muted-foreground hover:text-foreground">
                  Skills
                </a>
              </li>
              <li>
                <a href="#contact" className="text-muted-foreground hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4">Connect</h3>
            <div className="flex gap-4">
              <a
                href="https://github.com/rothadapravith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://linkedin.com/in/rotha-dapravith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a
                href="https://twitter.com/rothadapravith"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="mailto:rothadapravith@example.com"
                className="p-2 rounded-full hover:bg-accent transition-colors"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <Separator className="mb-8" />

        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Developed with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            <span>by</span>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full hover:bg-primary/20 transition-colors">
            <SiNextdotjs className="h-5 w-5" />
            <span className="text-base font-semibold">Next.js</span>
          </div>

          <p className="text-center text-muted-foreground text-sm mt-2">
            © {currentYear} Rotha Dapravith. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
