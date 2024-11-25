import { useResume } from "@/context/ResumeContext";

export default function Experience() {
  const resumeData = useResume();
  return (
    <section id="experience" className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4">Experience</h2>
        <p className="text-muted-foreground">
          Over 7 years of experience in mobile development across different industries
        </p>
      </div>
      <div className="space-y-20">
        {resumeData.experience.map((exp, index) => (
          <div 
            key={index} 
            className="space-y-6 border-l-2 border-primary pl-8 relative"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>
                <p className="text-xl text-primary font-medium mb-2">{exp.title}</p>
                <p className="text-muted-foreground">{exp.location}</p>
              </div>
              <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium">
                {exp.period}
              </span>
            </div>
            <ul className="list-disc list-outside space-y-3 text-muted-foreground ml-4">
              {exp.responsibilities.map((desc, i) => (
                <li key={i} className="leading-relaxed pl-2">{desc}</li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-2 pt-4">
              {exp.skills.map((tech, i) => (
                <span
                  key={i}
                  className="px-4 py-2 text-sm rounded-full bg-secondary/50 text-secondary-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 