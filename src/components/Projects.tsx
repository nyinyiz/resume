import { resumeData } from "@/data/resume";

export default function Projects() {
  return (
    <section id="projects" className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4">Notable Projects</h2>
        <p className="text-muted-foreground">
          A selection of projects I've worked on throughout my career
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {resumeData.projects.map((project, index) => (
          <div
            key={index}
            className="p-8 rounded-xl border border-border bg-card hover:bg-accent/50 transition-colors group"
          >
            <h3 className="text-xl font-bold mb-4 group-hover:text-primary transition-colors">
              {project.name}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {project.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
} 