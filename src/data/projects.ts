import type { Project } from '../types';

export const PROJECTS: Project[] = [
  {
    id: 'vot-decart',
    title: 'vot-decart',
    subtitle: 'Real-Time AI Virtual Try-On Platform',
    tagline: 'Live WebRTC camera streaming with real-time video-to-video garment transformation via Decart AI API.',
    category: 'AI & Streaming',
    featured: true,
    accentColor: '#00f0ff',
    tags: ['WebRTC', 'Decart AI', 'lucy_2_rt', 'Next.js', 'Express', 'Drizzle ORM', 'TypeScript'],
    metrics: ['Sub-150ms Stream Latency', 'Realtime Frame Ingestion', 'WebRTC Video-to-Video'],
    description: 'vot-decart is a cutting-edge real-time AI Virtual Try-On web application. It integrates the Decart AI Realtime API (lucy_2_rt model) with WebRTC camera streaming to perform live video-to-video body transformation using uploaded clothing reference images.',
    architectureDetails: [
      'Backend token generation route (/api/try-on/token) authenticating client streams securely with Decart SDK.',
      'Frontend WebRTC media stream retrieval using navigator.mediaDevices.getUserMedia with custom low-latency video elements.',
      'Real-time prompt payload injection (set image, prompt: "virtual try-on this clothing", enhance: true) directly over WebRTC data channels.'
    ],
    highlights: [
      'Built with Better-T-Stack monorepo (Next.js web app + Express server + shared UI package).',
      'Instant client-side canvas preview & reference garment upload manager.',
      'Seamless fallbacks for variable network latency.'
    ],
    localPath: 'C:/Users/Dhruv/Documents/Programs/vot-decart'
  },
  {
    id: 'clothing-pipeline',
    title: 'clothing',
    subtitle: 'Headless Blender 3D Garment Pipeline',
    tagline: 'Automated 3D clothing processing & mesh alignment service powered by Blender 5.0 Python execution.',
    category: '3D & Graphics',
    featured: true,
    accentColor: '#8a2be2',
    tags: ['Blender 5.0 (bpy)', 'Python', 'Node.js', 'Three.js', 'GLB Assets', 'TypeScript'],
    metrics: ['100% Automated 3D Processing', 'Headless Background Execution', 'Zero Manual Retopology'],
    description: 'An automated 3D mesh processing pipeline designed to ingest raw clothing GLB files, execute headless Blender Python scripts (bpy), perform transformations, recalculate normals, apply smooth shading, and output optimized 3D assets ready for avatar fitting.',
    architectureDetails: [
      'Express.js upload controller managing multer storage queues in uploads/glb/.',
      'Headless Blender execution service running blender.exe -b -P process_clothing.py with child_process spawn.',
      'Real-time job progress polling & metadata generation saving asset geometry bounds.'
    ],
    highlights: [
      'Automates normal recalculations, smooth shading, and matrix transformations programmatically.',
      'Generates light-weight GLB outputs ready for web-based Three.js rendering canvas.',
      'Includes complete Dockerization documentation for scalable headless cloud processing.'
    ],
    localPath: 'C:/Users/Dhruv/Documents/Programs/clothing'
  },
  {
    id: 'seam-healthcare',
    title: 'Seam',
    subtitle: 'AI Healthcare Platform (ABDM Ecosystem)',
    tagline: 'Streamlined medical record management and doctor-patient context synthesis leveraging vector search & LLMs.',
    category: 'Healthcare AI',
    featured: true,
    accentColor: '#10b981',
    tags: ['Next.js', 'ABDM Protocol', 'Vector Search', 'RAG', 'LLM Summarization', 'PostgreSQL'],
    metrics: ['Unified EHR Ingestion', 'Instant Medical Record Summary', 'ABDM Compliant'],
    description: 'Seam is an AI-powered healthcare application built on India\'s ABDM (Ayushman Bharat Digital Mission) ecosystem. It ingests complex medical records (EHR/EMR), creates semantic vector embeddings, and generates structured LLM record summaries for rapid clinical decision making.',
    architectureDetails: [
      'Secure ABDM health repository connector ingesting FHIR compliant medical data.',
      'Embedding generation pipeline storing patient history vectors in PostgreSQL pgvector.',
      'Retrieval-Augmented Generation (RAG) agent summarizing medical histories in seconds for attending doctors.'
    ],
    highlights: [
      'Eliminates friction in doctor-patient interactions by highlighting critical lab results instantly.',
      'Strict HIPAA / ABDM data privacy controls & local encryption layers.',
      'Intuitive Next.js clinician dashboard with timeline view of patient encounters.'
    ]
  },
  {
    id: 'choreo-platform',
    title: 'Choreo AI Avatars',
    subtitle: 'Enterprise AI Avatar & RAG Platform',
    tagline: 'Interactive AI Avatars streaming live video responses with long-term vector memory & fine-tuning workflows.',
    category: 'AI & Streaming',
    featured: true,
    accentColor: '#3b82f6',
    tags: ['OpenAI / Gemini', 'HeyGen Streaming API', 'Vector Embeddings', 'Docker', 'AWS EKS', 'Kubernetes'],
    metrics: ['100+ Live Partner Sessions', '90% Context Accuracy', 'Kubernetes Cloud Infrastructure'],
    description: 'At Choreo, LLC, engineered real-time interactive AI avatars supporting live video sessions for celebrity and institutional partners. Implemented RAG memory vector systems and built an internal admin dashboard managing 10+ avatars and 500+ interaction logs.',
    architectureDetails: [
      'Real-time streaming integration with OpenAI, Gemini, and HeyGen video generation APIs.',
      'Vector memory pipeline providing contextual persona memory across multiple chat sessions.',
      'Containerized deployment on AWS EKS and ECR for zero-downtime microservice scaling.'
    ],
    highlights: [
      'Internal prompt-evaluation and fine-tuning suite for AI avatar behavior.',
      'High-throughput data ingestion handling hundreds of concurrent streaming users.',
      'Continuous automated integration testing with Kubernetes.'
    ]
  },
  {
    id: 'habits-app',
    title: 'Habits',
    subtitle: 'High-Performance Habit Tracker',
    tagline: 'Modern, minimal habit tracking application with optimized client-side state and comprehensive unit testing.',
    category: 'Full Stack',
    featured: false,
    accentColor: '#f59e0b',
    tags: ['Next.js', 'React', 'Jest', 'TypeScript', 'TailwindCSS'],
    metrics: ['100% Jest Test Coverage', 'Sub-50ms Client State Updates'],
    description: 'Habits is a clean, minimal micro-application for daily habit tracking built with Next.js and TypeScript. Features robust unit testing with Jest and seamless offline-first state persistence.',
    architectureDetails: [
      'Strict TypeScript domain models ensuring type-safe habit state transitions.',
      'Complete Jest test suite (__tests__) verifying streak calculations and calendar roll-over logic.'
    ],
    highlights: [
      'Zero-lag UI with optimistic state updates.',
      'Clean modular architecture designed for instant extensibility.'
    ],
    localPath: 'C:/Users/Dhruv/Documents/Programs/Habits'
  }
];
