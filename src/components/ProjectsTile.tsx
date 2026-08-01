import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, type PanInfo } from 'framer-motion';
import { ExternalLink, RotateCw, GitBranch } from 'lucide-react';
import { ContentStore, type ProjectItem } from '../data/contentStore';

interface ProjectsTileProps {
  accentColor?: string;
}

export const ProjectsTile: React.FC<ProjectsTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [projectsList, setProjectsList] = useState<ProjectItem[]>(() => ContentStore.getContent().projects);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Sync content from ContentStore
  useEffect(() => {
    setProjectsList(ContentStore.getContent().projects);
  }, []);

  // ROTATES EVERY 4 SECONDS WHEN NOT HOVERED & NOT FLIPPED; PAUSES ON HOVER
  useEffect(() => {
    if (isHovered || isDragging || isFlipped || projectsList.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % projectsList.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isHovered, isDragging, isFlipped, projectsList.length]);

  const activeProject = projectsList[currentIndex] || projectsList[0];

  const handleTileClick = () => {
    if (!isDragging) {
      setIsFlipped((prev) => !prev);
    }
  };

  const handleDragEnd = (_e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipeThreshold = 35;
    const velocityThreshold = 200;

    if (info.offset.x < -swipeThreshold || info.velocity.x < -velocityThreshold) {
      setCurrentIndex((prev) => (prev + 1) % projectsList.length);
    } else if (info.offset.x > swipeThreshold || info.velocity.x > velocityThreshold) {
      setCurrentIndex((prev) => (prev - 1 + projectsList.length) % projectsList.length);
    }

    setTimeout(() => setIsDragging(false), 50);
  };

  const handleDotClick = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex(index);
  };

  if (!activeProject) return null;

  return (
    <div
      className="projects-tile-container"
      onClick={handleTileClick}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsHovered(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsHovered(false);
      }}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        perspective: '1200px',
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
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
        {/* FRONT FACE: CLEAN MINIMALIST CAROUSEL */}
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
            padding: '1.4rem 1.6rem 1rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden',
            userSelect: 'none'
          }}
        >
          {/* Top Minimalist Tag */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }} />
              <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, letterSpacing: '0.08em' }}>
                PROJECT {String(currentIndex + 1).padStart(2, '0')} // {String(projectsList.length).padStart(2, '0')}
              </span>
            </div>
          </div>

          {/* MAIN CAROUSEL SLIDE CONTENT WITH FRAMER MOTION DRAG & TOUCHPAD GESTURES */}
          <div style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeProject.id}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={handleDragEnd}
                initial={{ opacity: 0, x: 30, filter: 'blur(4px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -30, filter: 'blur(4px)' }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                  cursor: isDragging ? 'grabbing' : 'grab',
                  touchAction: 'pan-y'
                }}
              >
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'rgba(255, 255, 255, 0.5)',
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase'
                  }}
                >
                  {activeProject.tagline || activeProject.tag}
                </span>

                <h2
                  style={{
                    fontSize: '2rem',
                    fontFamily: 'var(--font-clash)',
                    color: '#ffffff',
                    fontWeight: 700,
                    margin: 0,
                    lineHeight: 1.1,
                    letterSpacing: '-0.01em'
                  }}
                >
                  {activeProject.title}
                </h2>

                <p
                  style={{
                    fontSize: '0.84rem',
                    fontFamily: 'var(--font-satoshi)',
                    color: 'rgba(255, 255, 255, 0.75)',
                    lineHeight: 1.5,
                    margin: 0,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}
                >
                  {activeProject.description}
                </p>

                {/* Tech Pills Row */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.2rem' }}>
                  {activeProject.techPills.slice(0, 4).map((tech, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.64rem',
                        fontFamily: 'var(--font-mono)',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.08)',
                        color: 'rgba(255, 255, 255, 0.8)',
                        padding: '0.15rem 0.5rem',
                        borderRadius: '3px'
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom Minimalist Carousel Dots & Subtext */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.5rem' }}>
            {/* Dots Switcher */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              {projectsList.map((p, idx) => {
                const isActive = idx === currentIndex;
                return (
                  <motion.button
                    key={p.id}
                    onClick={(e) => handleDotClick(idx, e)}
                    animate={{
                      width: isActive ? '20px' : '6px',
                      backgroundColor: isActive ? accentColor : 'rgba(255, 255, 255, 0.2)'
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                    style={{
                      height: '6px',
                      borderRadius: '3px',
                      border: 'none',
                      cursor: 'pointer',
                      padding: 0
                    }}
                  />
                );
              })}
            </div>

            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.4)' }}>
              swipe or click to view specs ↗
            </span>
          </div>
        </div>

        {/* BACK FACE: FULL DETAILED PROJECT DESCRIPTION & REPO LINK */}
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
            padding: '1.4rem',
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
              <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, textTransform: 'uppercase' }}>
                {activeProject.tagline || 'PROJECT SPECS'}
              </span>
              <h3 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, margin: '0.1rem 0 0 0' }}>
                {activeProject.title}
              </h3>
            </div>

            {activeProject.codeUrl && (
              <a
                href={activeProject.codeUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.72rem',
                  fontFamily: 'var(--font-mono)',
                  color: accentColor,
                  background: 'rgba(255, 107, 0, 0.1)',
                  border: `1px solid ${accentColor}`,
                  padding: '0.3rem 0.65rem',
                  borderRadius: '4px',
                  textDecoration: 'none',
                  fontWeight: 700
                }}
              >
                <GitBranch size={12} />
                <span>CODE</span>
                <ExternalLink size={10} />
              </a>
            )}
          </div>

          {/* Full Description & Specs List */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.75rem', margin: '0.5rem 0' }}>
            <p style={{ fontSize: '0.82rem', fontFamily: 'var(--font-satoshi)', color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, margin: 0 }}>
              {activeProject.description}
            </p>

            {/* Architecture Highlights */}
            {activeProject.specs && activeProject.specs.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)', textTransform: 'uppercase' }}>
                  KEY INNOVATIONS:
                </span>
                {activeProject.specs.map((spec, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.45rem', fontSize: '0.76rem', color: 'rgba(255,255,255,0.8)', fontFamily: 'var(--font-satoshi)' }}>
                    <span style={{ color: accentColor, fontFamily: 'var(--font-mono)', fontSize: '0.68rem', marginTop: '0.1rem' }}>
                      0{idx + 1}.
                    </span>
                    <span>{spec}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer Return Notice */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor, display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
              <RotateCw size={10} />
              <span>CLICK ANYWHERE TO RETURN TO CAROUSEL</span>
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
