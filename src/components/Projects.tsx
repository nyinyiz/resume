import { useResume } from "@/context/ResumeContext";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, Smartphone, Terminal, Bot, LayoutDashboard, Send, Globe } from "lucide-react";

function ArchitectureNode({
  icon,
  label,
  sublabel,
  delay,
}: {
  icon: React.ReactNode;
  label: string;
  sublabel?: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="flex flex-col items-center gap-1"
    >
      <div className="px-4 py-3 rounded-xl border border-border bg-card text-center min-w-[120px]">
        <div className="flex items-center justify-center gap-2 text-sm font-medium">
          {icon}
          <span>{label}</span>
        </div>
        {sublabel && (
          <p className="text-xs text-muted-foreground mt-1">{sublabel}</p>
        )}
      </div>
    </motion.div>
  );
}

function Connector({ delay, height = "h-6" }: { delay: number; height?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, delay }}
      className={`w-px ${height} bg-border mx-auto`}
    />
  );
}

function ArchitectureFlow() {
  return (
    <div className="flex flex-col items-center">
      <ArchitectureNode
        icon={<Smartphone size={16} className="text-blue-500" />}
        label="Huawei Nova 7i"
        sublabel="Running 24/7"
        delay={0.3}
      />
      <Connector delay={0.5} />
      <ArchitectureNode
        icon={<Terminal size={16} className="text-green-500" />}
        label="Termux + Node.js"
        sublabel="Linux environment"
        delay={0.6}
      />
      <Connector delay={0.8} />

      {/* Branch split */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: 0.9 }}
        className="flex items-start gap-8 sm:gap-12"
      >
        {/* Left branch */}
        <div className="flex flex-col items-center">
          <div className="w-px h-4 bg-border" />
          <ArchitectureNode
            icon={<Bot size={16} className="text-purple-500" />}
            label="PicoClaw Bot"
            sublabel="AI assistant"
            delay={1.0}
          />
          <Connector delay={1.2} />
          <ArchitectureNode
            icon={<Send size={16} className="text-sky-500" />}
            label="Telegram"
            sublabel="Daily updates"
            delay={1.3}
          />
        </div>

        {/* Right branch */}
        <div className="flex flex-col items-center">
          <div className="w-px h-4 bg-border" />
          <ArchitectureNode
            icon={<LayoutDashboard size={16} className="text-orange-500" />}
            label="Dashboard"
            sublabel="CPU, RAM, Battery"
            delay={1.1}
          />
          <Connector delay={1.3} />
          <ArchitectureNode
            icon={<Globe size={16} className="text-pink-500" />}
            label="Browser"
            sublabel="Cloudflare Tunnel"
            delay={1.4}
          />
        </div>
      </motion.div>
    </div>
  );
}

function FeaturedProjectCard({ project }: { project: any }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="col-span-full mb-4"
    >
      <div className="p-[2px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
        <div className="rounded-2xl bg-background p-8 md:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left side: text + stats */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-2">
                  Featured Project
                </p>
                <h3 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  {project.name}
                </h3>
                <p className="text-lg text-muted-foreground mt-1">
                  Personal AI Server Running 24/7 on a Retired Phone
                </p>
              </div>

              <p className="text-muted-foreground leading-relaxed">
                {project.description}
              </p>

              {/* Highlights */}
              {project.highlights && (
                <ul className="space-y-2">
                  {project.highlights.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {/* Tags */}
              {project.tags && (
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag: string, i: number) => (
                    <span
                      key={i}
                      className="px-4 py-2 text-sm rounded-full bg-secondary/50 text-secondary-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Stats grid */}
              {project.stats && (
                <div className="grid grid-cols-2 gap-3">
                  {project.stats.map(
                    (stat: { label: string; value: string }, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                        className="px-4 py-3 rounded-xl border border-border bg-card"
                      >
                        <p className="text-xs text-muted-foreground uppercase tracking-wider">
                          {stat.label}
                        </p>
                        <p className="text-lg font-bold mt-1">{stat.value}</p>
                      </motion.div>
                    )
                  )}
                </div>
              )}

              {/* Link */}
              {project.link && (
                <div>
                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                  >
                    View on GitHub
                    <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>

            {/* Right side: architecture flow */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-sm">
                <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-6">
                  Architecture
                </p>
                <ArchitectureFlow />
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const resumeData = useResume();

  const featuredProject = resumeData.projects.find(
    (p: any) => p.featured === true
  );
  const regularProjects = resumeData.projects.filter(
    (p: any) => !p.featured
  );

  const getPlatformIcon = (link: string) => {
    if (link.includes("play.google.com")) {
      return (
        <Image
          src="/playstore-logo.svg"
          alt="Google Play Store"
          width={24}
          height={24}
          className="text-muted-foreground group-hover:text-primary transition-colors"
        />
      );
    } else if (link.includes("apps.apple.com")) {
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
          A selection of projects I&apos;ve worked on throughout my career
        </p>
      </div>

      {/* Featured hero card */}
      {featuredProject && <FeaturedProjectCard project={featuredProject} />}

      {/* Regular project grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {regularProjects.map((project: any, index: number) =>
          project.link ? (
            <Link
              key={index}
              href={project.link}
              {...(project.internal ? {} : { target: "_blank", rel: "noopener noreferrer" })}
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
                <h3 className="text-xl font-bold">{project.name}</h3>
              </div>
              <p className="text-muted-foreground leading-relaxed line-clamp-3">
                {project.description}
              </p>
            </motion.div>
          )
        )}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.3,
            delay: regularProjects.length * 0.1,
          }}
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
                  background:
                    "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
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
                <ArrowRight
                  size={16}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
