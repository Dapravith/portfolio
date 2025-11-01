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
    <div className="min-h-screen">
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
