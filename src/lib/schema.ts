import { z } from "zod";

export const PersonalInfoSchema = z.object({
  name: z.string().min(1, "Name is required"),
  title: z.string().min(1, "Title is required"),
  email: z.string().email("Invalid email address"),
  location: z.string(),
  phone: z.string(),
  github: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  summary: z.string()
});

export const ExperienceSchema = z.object({
  title: z.string(),
  company: z.string(),
  location: z.string(),
  period: z.string(),
  responsibilities: z.array(z.string()),
  skills: z.array(z.string())
});

export const ProjectSchema = z.object({
  name: z.string(),
  description: z.string()
});

export const CertificateSchema = z.object({
  name: z.string(),
  url: z.string().url()
});

export const CommunityContributionSchema = z.object({
  event: z.string(),
  organization: z.string().optional(),
  topic: z.string()
});

export const ResumeSchema = z.object({
  personalInfo: PersonalInfoSchema,
  experience: z.array(ExperienceSchema),
  projects: z.array(ProjectSchema),
  communityContributions: z.array(CommunityContributionSchema),
  certificates: z.array(CertificateSchema)
}); 