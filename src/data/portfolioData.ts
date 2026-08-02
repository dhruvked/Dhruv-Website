export interface TileData {
  id: string;
  gridSpan: {
    colStart?: number; // 1 to 12
    rowStart?: number; // 1 to 12
    colSpan: number;   // 1 to 12
    rowSpan: number;   // 1 to 12
  };
  isBlank?: boolean;
  isRotating?: boolean;
  type?: string;
  front?: {
    title?: string;
    subtitle?: string;
    description?: string;
    category?: string;
    tags?: string[];
    accentColor?: string;
    metrics?: string[];
    availabilityStatus?: string;
    tagline?: string;
    photoUrl?: string;
    ctaPrimary?: { label: string; url?: string };
    ctaSecondary?: { label: string; url?: string };
  };
  side?: {
    title?: string;
    subtitle?: string;
    details?: string[];
    metrics?: string[];
    techStack?: string[];
  };
}

export const ASYMMETRICAL_GRID_TILES: TileData[] = [
  {
    id: 'hero-split-bio',
    gridSpan: { colStart: 1, rowStart: 1, colSpan: 7, rowSpan: 3 },
    isRotating: true,
    type: 'hero',
    front: {
      title: 'Dhruv Kedia',
      photoUrl: '/src/assets/dhruv_portrait.jpg',
      accentColor: '#ff6b00'
    },
    side: {
      title: 'Dhruv Kedia',
      subtitle: 'FULL-STACK & AI SYSTEMS ENGINEER',
      details: [
        'Architecting high-performance web platforms, scalable microservices, and autonomous AI architectures with a focus on speed and solid system design.'
      ]
    }
  },
  {
    id: 'social-connect',
    gridSpan: { colStart: 10, rowStart: 1, colSpan: 3, rowSpan: 1 },
    isRotating: false,
    type: 'social',
    front: {
      title: 'Social Connect',
      subtitle: 'CONNECT',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'career-timeline',
    gridSpan: { colStart: 10, rowStart: 2, colSpan: 3, rowSpan: 11 },
    isRotating: false,
    type: 'timeline',
    front: {
      title: 'Career Timeline',
      subtitle: 'MILESTONES',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'clock-tile',
    gridSpan: { colStart: 8, rowStart: 1, colSpan: 2, rowSpan: 3 },
    isRotating: true,
    type: 'clock',
    front: {
      title: 'Local Clock',
      subtitle: 'ANALOG CLOCK',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'developer-desk',
    gridSpan: { colStart: 1, rowStart: 10, colSpan: 4, rowSpan: 3 },
    isRotating: true,
    type: 'desk',
    front: {
      title: 'Dev Desk Stream',
      subtitle: 'LIVE WORKSPACE',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'terminal-sandbox',
    gridSpan: { colStart: 1, rowStart: 4, colSpan: 4, rowSpan: 6 },
    isRotating: false,
    type: 'terminal',
    front: {
      title: 'CLI Terminal',
      subtitle: 'INTERACTIVE SANDBOX',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'featured-projects',
    gridSpan: { colStart: 5, rowStart: 8, colSpan: 5, rowSpan: 5 },
    isRotating: false,
    type: 'projects',
    front: {
      title: 'Featured Projects',
      subtitle: 'BENTO MATRIX',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'tech-stack-matrix',
    gridSpan: { colStart: 5, rowStart: 4, colSpan: 5, rowSpan: 4 },
    isRotating: false,
    type: 'techstack',
    front: {
      title: 'Tech Stack Matrix',
      subtitle: 'CATEGORIZED PROFICIENCY',
      accentColor: '#ff6b00'
    }
  }
];
