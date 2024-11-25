import { useResume } from "@/context/ResumeContext";

export default function Speaking() {
  const resumeData = useResume();
  return (
    <section id="speaking" className="space-y-12 py-8">
      <h2 className="text-3xl font-bold">Community Contributions</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {resumeData.communityContributions.map((contribution, index) => (
          <div
            key={index}
            className="p-6 rounded-lg border border-border bg-card hover:bg-accent/50 transition-colors"
          >
            <h3 className="text-xl font-semibold mb-2">{contribution.event}</h3>
            {contribution.organization && (
              <p className="text-muted-foreground mb-2">{contribution.organization}</p>
            )}
            <p className="text-primary font-medium">{contribution.topic}</p>
          </div>
        ))}
      </div>
    </section>
  );
} 