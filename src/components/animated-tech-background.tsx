"use client";

import { useEffect, useRef } from "react";

interface TechIcon {
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  icon: string;
}

export default function AnimatedTechBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Technology icons/symbols
    const technologies = [
      "⚛️", "🔷", "🐳", "☸️", "🔧", "⚙️", "🚀", "💻",
      "🔥", "⚡", "🎯", "🛠️", "📦", "🌐", "🔒", "☁️"
    ];

    const techIcons: TechIcon[] = [];
    const numIcons = 30;

    // Initialize tech icons
    for (let i = 0; i < numIcons; i++) {
      techIcons.push({
        name: technologies[Math.floor(Math.random() * technologies.length)],
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 20 + 20,
        icon: technologies[Math.floor(Math.random() * technologies.length)],
      });
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw connections
      ctx.strokeStyle = "rgba(96, 165, 250, 0.1)";
      ctx.lineWidth = 1;

      for (let i = 0; i < techIcons.length; i++) {
        for (let j = i + 1; j < techIcons.length; j++) {
          const dx = techIcons[i].x - techIcons[j].x;
          const dy = techIcons[i].y - techIcons[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(techIcons[i].x, techIcons[i].y);
            ctx.lineTo(techIcons[j].x, techIcons[j].y);
            ctx.stroke();
          }
        }
      }

      // Update and draw tech icons
      techIcons.forEach((tech) => {
        // Update position
        tech.x += tech.vx;
        tech.y += tech.vy;

        // Bounce off walls
        if (tech.x < 0 || tech.x > canvas.width) tech.vx *= -1;
        if (tech.y < 0 || tech.y > canvas.height) tech.vy *= -1;

        // Keep within bounds
        tech.x = Math.max(0, Math.min(canvas.width, tech.x));
        tech.y = Math.max(0, Math.min(canvas.height, tech.y));

        // Draw icon
        ctx.font = `${tech.size}px Arial`;
        ctx.fillStyle = "rgba(96, 165, 250, 0.3)";
        ctx.fillText(tech.icon, tech.x, tech.y);
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 -z-10 opacity-50"
      style={{ background: "transparent" }}
    />
  );
}
