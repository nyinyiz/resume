import { useResume } from "@/context/ResumeContext";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

// Group consecutive experiences by company
function groupExperiencesByCompany(experiences: any[]) {
  const grouped: any[] = [];
  let currentGroup: any = null;

  experiences.forEach((exp) => {
    if (currentGroup && currentGroup.company === exp.company) {
      // Add to existing group (roles are already in chronological order in data)
      currentGroup.roles.push(exp);
    } else {
      // Start new group
      if (currentGroup) {
        grouped.push(currentGroup);
      }
      currentGroup = {
        company: exp.company,
        location: exp.location,
        roles: [exp]
      };
    }
  });

  if (currentGroup) {
    grouped.push(currentGroup);
  }

  return grouped;
}

export default function Experience() {
  const resumeData = useResume();
  const groupedExperiences = groupExperiencesByCompany(resumeData.experience);

  return (
    <section id="experience" className="space-y-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold mb-4">Experience</h2>
        <p className="text-muted-foreground">
          Over 7 years of experience in mobile development across different industries
        </p>
      </div>
      <div className="space-y-20">
        {groupedExperiences.map((group, groupIndex) => (
          <div
            key={groupIndex}
            className="space-y-8 border-l-2 border-primary pl-8 relative"
          >
            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-primary" />

            {/* Company header */}
            <div>
              <h3 className="text-2xl font-bold mb-1">{group.company}</h3>
              <p className="text-muted-foreground">{group.location}</p>
            </div>

            {/* Roles within the company */}
            <div className="space-y-10">
              {group.roles.map((role: any, roleIndex: number) => (
                <div key={roleIndex} className="space-y-4">
                  <div className="flex justify-between items-start flex-wrap gap-4">
                    <div>
                      <p className="text-xl text-primary font-medium">{role.title}</p>
                    </div>
                    <span className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground font-medium text-sm">
                      {role.period}
                    </span>
                  </div>
                  <ul className="list-disc list-outside space-y-3 text-muted-foreground ml-4">
                    {role.responsibilities.map((desc: string, i: number) => (
                      <li key={i} className="leading-relaxed pl-2">{desc}</li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {role.skills.map((tech: string, i: number) => (
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
          </div>
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="p-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_100%] group relative overflow-hidden"
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              backgroundPosition: ["0% 0%", "200% 0%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
          />
          <div className="p-8 rounded-xl bg-background flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Many More Experiences
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out my LinkedIn for more professional experiences and achievements
            </p>
            <div className="relative overflow-hidden rounded-full">
              <motion.div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  backgroundSize: "200% 100%",
                }}
                animate={{
                  backgroundPosition: ["-200% 0", "200% 0"],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <Link
                href={resumeData.personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
              >
                <span>View on LinkedIn</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 