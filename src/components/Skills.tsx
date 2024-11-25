import { useResume } from "@/context/ResumeContext";

export default function Skills() {
  const resumeData = useResume();
  const skills = resumeData.skills || {
    languages: [],
    frameworks: [],
    tools: [],
    concepts: []
  };

  return (
    <section id="skills" className="space-y-12 py-8">
      <h2 className="text-3xl font-bold">Skills</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="space-y-6">
            <h3 className="text-2xl font-semibold capitalize">{category}</h3>
            <div className="space-y-4">
              {items.map((skill: { name: string; level: number }, index: number) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground font-medium">
                      {skill.name}
                    </span>
                    <span className="text-sm text-muted-foreground">
                      {skill.level}/5
                    </span>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary rounded-full transition-all duration-500 ease-out"
                      style={{ width: `${(skill.level / 5) * 100}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
} 