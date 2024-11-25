import Image from "next/image";
import { Github, Linkedin, Mail, MapPin, Phone, Copy } from "lucide-react";
import { useResume } from "@/context/ResumeContext";
import Link from "next/link";

export default function Hero() {
  const resumeData = useResume();
  const { name, title, summary, profileImage } = resumeData.personalInfo;

  const isExternalImage = profileImage?.startsWith('http');

  return (
    <section className="flex flex-col-reverse items-center justify-between gap-8 md:flex-row">
      <div className="flex-1 space-y-4">
        <h1 className="text-4xl font-bold">
          Hi, I'm <span className="text-primary">{name}</span>
        </h1>
        <h2 className="text-2xl font-semibold text-muted-foreground">
          {title}
        </h2>
        <p className="max-w-prose text-muted-foreground">
          {summary}
        </p>
        <div className="flex gap-4">
          <a
            href={resumeData.personalInfo.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-accent"
            aria-label="GitHub Profile"
          >
            <Github size={24} />
          </a>
          <a
            href={resumeData.personalInfo.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full p-2 hover:bg-accent"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={24} />
          </a>
          <a
            href={`mailto:${resumeData.personalInfo.email}`}
            className="rounded-full p-2 hover:bg-accent"
            aria-label="Email"
          >
            <Mail size={24} />
          </a>
        </div>
        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-primary" />
            <span>{resumeData.personalInfo.location}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone size={18} className="text-primary" />
            <span>{resumeData.personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} className="text-primary" />
            <span>{resumeData.personalInfo.email}</span>
          </div>
        </div>
      </div>
      <div className="relative h-64 w-64 overflow-hidden rounded-full bg-gray-200">
        {isExternalImage ? (
          // For external images
          <img
            src={profileImage}
            alt={name}
            className="object-cover w-full h-full"
          />
        ) : (
          // For local images
          <Image
            src={profileImage || "/placeholder-avatar.png"}
            alt={name}
            fill
            className="object-cover"
            priority
          />
        )}
      </div>
    </section>
  );
} 