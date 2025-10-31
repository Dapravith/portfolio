"use client";

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { 
  SiReact, 
  SiSpring, 
  SiDocker, 
  SiKubernetes, 
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiTypescript,
  SiNodedotjs,
  SiPython,
  SiJavascript,
  SiNextdotjs,
  SiTailwindcss,
  SiMysql,
  SiAmazonwebservices,
  SiGit
} from "react-icons/si";

// Icon mapping for technologies
const techIcons: { [key: string]: JSX.Element } = {
  "React": <SiReact className="h-4 w-4 text-[#61DAFB]" />,
  "Spring Boot": <SiSpring className="h-4 w-4 text-[#6DB33F]" />,
  "Docker": <SiDocker className="h-4 w-4 text-[#2496ED]" />,
  "Kubernetes": <SiKubernetes className="h-4 w-4 text-[#326CE5]" />,
  "PostgreSQL": <SiPostgresql className="h-4 w-4 text-[#4169E1]" />,
  "MongoDB": <SiMongodb className="h-4 w-4 text-[#47A248]" />,
  "Redis": <SiRedis className="h-4 w-4 text-[#DC382D]" />,
  "TypeScript": <SiTypescript className="h-4 w-4 text-[#3178C6]" />,
  "Node.js": <SiNodedotjs className="h-4 w-4 text-[#339933]" />,
  "Python": <SiPython className="h-4 w-4 text-[#3776AB]" />,
  "JavaScript": <SiJavascript className="h-4 w-4 text-[#F7DF1E]" />,
  "Next.js": <SiNextdotjs className="h-4 w-4" />,
  "Tailwind": <SiTailwindcss className="h-4 w-4 text-[#06B6D4]" />,
  "MySQL": <SiMysql className="h-4 w-4 text-[#4479A1]" />,
  "AWS": <SiAmazonwebservices className="h-4 w-4 text-[#FF9900]" />,
  "Git": <SiGit className="h-4 w-4 text-[#F05032]" />,
};

export default function Projects() {
  // TODO: Replace with your actual projects from old portfolio
  // Visit: https://dapravith-digital-portfolio.vercel.app/
  // Select your TOP 5 projects and update below
  
  const projects = [
    {
      title: "PROJECT 1 - Your Featured Project",
      description: "Replace with your actual project description. This should explain what the project does and its key features.",
      image: "/projects/project1.jpg", // Add your screenshot to public/projects/
      technologies: ["Spring Boot", "React", "Docker", "PostgreSQL"], // Update with actual tech
      githubUrl: "https://github.com/rothadapravith/YOUR-REPO-NAME", // ⚠️ UPDATE THIS
      demoUrl: "https://your-demo-url.vercel.app", // ⚠️ UPDATE THIS
      featured: true,
    },
    {
      title: "PROJECT 2 - Second Best Project",
      description: "Replace with your actual project description.",
      image: "/projects/project2.jpg",
      technologies: ["Node.js", "MongoDB", "React", "AWS"],
      githubUrl: "https://github.com/rothadapravith/YOUR-REPO-NAME", // ⚠️ UPDATE THIS
      demoUrl: "https://your-demo-url.com", // ⚠️ UPDATE THIS
      featured: false,
    },
    {
      title: "PROJECT 3 - Third Project",
      description: "Replace with your actual project description.",
      image: "/projects/project3.jpg",
      technologies: ["Python", "Docker", "Kubernetes", "PostgreSQL"],
      githubUrl: "https://github.com/rothadapravith/YOUR-REPO-NAME", // ⚠️ UPDATE THIS
      demoUrl: "https://your-demo-url.com", // ⚠️ UPDATE THIS
      featured: false,
    },
    {
      title: "PROJECT 4 - Fourth Project",
      description: "Replace with your actual project description.",
      image: "/projects/project4.jpg",
      technologies: ["Next.js", "TypeScript", "Tailwind", "MySQL"],
      githubUrl: "https://github.com/rothadapravith/YOUR-REPO-NAME", // ⚠️ UPDATE THIS
      demoUrl: "https://your-demo-url.com", // ⚠️ UPDATE THIS
      featured: false,
    },
    {
      title: "PROJECT 5 - Fifth Project",
      description: "Replace with your actual project description.",
      image: "/projects/project5.jpg",
      technologies: ["Spring Boot", "Docker", "Redis", "React"],
      githubUrl: "https://github.com/rothadapravith/YOUR-REPO-NAME", // ⚠️ UPDATE THIS
      demoUrl: "https://your-demo-url.com", // ⚠️ UPDATE THIS
      featured: false,
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Top 5 projects showcasing my skills in Full-Stack Development and DevOps
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card 
              key={index} 
              className={`flex flex-col hover:shadow-xl transition-all duration-300 hover:scale-105 ${
                project.featured ? "md:col-span-2 lg:col-span-2" : ""
              }`}
            >
              <CardHeader className="p-0">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg bg-muted">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform hover:scale-110 duration-300"
                    onError={(e) => {
                      // Fallback to placeholder if image doesn't exist
                      e.currentTarget.src = `https://placehold.co/600x400/2563eb/ffffff?text=${encodeURIComponent(project.title)}`;
                    }}
                  />
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                      Featured
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent className="flex-1 pt-6">
                <CardTitle className="mb-2">{project.title}</CardTitle>
                <CardDescription className="mb-4 line-clamp-3">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.map((tech) => (
                    <Badge 
                      key={tech} 
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {techIcons[tech] || null}
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="gap-2">
                <Button 
                  variant="default" 
                  className="flex-1 gap-2" 
                  asChild
                >
                  <a 
                    href={project.githubUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                </Button>
                <Button 
                  variant="outline" 
                  className="flex-1 gap-2" 
                  asChild
                >
                  <a 
                    href={project.demoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Notice to update projects */}
        <div className="mt-12 p-6 bg-yellow-50 dark:bg-yellow-900/20 border-2 border-yellow-200 dark:border-yellow-800 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-yellow-900 dark:text-yellow-100">
            ⚠️ Update Required: Projects Section
          </h3>
          <p className="text-yellow-800 dark:text-yellow-200 mb-2">
            Replace the placeholder projects with your actual top 5 projects from your old portfolio.
          </p>
          <ol className="list-decimal list-inside text-sm text-yellow-700 dark:text-yellow-300 space-y-1">
            <li>Visit: <a href="https://dapravith-digital-portfolio.vercel.app/" className="underline" target="_blank" rel="noopener noreferrer">Old Portfolio</a></li>
            <li>Select your TOP 5 best projects</li>
            <li>Update: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">components/projects.tsx</code></li>
            <li>Add project screenshots to: <code className="bg-yellow-100 dark:bg-yellow-800 px-1 rounded">public/projects/</code></li>
            <li>Update GitHub and Demo URLs</li>
          </ol>
          <p className="text-xs text-yellow-600 dark:text-yellow-400 mt-3">
            See <code>CONTENT_UPDATE_TEMPLATE.md</code> for the update template.
          </p>
        </div>
      </div>
    </section>
  );
}
