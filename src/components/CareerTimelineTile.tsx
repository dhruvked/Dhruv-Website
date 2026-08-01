import React, { useState } from 'react';
import { motion } from 'framer-motion';

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  description: string;
}

const TIMELINE_DATA: TimelineItem[] = [
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
];

interface CareerTimelineTileProps {
  accentColor: string;
}

export const CareerTimelineTile: React.FC<CareerTimelineTileProps> = ({ accentColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Active Job Accent Color: High-Tech Electric Cyan (#38bdf8)
  const activeJobColor = '#38bdf8';

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="career-timeline-minimal"
      onMouseLeave={() => setHoveredIndex(null)}
      style={{
        width: '100%',
        height: '100%',
        background: '#07090e',
        borderTop: `3px solid ${accentColor}`,
        padding: '2.2rem 1.8rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Main Timeline List Container (Heading Removed per directive) */}
      <div
        onMouseLeave={() => setHoveredIndex(null)}
        style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', margin: '0.2rem 0' }}
      >
        {/* Continuous Background Hairline Axis Line */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            bottom: '20px',
            left: '7px',
            width: '1px',
            background: `linear-gradient(180deg, ${accentColor} 0%, rgba(255,107,0,0.3) 50%, rgba(255,255,255,0.1) 100%)`,
            zIndex: 1
          }}
        />

        {/* Milestone Rows */}
        {TIMELINE_DATA.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isPresent = index === 0;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                position: 'relative',
                zIndex: 2,
                padding: '0.4rem 0',
                cursor: 'pointer'
              }}
            >
              {/* Bullet Node */}
              <div style={{ width: '15px', display: 'flex', justifyContent: 'center', flexShrink: 0 }}>
                <motion.div
                  animate={{
                    scale: isHovered ? 1.4 : 1,
                    backgroundColor: isHovered ? accentColor : isPresent ? activeJobColor : 'rgba(255, 255, 255, 0.35)',
                    boxShadow: isHovered ? `0 0 12px ${accentColor}` : isPresent ? `0 0 10px ${activeJobColor}` : 'none'
                  }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                  style={{
                    width: isPresent ? '9px' : '7px',
                    height: isPresent ? '9px' : '7px',
                    borderRadius: '50%'
                  }}
                />
              </div>

              {/* Text Element (TURNS ELECTRIC ORANGE ON HOVER) */}
              <motion.div
                animate={{ x: isHovered ? 5 : 0 }}
                transition={{ type: 'spring', stiffness: 350, damping: 22 }}
                style={{ flex: 1 }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
                  <span
                    style={{
                      fontSize: '0.72rem',
                      fontFamily: 'var(--font-mono)',
                      color: isHovered ? accentColor : isPresent ? activeJobColor : 'var(--text-muted)',
                      fontWeight: 600,
                      letterSpacing: '0.05em',
                      transition: 'color 0.25s ease'
                    }}
                  >
                    {item.year}
                  </span>

                  {isPresent && (
                    <span
                      style={{
                        fontSize: '0.6rem',
                        fontFamily: 'var(--font-mono)',
                        color: isHovered ? accentColor : activeJobColor,
                        opacity: 0.9,
                        fontWeight: 600,
                        transition: 'color 0.25s ease'
                      }}
                    >
                      [ACTIVE]
                    </span>
                  )}
                </div>

                <h3
                  style={{
                    fontSize: '1.02rem',
                    fontFamily: 'var(--font-satoshi)',
                    color: isHovered ? accentColor : '#ffffff',
                    fontWeight: 700,
                    margin: '0.05rem 0 0.15rem 0',
                    transition: 'color 0.25s ease'
                  }}
                >
                  {item.role}
                </h3>

                <p
                  style={{
                    fontSize: '0.84rem',
                    fontFamily: 'var(--font-satoshi)',
                    color: isHovered ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.65)',
                    lineHeight: 1.45,
                    margin: 0,
                    transition: 'color 0.25s ease'
                  }}
                >
                  {item.description}
                </p>
              </motion.div>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};
