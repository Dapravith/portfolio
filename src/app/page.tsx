import About from "@/components/about";
import Availability from "@/components/availability";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Projects from "@/components/projects";
import Skills from "@/components/skills";
// import FloatingActions from "@/components/floating-actions";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-background via-background to-primary/5 overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(59,130,246,0.12),transparent_25%),radial-gradient(circle_at_80%_10%,rgba(168,85,247,0.12),transparent_20%),radial-gradient(circle_at_40%_80%,rgba(14,165,233,0.12),transparent_20%)]" />
      <Navbar />
      <Hero />
      <Availability />
      <About />
      <Projects />
      <Skills />
      <Contact />
      <Footer />
     {/*  <FloatingActions /> */}
    </div>
  );
}
