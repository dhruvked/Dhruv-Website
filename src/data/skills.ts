import type { SkillCategory } from '../types';

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'ai-streaming',
    title: 'AI & WebRTC Streaming',
    description: 'Real-time AI video generation, LLM orchestration, and vector search systems.',
    skills: [
      { name: 'Decart AI (lucy_2_rt)', level: 'Advanced', iconName: 'Zap', featured: true },
      { name: 'WebRTC Video Streaming', level: 'Advanced', iconName: 'Video', featured: true },
      { name: 'RAG & Vector Embeddings', level: 'Expert', iconName: 'Database', featured: true },
      { name: 'OpenAI / Gemini APIs', level: 'Expert', iconName: 'Cpu', featured: true },
      { name: 'LLM Fine-Tuning & Datasets', level: 'Advanced', iconName: 'Sliders' }
    ]
  },
  {
    id: '3d-graphics',
    title: '3D Graphics & Automation',
    description: 'Headless 3D mesh automation, Blender Python scripting, and web 3D rendering.',
    skills: [
      { name: 'Blender 5.0 (bpy Python)', level: 'Expert', iconName: 'Box', featured: true },
      { name: 'Three.js / WebGL', level: 'Advanced', iconName: 'Layers', featured: true },
      { name: '3D GLB Mesh Processing', level: 'Expert', iconName: 'Maximize' },
      { name: 'Normal & Vector Math', level: 'Advanced', iconName: 'Activity' }
    ]
  },
  {
    id: 'full-stack',
    title: 'Full Stack Web Core',
    description: 'High-performance frontend & backend engineering with modern TypeScript stacks.',
    skills: [
      { name: 'TypeScript / JavaScript', level: 'Expert', iconName: 'Code', featured: true },
      { name: 'Next.js & React', level: 'Expert', iconName: 'Globe', featured: true },
      { name: 'Node.js & Express', level: 'Expert', iconName: 'Server', featured: true },
      { name: 'PostgreSQL & Drizzle ORM', level: 'Advanced', iconName: 'Database' },
      { name: 'Jest Unit Testing', level: 'Advanced', iconName: 'CheckCircle' }
    ]
  },
  {
    id: 'cloud-devops',
    title: 'Cloud & Infrastructure',
    description: 'Containerized microservices and automated deployment workflows.',
    skills: [
      { name: 'Docker & Microservices', level: 'Expert', iconName: 'Container', featured: true },
      { name: 'Kubernetes (AWS EKS)', level: 'Advanced', iconName: 'Cloud', featured: true },
      { name: 'AWS (ECR, EC2, S3)', level: 'Advanced', iconName: 'CloudRain' },
      { name: 'Git & Monorepo Tooling', level: 'Expert', iconName: 'GitBranch' }
    ]
  }
];
