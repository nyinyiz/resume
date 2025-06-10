import { useResume } from "@/context/ResumeContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function Projects() {
  const resumeData = useResume();

  const getPlatformIcon = (link: string) => {
    if (link.includes('play.google.com')) {
      return (
        <Image
          src="/playstore-logo.svg"
          alt="Google Play Store"
          width={24}
          height={24}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      );
    } else if (link.includes('apps.apple.com')) {
      return (
        <Image
          src="/apple-logo.svg"
          alt="Apple App Store"
          width={24}
          height={24}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      );
    }
    return null;
  };

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
          project.link ? (
            <Link
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="h-full p-8 rounded-xl border border-border bg-card hover:bg-accent/50 transition-all duration-300 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3 className="text-xl font-bold group-hover:text-primary transition-colors">
                      {project.name}
                    </h3>
                    {getPlatformIcon(project.link)}
                  </div>
                  <p className="text-muted-foreground leading-relaxed line-clamp-3">
                    {project.description}
                  </p>
                </div>
              </motion.div>
            </Link>
          ) : (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="h-full p-8 rounded-xl border border-border bg-card"
            >
              <div className="flex items-start justify-between gap-4 mb-6">
                <h3 className="text-xl font-bold">
                  {project.name}
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </motion.div>
          )
        ))}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: resumeData.projects.length * 0.1 }}
          className="h-full p-[2px] rounded-xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-[length:200%_100%] group relative overflow-hidden"
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
          <div className="h-full p-8 rounded-xl bg-background flex flex-col items-center justify-center text-center">
            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Many More
            </h3>
            <p className="text-muted-foreground mb-6">
              Check out my GitHub for more projects and contributions
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
                href={resumeData.personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white hover:opacity-90 transition-all duration-300"
              >
                <span>View on GitHub</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 