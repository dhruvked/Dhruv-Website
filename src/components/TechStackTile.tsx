import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ContentStore, type TechStackDomain } from '../data/contentStore';

interface TechStackTileProps {
  accentColor?: string;
}

export const TechStackTile: React.FC<TechStackTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [techStackDomains, setTechStackDomains] = useState<TechStackDomain[]>(() => ContentStore.getContent().techStack);
  const [selectedDomainId, setSelectedDomainId] = useState<string>('s1');
  const [hoveredAxis, setHoveredAxis] = useState<{ id: string; label: string; score: number } | null>(null);

  useEffect(() => {
    const latest = ContentStore.getContent().techStack;
    setTechStackDomains(latest);
    if (latest.length > 0 && !latest.some((d) => d.id === selectedDomainId)) {
      setSelectedDomainId(latest[0].id);
    }
  }, []);

  const activeSpec = techStackDomains.find((d) => d.id === selectedDomainId) || techStackDomains[0];

  const angles = [-90, -18, 54, 126, 198];

  const radarAxes = techStackDomains.map((domain, idx) => ({
    id: domain.id,
    label: domain.domain,
    score: domain.percentage,
    angle: angles[idx % angles.length]
  }));

  const handleAxisClick = (domainId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDomainId(domainId);
    setIsFlipped(true);
  };

  const cx = 160;
  const cy = 100;
  const maxR = 58;

  const polygonPoints = radarAxes.map((axis) => {
    const rad = (axis.angle * Math.PI) / 180;
    const r = (axis.score / 100) * maxR;
    const x = cx + r * Math.cos(rad);
    const y = cy + r * Math.sin(rad);
    return `${x},${y}`;
  }).join(' ');

  if (!activeSpec) return null;

  return (
    <div
      className="tech-stack-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1200px', cursor: 'pointer' }}
    >
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
        {/* FRONT FACE: RADAR GRAPH WITH DYNAMIC PERCENTAGES */}
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

              {radarAxes.map((axis, idx) => {
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

              <polygon
                points={polygonPoints}
                fill="rgba(255, 107, 0, 0.14)"
                stroke={accentColor}
                strokeWidth="1.5"
              />

              {radarAxes.map((axis, idx) => {
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
                      {axis.label} ({axis.score}%)
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: hoveredAxis ? accentColor : 'rgba(255,255,255,0.6)', fontWeight: 600, transition: 'color 0.2s ease' }}>
              {hoveredAxis ? `${hoveredAxis.label.toUpperCase()} — ${hoveredAxis.score}% (TAP TO INSPECT)` : 'TAP ANY DOMAIN TO INSPECT SPECS ↗'}
            </span>
          </div>
        </div>

        {/* BACK FACE: SPEC DETAILS */}
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
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.02em' }}>
              {activeSpec.domain}
            </h3>
            <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700 }}>
              {activeSpec.percentage}% PROFICIENCY
            </span>
          </div>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem', margin: '0.6rem 0' }}>
            {activeSpec.specDetails.map((detail, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '0.5rem',
                  fontSize: '0.78rem',
                  fontFamily: 'var(--font-satoshi)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  lineHeight: 1.45
                }}
              >
                <span style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontSize: '0.7rem', marginTop: '0.1rem' }}>
                  0{idx + 1}.
                </span>
                <span>{detail}</span>
              </div>
            ))}
          </div>

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
