import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, RotateCw, Layers } from 'lucide-react';

interface ProjectsTileProps {
  accentColor?: string;
}

interface ProjectItem {
  id: string;
  num: string;
  title: string;
  category: string;
  description: string;
  metrics: string;
  tech: string[];
  details: string[];
  link?: string;
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'seam',
    num: '01',
    title: 'Seam',
    category: 'AI HEALTHCARE PLATFORM',
    description: "AI-powered healthcare platform leveraging India's ABDM ecosystem for medical record management & LLM clinical summarization.",
    metrics: 'EMR / EHR Ingestion',
    tech: ['Next.js', 'Python', 'LLM / RAG', 'PostgreSQL'],
    details: [
      'Built EMR/EHR data ingestion pipelines to parse complex medical records.',
      'Integrated LLM-assisted clinical summarization for rapid doctor insights.',
      'Designed ABDM ecosystem compliant security and data handling workflows.'
    ],
    link: 'https://github.com/dhruvked'
  },
  {
    id: 'tryon',
    num: '02',
    title: 'Virtual Try-On',
    category: 'REAL-TIME AI & WEBRTC',
    description: 'Live video-to-video garment transformation platform powering real-time camera feed outfit swaps.',
    metrics: 'Decart AI + WebRTC',
    tech: ['Decart AI', 'WebRTC', 'Node.js', 'TypeScript'],
    details: [
      'Engineered live video-to-video garment transfer using Decart AI Realtime API (lucy_2_rt).',
      'Optimized WebRTC streaming pipelines for ultra-low latency camera frames.',
      'Integrated AI avatar memory retention boosting accuracy by 90%.'
    ],
    link: 'https://github.com/dhruvked'
  },
  {
    id: 'blender-pipeline',
    num: '03',
    title: '3D Asset Pipeline',
    category: 'HEADLESS BLENDER & CLOUD',
    description: 'Automated 3D avatar clothing pipeline executing mesh transformations, normal recalculations, and GLB alignment.',
    metrics: 'AWS EKS + Headless Blender',
    tech: ['Python (bpy)', 'Node.js', 'AWS EKS', 'Docker'],
    details: [
      'Built headless Blender (bpy Python scripts) automation connected to Node.js microservices.',
      'Automated normal recalculation and GLB asset alignment for 3D avatars.',
      'Containerized cloud infrastructure on AWS (EKS/ECR) for high concurrency.'
    ],
    link: 'https://github.com/dhruvked'
  }
];

export const ProjectsTile: React.FC<ProjectsTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const activeProject = PROJECTS_DATA[selectedIndex];

  const handleTabClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedIndex(index);
    setIsFlipped(false);
  };

  const handleFlipClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="projects-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1200px', cursor: 'pointer' }}
    >
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.75, type: 'spring', stiffness: 75, damping: 15 }}
        style={{
          width: '100%',
          height: '100%',
          position: 'relative',
          transformStyle: 'preserve-3d'
        }}
      >
        {/* FRONT FACE: SINGLE PROJECT SPOTLIGHT & SWITCHER */}
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
            padding: '1.1rem 1.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Top Minimal Project Switcher Bar */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
              paddingBottom: '0.6rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <Layers size={13} style={{ color: accentColor }} />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
                FEATURED PROJECTS
              </span>
            </div>

            {/* Switcher Tabs */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              {PROJECTS_DATA.map((proj, idx) => {
                const isActive = idx === selectedIndex;
                return (
                  <button
                    key={proj.id}
                    onClick={(e) => handleTabClick(idx, e)}
                    style={{
                      background: isActive ? 'rgba(255, 107, 0, 0.15)' : 'transparent',
                      border: `1px solid ${isActive ? accentColor : 'rgba(255, 255, 255, 0.08)'}`,
                      borderRadius: '4px',
                      padding: '0.2rem 0.55rem',
                      color: isActive ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.62rem',
                      fontWeight: isActive ? 700 : 400,
                      cursor: 'pointer',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {proj.num} / {proj.title.split(' ')[0].toUpperCase()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SPOTLIGHT PROJECT CONTENT */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.85rem', margin: '0.5rem 0' }}>
            <div>
              <div style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, letterSpacing: '0.08em', marginBottom: '0.25rem' }}>
                {activeProject.category}
              </div>
              <h2 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.02em', marginBottom: '0.4rem' }}>
                {activeProject.title}
              </h2>
              <p style={{ fontSize: '0.82rem', color: 'rgba(255, 255, 255, 0.78)', fontFamily: 'var(--font-satoshi)', lineHeight: 1.5, maxWidth: '95%' }}>
                {activeProject.description}
              </p>
            </div>

            {/* Tech Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {activeProject.tech.map((t, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    padding: '0.2rem 0.6rem',
                    borderRadius: '3px'
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Action Row */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.5)' }}>
              ● {activeProject.metrics}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeProject.link) window.open(activeProject.link, '_blank');
                }}
                className="btn"
                style={{ fontSize: '0.65rem', padding: '0.25rem 0.65rem', gap: '0.3rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid rgba(255, 255, 255, 0.1)', color: '#ffffff' }}
              >
                <span>Code</span>
                <ExternalLink size={11} />
              </button>

              <button
                onClick={handleFlipClick}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: accentColor,
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <span>Specs</span>
                <RotateCw size={11} />
              </button>
            </div>
          </div>
        </div>

        {/* BACK FACE: SYSTEM ARCHITECTURE & HIGHLIGHTS */}
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
            padding: '1.2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Header Bar */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
            <div>
              <div style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700 }}>
                SYSTEM ARCHITECTURE SPECS
              </div>
              <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                {activeProject.title}
              </h3>
            </div>
            <span style={{ fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.5)' }}>
              [{activeProject.num} / 03]
            </span>
          </div>

          {/* Highlights List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem', margin: '0.5rem 0' }}>
            {activeProject.details.map((detail, idx) => (
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

          {/* Footer Back Instruction Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
              CLICK ANYWHERE TO RETURN TO SPOTLIGHT ↺
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
