import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { resumeData } from "@/data/resume";

export default function Hero() {
  const { personalInfo } = resumeData;

  return (
    <section className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">
          Hi, I'm <span className="text-primary">{personalInfo.name}</span>
        </h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {personalInfo.title}
        </h2>
        <p className="max-w-prose text-muted-foreground">
          {personalInfo.summary}
        </p>
        <div className="flex gap-4">
          <a
            href={personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-accent"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href={personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-accent"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            className="rounded-full p-2 hover:bg-accent"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span>{personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-primary" />
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-primary" />
            <span>{personalInfo.email}</span>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gray-200">
        <Image
          src="/my_profile.jpg"
          alt={personalInfo.name}
          fill
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
} 