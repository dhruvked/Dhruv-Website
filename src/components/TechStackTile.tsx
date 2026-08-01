import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TechStackTileProps {
  accentColor?: string;
}

interface DomainSpec {
  id: string;
  title: string;
  score: number;
  tools: string[];
  accomplishment: string;
  project: string;
}

const DOMAIN_SPECS: DomainSpec[] = [
  {
    id: 'ai-rag',
    title: 'AI SYSTEMS & RAG',
    score: 95,
    tools: ['OpenAI API', 'Gemini API', 'Decart AI', 'Vector Search', 'HeyGen'],
    accomplishment: 'Engineered real-time video garment transfer & RAG memory pipelines (+90% accuracy).',
    project: 'Choreo AI / Virtual Try-On'
  },
  {
    id: 'fullstack',
    title: 'FULL-STACK CORE',
    score: 90,
    tools: ['TypeScript', 'JavaScript', 'React / Next.js', 'Node.js', 'Express', 'PostgreSQL'],
    accomplishment: 'Architected high-concurrency web platforms, microservices & reactive matrix UIs.',
    project: 'Seam / Dhruv-Website'
  },
  {
    id: 'python-data',
    title: 'PYTHON & DATA',
    score: 85,
    tools: ['Python', 'Pandas', 'NumPy', 'Data Ingestion', 'SQL', 'LLM Datasets'],
    accomplishment: 'Built dataset evaluation platform handling 500+ user interactions for LLM fine-tuning.',
    project: 'LLM Dataset Pipeline'
  },
  {
    id: 'devops',
    title: 'DEVOPS & CLOUD',
    score: 74,
    tools: ['AWS (EKS/ECR)', 'Docker', 'Kubernetes', 'CI/CD', 'Git'],
    accomplishment: 'Containerized cloud infrastructure supporting high-concurrency real-time AI workloads.',
    project: 'AWS Cloud Infra'
  },
  {
    id: '3d-graphics',
    title: '3D AUTOMATION',
    score: 60,
    tools: ['Blender (bpy)', 'GLB Assets', 'Mesh Transformations', 'Normal Recalculation'],
    accomplishment: 'Automated 3D avatar clothing pipeline with headless Blender Python scripts.',
    project: 'Avatar 3D Pipeline'
  }
];

// All Axes Mapped to Domain Specs (Selection occurs on Front Page ONLY)
const RADAR_AXES = [
  { id: 'ai-rag', label: 'AI Systems & RAG', score: 95, color: '#ff6b00', angle: -90 },
  { id: 'fullstack', label: 'Full-Stack (TS/React)', score: 90, color: '#ff6b00', angle: -18 },
  { id: 'devops', label: 'DevOps & Cloud', score: 74, color: '#ff6b00', angle: 54 },
  { id: '3d-graphics', label: '3D Automation', score: 60, color: '#ff6b00', angle: 126 },
  { id: 'python-data', label: 'Python & Data Pipelines', score: 85, color: '#ff6b00', angle: 198 }
];

export const TechStackTile: React.FC<TechStackTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedDomainId, setSelectedDomainId] = useState<string>('ai-rag');
  const [hoveredAxis, setHoveredAxis] = useState<{ id: string; label: string; score: number; color: string } | null>(null);

  const activeSpec = DOMAIN_SPECS.find((d) => d.id === selectedDomainId) || DOMAIN_SPECS[0];

  const handleAxisClick = (domainId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDomainId(domainId);
    setIsFlipped(true);
  };

  // Center & Radii optimized for 320x210 Canvas
  const cx = 160;
  const cy = 100;
  const maxR = 58;

  const polygonPoints = RADAR_AXES.map((axis) => {
    const rad = (axis.angle * Math.PI) / 180;
    const r = (axis.score / 100) * maxR;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div
      className="tech-stack-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1200px', cursor: 'pointer' }}
    >
      {/* Framer Motion 3D Rotatable Inner Container */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{
          duration: 0.75,
          type: 'spring',
          stiffness: 75,
          damping: 15
        }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* FRONT FACE: SELECT DOMAIN FROM RADAR GRAPH ONLY */}
        <div
          className="cube-face cube-face-front"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: 'none',
            borderRadius: '8px',
            padding: '1rem 0.8rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Radar Canvas */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '100%',
              height: '100%'
            }}
          >
            <svg width="320" height="210" viewBox="0 0 320 210" style={{ overflow: 'visible', maxWidth: '100%', maxHeight: '100%' }}>
              {/* Concentric Background Grid Rings */}
              {[0.33, 0.66, 1.0].map((level, idx) => (
                <circle
                  key={idx}
                  cx={cx}
                  cy={cy}
                  r={maxR * level}
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.06)"
                  strokeWidth="1"
                />
              ))}

              {/* Axis Spoke Lines */}
              {RADAR_AXES.map((axis, idx) => {
                const rad = (axis.angle * Math.PI) / 180;
                const x2 = cx + maxR * Math.cos(rad);
                const y2 = cy + maxR * Math.sin(rad);
                return (
                  <line
                    key={idx}
                    x1={cx}
                    y1={cy}
                    x2={x2}
                    y2={y2}
                    stroke="rgba(255, 255, 255, 0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Filled Polygon Mesh */}
              <polygon
                points={polygonPoints}
                fill="rgba(255, 107, 0, 0.14)"
                stroke={accentColor}
                strokeWidth="1.5"
              />

              {/* Axis Points and Clickable Labels (Selection occurs HERE on front page) */}
              {RADAR_AXES.map((axis, idx) => {
                const rad = (axis.angle * Math.PI) / 180;
                const pointR = (axis.score / 100) * maxR;
                const px = cx + pointR * Math.cos(rad);
                const py = cy + pointR * Math.sin(rad);

                const labelR = maxR + 15;
                const lx = cx + labelR * Math.cos(rad);
                const ly = cy + labelR * Math.sin(rad);

                const isHovered = hoveredAxis?.id === axis.id;

                return (
                  <g
                    key={idx}
                    onClick={(e) => handleAxisClick(axis.id, e)}
                    onMouseEnter={() => setHoveredAxis(axis)}
                    onMouseLeave={() => setHoveredAxis(null)}
                    style={{ cursor: 'pointer' }}
                  >
                    <circle
                      cx={px}
                      cy={py}
                      r={isHovered ? 5.5 : 3.5}
                      fill={accentColor}
                      stroke="#ffffff"
                      strokeWidth="1"
                      style={{ transition: 'all 0.2s ease', filter: isHovered ? `drop-shadow(0 0 8px ${accentColor})` : 'none' }}
                    />

                    <text
                      x={lx}
                      y={ly}
                      fill={isHovered ? accentColor : 'rgba(255, 255, 255, 0.75)'}
                      fontSize="9.5"
                      fontFamily="var(--font-mono)"
                      fontWeight={isHovered ? '700' : '400'}
                      textAnchor={lx > cx + 15 ? 'start' : lx < cx - 15 ? 'end' : 'middle'}
                      alignmentBaseline="middle"
                      style={{ transition: 'fill 0.2s ease' }}
                    >
                      {axis.label}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Footer Tooltip Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: hoveredAxis ? accentColor : 'rgba(255,255,255,0.6)', fontWeight: 600, transition: 'color 0.2s ease' }}>
              {hoveredAxis ? `${hoveredAxis.label.toUpperCase()} — ${hoveredAxis.score}% (TAP TO INSPECT)` : 'TAP ANY DOMAIN TO INSPECT SPECS ↗'}
            </span>
          </div>
        </div>

        {/* BACK FACE: CLEAN DISPLAY ONLY (NO TAB SELECTION HERE) */}
        <div
          className="cube-face cube-face-side"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            transform: 'rotateY(180deg)',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: 'none',
            borderRadius: '8px',
            padding: '1.4rem 1.2rem 1.1rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Header Bar showing Selected Domain */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.02em' }}>
              {activeSpec.title}
            </h3>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700 }}>
              {activeSpec.score}% PROFICIENCY
            </span>
          </div>

          {/* SPEC SHEET CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.9rem', margin: '0.6rem 0' }}>
            <div>
              <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.45)', marginBottom: '0.35rem' }}>
                PRODUCTION TOOLS & FRAMEWORKS:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {activeSpec.tools.map((tool, idx) => (
                  <span
                    key={idx}
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'rgba(255, 255, 255, 0.85)',
                      padding: '0.25rem 0.65rem',
                      borderRadius: '3px'
                    }}
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Minimal 1-Line Real-World Impact Statement */}
            <div style={{ borderLeft: `2px solid ${accentColor}`, paddingLeft: '0.75rem' }}>
              <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, marginBottom: '0.2rem' }}>
                REAL-WORLD IMPACT ({activeSpec.project}):
              </div>
              <p style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.85)', fontFamily: 'var(--font-satoshi)', lineHeight: 1.45 }}>
                {activeSpec.accomplishment}
              </p>
            </div>
          </div>

          {/* Footer Back Instruction Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
              CLICK ANYWHERE TO RETURN TO RADAR MATRIX ↺
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
