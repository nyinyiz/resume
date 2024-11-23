import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Speaking from "@/components/Speaking";
import Certificates from "@/components/Certificates";

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="space-y-32 py-16">
        <Hero />
        <Experience />
        <Projects />
        <Skills />
        <Speaking />
        <Certificates />
      </div>
    </div>
  );
} 