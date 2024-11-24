export interface Experience {
  company: string;
  position: string;
  duration: string;
  description: string[];
  technologies: string[];
}

export interface Project {
  title: string;
  description: string;
  technologies: string[];
  image: string;
  link?: string;
}

export interface Education {
  institution: string;
  degree: string;
  field: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface ResumeData {
  personalInfo: {
    name: string;
    title: string;
    email: string;
    location: string;
    phone: string;
    github: string;
    linkedin: string;
    summary: string;
  };
  education: Education[];
  experience: Array<{
    title: string;
    company: string;
    location: string;
    period: string;
    responsibilities: string[];
    skills: string[];
  }>;
  projects: Array<{
    name: string;
    description: string;
  }>;
  communityContributions: Array<{
    event: string;
    organization?: string;
    topic: string;
  }>;
  certificates: Array<{
    name: string;
    url: string;
  }>;
} 