"use client";

import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8">
            Get In Touch
          </h2>
          
          <Button 
            size="lg" 
            className="gap-2 text-lg px-8 py-6 h-auto"
            asChild
          >
            <a href="mailto:dapravithrotha@gmail.com">
              <Mail className="h-6 w-6" />
              Say Hello
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
