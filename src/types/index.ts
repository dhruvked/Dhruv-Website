export interface Project {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  category: 'AI & Streaming' | '3D & Graphics' | 'Healthcare AI' | 'Full Stack';
  featured: boolean;
  tags: string[];
  metrics: string[];
  description: string;
  architectureDetails: string[];
  localPath?: string;
  demoUrl?: string;
  githubUrl?: string;
  accentColor: string;
  highlights: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: {
    name: string;
    level: string;
    iconName: string;
    featured?: boolean;
  }[];
}

export interface TerminalCommand {
  command: string;
  description: string;
  action: () => string;
}
