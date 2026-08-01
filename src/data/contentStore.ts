export interface TimelineItem {
  id: string;
  year: string;
  role: string;
  description: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  tag: string;
  tagline: string;
  description: string;
  techPills: string[];
  codeUrl: string;
  specs: string[];
}

export interface TechStackDomain {
  id: string;
  domain: string;
  percentage: number;
  specDetails: string[];
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  email: string;
}

export interface HeroBioContent {
  name: string;
  roleTitle: string;
  bioSummary: string;
  resumeUrl: string;
}

export interface PortfolioContentModel {
  heroBio: HeroBioContent;
  timeline: TimelineItem[];
  projects: ProjectItem[];
  techStack: TechStackDomain[];
  socials: SocialLinks;
}

export const INITIAL_CONTENT: PortfolioContentModel = {
  heroBio: {
    name: 'Dhruv Kedia',
    roleTitle: 'Full-Stack & Distributed AI Systems Engineer',
    bioSummary: 'Architecting high-performance web platforms, scalable microservices, and autonomous AI architectures with a focus on speed and solid system design.',
    resumeUrl: '/Dhruv_Kedia_Resume.pdf'
  },
  timeline: [
    {
      id: 't1',
      year: '2024 – PRESENT',
      role: 'Senior Full-Stack & AI Engineer',
      description: 'Multi-agent AI workflows & distributed systems.'
    },
    {
      id: 't2',
      year: '2022 – 2024',
      role: 'Full-Stack Systems Engineer',
      description: 'High-throughput APIs & cloud microservices.'
    },
    {
      id: 't3',
      year: '2021 – 2022',
      role: 'Software Engineering Intern',
      description: 'Backend microservices & open-source tools.'
    },
    {
      id: 't4',
      year: '2021',
      role: 'B.Tech Computer Science',
      description: 'B.Tech CS degree; focused on algorithms.'
    }
  ],
  projects: [
    {
      id: 'p1',
      title: 'SEAM AI',
      tag: '01 / SEAM',
      tagline: 'Multi-Agent Task Orchestration Framework',
      description: 'Autonomous multi-agent execution engine with streaming DAG execution and vector memory context.',
      techPills: ['TypeScript', 'Node.js', 'Vector DB', 'OpenAI'],
      codeUrl: 'https://github.com/dhruvked',
      specs: ['Sub-100ms agent routing', 'Redis pub/sub DAG stream', 'Vector memory cache']
    },
    {
      id: 'p2',
      title: 'VIRTUAL TRY-ON',
      tag: '02 / TRY-ON',
      tagline: 'Real-Time Video Garment Swap',
      description: 'WebRTC video stream processing pipeline with real-time pose estimation and AI garment overlay.',
      techPills: ['Python', 'WebRTC', 'PyTorch', 'FastAPI'],
      codeUrl: 'https://github.com/dhruvked',
      specs: ['60 FPS WebRTC stream', 'Zero-latency pose tracking', 'GPU accelerated inferencing']
    },
    {
      id: 'p3',
      title: '3D PIPELINE',
      tag: '03 / 3D',
      tagline: 'Headless Blender Mesh Automation',
      description: 'Containerized Blender Python bpy service for automated 3D model generation & GLTF compression.',
      techPills: ['Blender bpy', 'Docker', 'AWS EKS', 'Python'],
      codeUrl: 'https://github.com/dhruvked',
      specs: ['Automated GLTF mesh Draco compression', 'AWS EKS horizontal pod scaling', 'REST microservice API']
    }
  ],
  techStack: [
    {
      id: 's1',
      domain: 'AI Systems & RAG',
      percentage: 95,
      specDetails: ['Autonomous Multi-Agent Task DAG Routing', 'Vector Embeddings & Semantic Search Context', 'LLM Fine-tuning & High-Throughput Streaming API']
    },
    {
      id: 's2',
      domain: 'Full-Stack (TS / React / Node)',
      percentage: 90,
      specDetails: ['React 19 & Next.js App Router Architecture', 'TypeScript Strict Systems Design', 'State Management & WebSockets Streaming']
    },
    {
      id: 's3',
      domain: 'Python & Data Pipelines',
      percentage: 85,
      specDetails: ['FastAPI & Async Engine Microservices', 'PyTorch Data Loaders & Model Serving', 'Pandas & PyArrow High Performance Data Frames']
    },
    {
      id: 's4',
      domain: 'DevOps & Cloud',
      percentage: 74,
      specDetails: ['Docker & Kubernetes EKS Cluster Orchestration', 'CI/CD GitHub Actions & Vercel Deployments', 'Redis & Postgres Database Optimizations']
    },
    {
      id: 's5',
      domain: '3D Automation',
      percentage: 60,
      specDetails: ['Headless Blender Python (bpy) Scripting', 'Draco GLTF Mesh Compression & Three.js', 'Procedural 3D Asset Render Microservices']
    }
  ],
  socials: {
    github: 'https://github.com/dhruvked',
    linkedin: 'https://linkedin.com/in/dhruvkedia',
    twitter: 'https://twitter.com/dhruvkedia',
    email: 'dhruvkedia@example.com'
  }
};

const CONTENT_STORAGE_KEY = 'dhruv_portfolio_content_data_v1';

export class ContentStore {
  private static cachedContent: PortfolioContentModel | null = null;

  public static getContent(): PortfolioContentModel {
    if (this.cachedContent) return this.cachedContent;

    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && parsed.heroBio && parsed.timeline) {
          this.cachedContent = parsed;
          return parsed;
        }
      }
    } catch (e) {}

    this.cachedContent = INITIAL_CONTENT;
    return INITIAL_CONTENT;
  }

  public static updateContent(newContent: PortfolioContentModel): void {
    this.cachedContent = newContent;
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(newContent, null, 2));
    } catch (e) {}
  }

  public static resetContent(): PortfolioContentModel {
    this.cachedContent = INITIAL_CONTENT;
    try {
      localStorage.removeItem(CONTENT_STORAGE_KEY);
    } catch (e) {}
    return INITIAL_CONTENT;
  }
}
