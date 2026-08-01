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
    id: 'career-timeline',
    gridSpan: { colStart: 8, rowStart: 1, colSpan: 5, rowSpan: 12 },
    isRotating: false,
    type: 'timeline',
    front: {
      title: 'Career Timeline',
      subtitle: 'MILESTONES',
      accentColor: '#ff6b00'
    }
  }
];
