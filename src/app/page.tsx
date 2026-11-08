import About from "@/components/about";
import ChatAssistant from "@/components/chat-assistant";
import Contact from "@/components/contact";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Skills from "@/components/skills";
// import FloatingActions from "@/components/floating-actions";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-foreground">Skip to content</a>
      <Navbar />
      <main id="main-content">
      <Hero />
      <About />
      <Skills />
      <Contact />
      </main>
      <Footer />
      <ChatAssistant />
     {/*  <FloatingActions /> */}
    </div>
  );
}
