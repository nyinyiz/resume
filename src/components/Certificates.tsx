import { useResume } from "@/context/ResumeContext";
import { ExternalLink } from "lucide-react";

export default function Certificates() {
  const resumeData = useResume();
  return (
    <section id="certificates" className="space-y-12 py-8">
      <h2 className="text-3xl font-bold">Certificates</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resumeData.certificates.map((cert, index) => (
          <a
            key={index}
            href={cert.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-lg border border-border hover:bg-accent/50 transition-colors flex items-center justify-between group"
          >
            <span className="font-medium">{cert.name}</span>
            <ExternalLink className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
          </a>
        ))}
      </div>
    </section>
  );
} 