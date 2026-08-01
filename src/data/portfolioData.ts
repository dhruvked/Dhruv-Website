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
    gridSpan: { colStart: 1, rowStart: 1, colSpan: 7, rowSpan: 12 },
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
    gridSpan: { colStart: 8, rowStart: 1, colSpan: 5, rowSpan: 2 },
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
    gridSpan: { colStart: 8, rowStart: 3, colSpan: 5, rowSpan: 10 },
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
    gridSpan: { colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 4 },
    isRotating: true,
    type: 'clock',
    front: {
      title: 'Local Clock',
      subtitle: 'ANALOG CLOCK',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'ping-signal',
    gridSpan: { colStart: 1, rowStart: 5, colSpan: 4, rowSpan: 2 },
    isRotating: false,
    type: 'ping',
    front: {
      title: 'Quick Ping',
      subtitle: 'SIGNAL',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'terminal-sandbox',
    gridSpan: { colStart: 5, rowStart: 1, colSpan: 6, rowSpan: 6 },
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
    gridSpan: { colStart: 1, rowStart: 7, colSpan: 12, rowSpan: 6 },
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
    gridSpan: { colStart: 1, rowStart: 1, colSpan: 12, rowSpan: 6 },
    isRotating: false,
    type: 'techstack',
    front: {
      title: 'Tech Stack Matrix',
      subtitle: 'CATEGORIZED PROFICIENCY',
      accentColor: '#ff6b00'
    }
  }
];
