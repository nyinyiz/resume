import type { ResumeData } from "@/types";
import Hero from "@/components/Hero";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Speaking from "@/components/Speaking";
import Certificates from "@/components/Certificates";

interface PreviewProps {
  data: ResumeData | null;
}

export default function Preview({ data }: PreviewProps) {
  if (!data) {
    return (
      <div className="flex items-center justify-center h-[600px] border rounded-lg bg-accent/10">
        <p className="text-muted-foreground">
          Upload a resume or edit the JSON to see preview
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-20 border rounded-lg p-8 bg-background">
      <Hero />
      <Experience />
      <Projects />
      <Skills />
      <Speaking />
      <Certificates />
    </div>
  );
} 