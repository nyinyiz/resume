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

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'languages' | 'frameworks' | 'tools';
} 