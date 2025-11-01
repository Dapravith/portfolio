"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Briefcase, MapPin, Calendar, Mail } from "lucide-react";
import { 
  SiSpring, 
  SiDocker, 
  SiKubernetes, 
  SiAmazonwebservices, 
  SiReact,
  SiTerraform,
  SiGitlab
} from "react-icons/si";

export default function Availability() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Card className="border-2 border-primary/20 shadow-xl bg-card/95 backdrop-blur">
          <CardContent className="pt-8 pb-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Left Side - Status */}
              <div className="flex-1 text-center md:text-left space-y-4">
                <div className="flex items-center justify-center md:justify-start gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75"></div>
                    <div className="relative bg-green-500 h-4 w-4 rounded-full"></div>
                  </div>
                  <Badge variant="default" className="text-base px-4 py-2 bg-green-600 hover:bg-green-700">
                    Available for Opportunities
                  </Badge>
                </div>
                
                <h2 className="text-3xl sm:text-4xl font-bold">
                  Ready for New Challenges!
                </h2>
                
                <p className="text-lg text-muted-foreground max-w-2xl">
                  I'm actively seeking exciting opportunities in <span className="font-semibold text-foreground">Full-Stack Development</span> and <span className="font-semibold text-foreground">DevOps Engineering</span>. 
                  Open to remote, hybrid, or on-site positions.
                </p>

                {/* Availability Details */}
                <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Briefcase className="h-4 w-4 text-primary" />
                    <span>Full-time / Contract</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-primary" />
                    <span>Remote / Hybrid / On-site</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Available: Immediately</span>
                  </div>
                </div>
              </div>

              {/* Right Side - CTA */}
              <div className="flex flex-col gap-3 w-full md:w-auto">
                <Button size="lg" className="gap-2 group" asChild>
                  <a href="#contact">
                    <Mail className="h-5 w-5" />
                    Let's Connect
                  </a>
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Rotha_Dapravith_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  <Briefcase className="h-5 w-5" />
                  View Resume
                </Button>
              </div>
            </div>

            {/* Bottom - What I'm Looking For */}
            <div className="mt-8 pt-6 border-t">
              <h3 className="text-lg font-semibold mb-3">What I'm Looking For:</h3>
              <div className="flex flex-wrap gap-2">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SiSpring className="h-3 w-3" />
                  Java Spring Boot Projects
                </Badge>
                <Badge variant="secondary">Microservices Architecture</Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SiAmazonwebservices className="h-3 w-3" />
                  Cloud Infrastructure
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SiGitlab className="h-3 w-3" />
                  DevOps/CI-CD Roles
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SiReact className="h-3 w-3" />
                  Full-Stack Development
                </Badge>
                <Badge variant="secondary" className="flex items-center gap-1">
                  <SiKubernetes className="h-3 w-3" />
                  <SiDocker className="h-3 w-3" />
                  Kubernetes/Docker
                </Badge>
                <Badge variant="secondary">Team Leadership</Badge>
                <Badge variant="secondary">Innovative Tech Stack</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
