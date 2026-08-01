import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  description: string;
  skills: string[];
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 't1',
    year: '2024 – PRESENT',
    role: 'Senior Full-Stack & AI Engineer',
    description: 'Architecting distributed multi-agent AI workflows, microservices, and web engines.',
    skills: ['React', 'TypeScript', 'Python', 'AI Agents']
  },
  {
    id: 't2',
    year: '2022 – 2024',
    role: 'Full-Stack Systems Engineer',
    description: 'Built high-throughput APIs, database cache pipelines (Redis/PostgreSQL), and web platforms.',
    skills: ['Node.js', 'Python', 'AWS', 'Docker']
  },
  {
    id: 't3',
    year: '2021 – 2022',
    role: 'Software Engineering Intern',
    description: 'Developed backend microservices, performance scripts, and open-source packages.',
    skills: ['JavaScript', 'Python', 'Git']
  },
  {
    id: 't4',
    year: '2021',
    role: 'B.Tech Computer Science',
    description: 'Graduated with distinction; focused on distributed systems and algorithms.',
    skills: ['CS Fundamentals', 'Algorithms', 'OS']
  }
];

interface CareerTimelineTileProps {
  accentColor: string;
}

export const CareerTimelineTile: React.FC<CareerTimelineTileProps> = ({ accentColor }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number>(0);

  // Height calculations for 4 perfectly spaced nodes
  const nodeYPositions = [28, 108, 188, 268];
  const activeY = nodeYPositions[hoveredIndex] || 28;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="career-timeline-framer"
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
      {/* Sleek Header */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '1.2rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '0.75rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
          <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: accentColor, opacity: 0.85, fontWeight: 600, letterSpacing: '0.08em' }}>
            02 //
          </span>
          <h2 style={{ fontSize: '0.98rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            CAREER TIMELINE
          </h2>
        </div>

        <motion.span
          animate={{ scale: [1, 1.3, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor, boxShadow: `0 0 10px ${accentColor}` }}
        />
      </motion.div>

      {/* Main Timeline Container with Framer Motion SVG Vector Line & Nodes */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '2.2rem', margin: '0.4rem 0' }}>
        {/* SVG Vector Line & Active Path Beam */}
        <svg
          style={{
            position: 'absolute',
            top: 0,
            left: '8px',
            width: '24px',
            height: '100%',
            overflow: 'visible',
            pointerEvents: 'none'
          }}
        >
          <defs>
            <linearGradient id="line-glow-grad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b00" stopOpacity="1" />
              <stop offset="50%" stopColor="#ff8533" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ff6b00" stopOpacity="0.2" />
            </linearGradient>
            <filter id="glow-effect" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background Static Hairline Axis */}
          <line x1="8" y1="28" x2="8" y2="268" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1.5" />

          {/* Framer Motion Animated Beam Path */}
          <motion.line
            x1="8"
            y1="28"
            x2="8"
            animate={{ y2: activeY }}
            transition={{ type: 'spring', stiffness: 120, damping: 18 }}
            stroke="url(#line-glow-grad)"
            strokeWidth="2.5"
            filter="url(#glow-effect)"
            strokeLinecap="round"
          />

          {/* Node SVG Circles */}
          {nodeYPositions.map((y, idx) => {
            const isHovered = hoveredIndex === idx;
            const isPresent = idx === 0;

            return (
              <g key={`svg-node-${idx}`}>
                <line x1="4" y1={y} x2="12" y2={y} stroke={isHovered ? accentColor : 'transparent'} strokeWidth="1" />
                <motion.circle
                  cx="8"
                  cy={y}
                  animate={{
                    r: isHovered ? 5.5 : isPresent ? 4.5 : 3.5,
                    fill: isHovered ? accentColor : isPresent ? '#10b981' : 'rgba(255, 255, 255, 0.35)',
                    stroke: isHovered ? '#ffffff' : 'none',
                    strokeWidth: isHovered ? 1.5 : 0
                  }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                  style={{
                    filter: isHovered ? `drop-shadow(0px 0px 8px ${accentColor})` : 'none'
                  }}
                />
              </g>
            );
          })}
        </svg>

        {/* Milestone Cards with Framer Motion Interactions */}
        {TIMELINE_DATA.map((item, index) => {
          const isHovered = hoveredIndex === index;
          const isPresent = index === 0;

          return (
            <motion.div
              key={item.id}
              onMouseEnter={() => setHoveredIndex(index)}
              whileHover={{ x: 6 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              style={{
                position: 'relative',
                padding: '0.65rem 0.85rem',
                borderRadius: '6px',
                background: isHovered ? 'rgba(255, 107, 0, 0.08)' : 'transparent',
                border: `1px solid ${isHovered ? 'rgba(255, 107, 0, 0.35)' : 'transparent'}`,
                boxShadow: isHovered ? '0 8px 25px rgba(0, 0, 0, 0.5)' : 'none',
                cursor: 'pointer'
              }}
            >
              {/* Date Pill */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontFamily: 'var(--font-mono)',
                    color: isPresent ? '#10b981' : isHovered ? accentColor : 'var(--text-muted)',
                    fontWeight: 600,
                    letterSpacing: '0.05em'
                  }}
                >
                  {item.year}
                </span>

                {isPresent && (
                  <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', color: '#10b981', padding: '0.08rem 0.45rem', borderRadius: '10px' }}>
                    ACTIVE
                  </span>
                )}
              </div>

              {/* Role Title */}
              <h3 style={{ fontSize: '1.02rem', fontFamily: 'var(--font-satoshi)', color: '#ffffff', fontWeight: 700, margin: '0.1rem 0 0.25rem 0' }}>
                {item.role}
              </h3>

              {/* Description */}
              <p style={{ fontSize: '0.84rem', fontFamily: 'var(--font-satoshi)', color: isHovered ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.68)', lineHeight: 1.5, margin: '0.2rem 0' }}>
                {item.description}
              </p>

              {/* Tech Skill Badges with Framer Motion hover animation */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.5rem' }}>
                <AnimatePresence>
                  {item.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      whileHover={{ scale: 1.08, borderColor: accentColor }}
                      transition={{ duration: 0.15 }}
                      className="tech-badge"
                      style={{ fontSize: '0.7rem', padding: '0.18rem 0.55rem', color: accentColor, borderColor: `${accentColor}35` }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};
