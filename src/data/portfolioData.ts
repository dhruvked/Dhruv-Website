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
    gridSpan: { colStart: 1, rowStart: 1, colSpan: 7, rowSpan: 6 },
    isRotating: false,
    front: {
      title: 'Hero Tile 01',
      subtitle: 'SECTION 01',
      description: 'Primary hero content placeholder. Side-by-side with Tile 02 in Page 1.',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'hero-split-skills',
    gridSpan: { colStart: 8, rowStart: 1, colSpan: 5, rowSpan: 6 },
    isRotating: false,
    front: {
      title: 'Skills Radar 02',
      subtitle: 'CAPABILITIES',
      description: 'Engineering skills list placeholder.',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'feature-canvas-3d',
    gridSpan: { colStart: 1, rowStart: 7, colSpan: 4, rowSpan: 6 },
    isRotating: true,
    front: {
      title: 'Project Tile 03',
      subtitle: 'FEATURE ALPHA',
      description: 'Drag & resize tile visual handles.',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'feature-project-alpha',
    gridSpan: { colStart: 5, rowStart: 7, colSpan: 4, rowSpan: 6 },
    isRotating: true,
    front: {
      title: 'Project Tile 04',
      subtitle: 'FEATURE BETA',
      description: 'Drag & resize tile visual handles.',
      accentColor: '#ff6b00'
    }
  },
  {
    id: 'feature-project-beta',
    gridSpan: { colStart: 9, rowStart: 7, colSpan: 4, rowSpan: 6 },
    isRotating: true,
    front: {
      title: 'Project Tile 05',
      subtitle: 'FEATURE GAMMA',
      description: 'Drag & resize tile visual handles.',
      accentColor: '#ff6b00'
    }
  }
];
