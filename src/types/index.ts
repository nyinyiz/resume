export interface Project {
  name: string;
  description: string;
  link?: string;
  internal?: boolean;
  featured?: boolean;
  highlights?: string[];
  tags?: string[];
  stats?: Array<{ label: string; value: string }>;
}

export interface Education {
  institution: string;
  degree: string;
  field?: string;
  location: string;
  graduationYear: string;
  gpa?: string;
  relevantCourses?: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  type?: string;
  responsibilities: string[];
  skills: string[];
}

export interface SkillRating {
  name: string;
  level: number;
}

export interface ResumeSkills {
  languages: SkillRating[];
  frameworks: SkillRating[];
  tools: SkillRating[];
  concepts: SkillRating[];
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
    profileImage?: string;
    summary: string;
  };
  education: Education[];
  experience: Experience[];
  projects: Project[];
  communityContributions: Array<{
    event: string;
    organization?: string;
    topic: string;
  }>;
  certificates: Array<{
    name: string;
    url: string;
  }>;
  skills?: ResumeSkills;
  detailedTechnicalExpertise?: {
    languagesAndFrameworks: string[];
    architectureAndPatterns: string[];
    databaseAndStorage: string[];
    uiUxAndCustomComponents: string[];
    testingAndQuality: string[];
    toolingAndDevOps: string[];
    collaborationAndAgile: string[];
  };
  portfolioLinks?: {
    github: string;
    portfolio: string;
    medium: string;
    projects: Array<{
      name: string;
      description: string;
      url: string;
    }>;
  };
}
