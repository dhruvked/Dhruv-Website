import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import portraitImg from '../assets/dhruv_portrait.jpg';

interface HeroTileProps {
  accentColor: string;
}

export const HeroTile: React.FC<HeroTileProps> = ({ accentColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = '/Dhruv_Kedia_Resume.pdf';
    link.download = 'Dhruv_Kedia_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      className="hero-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1200px', cursor: 'pointer' }}
    >
      {/* Framer Motion 3D Spring Rotatable Inner Container */}
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
        {/* FRONT FACE: CLEAN PORTRAIT PHOTO ONLY */}
        <div
          className="cube-face cube-face-front"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            padding: 0,
            overflow: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: `2px solid ${accentColor}`,
            borderRadius: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
          }}
        >
          <motion.img
            src={portraitImg}
            alt="Dhruv Kedia"
            animate={{ scale: isFlipped ? 1.05 : 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.05) brightness(0.95)'
            }}
          />
        </div>

        {/* BACK FACE: CENTERED NAME (CLASH DISPLAY), DESCRIPTION & TOP-RIGHT RESUME BUTTON */}
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
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: `2px solid ${accentColor}`,
            borderRadius: '8px',
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: '#07090e'
          }}
        >
          {/* Top-Right Download Resume Button (Only visible on Back Face when flipped) */}
          <motion.button
            animate={{ opacity: isFlipped ? 1 : 0, y: isFlipped ? 0 : -8 }}
            transition={{ delay: 0.2, duration: 0.35 }}
            whileHover={{ scale: 1.08, borderColor: accentColor }}
            whileTap={{ scale: 0.94 }}
            onClick={handleDownloadResume}
            title="Download Resume (Dhruv_Kedia_Resume.pdf)"
            style={{
              position: 'absolute',
              top: '1.2rem',
              right: '1.2rem',
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              borderRadius: '6px',
              padding: '0.4rem 0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              fontWeight: 600,
              cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(0,0,0,0.4)',
              transition: 'border-color 0.25s ease'
            }}
          >
            <Download size={13} style={{ color: accentColor }} />
            <span>RESUME</span>
          </motion.button>

          <motion.h1
            animate={{ y: isFlipped ? 0 : 10, opacity: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            style={{
              fontSize: '3.6rem',
              fontFamily: 'var(--font-clash)',
              color: '#ffffff',
              fontWeight: 700,
              marginBottom: '1rem',
              letterSpacing: '-0.02em',
              lineHeight: 1.1
            }}
          >
            Dhruv Kedia
          </motion.h1>

          <motion.p
            animate={{ y: isFlipped ? 0 : 15, opacity: isFlipped ? 1 : 0 }}
            transition={{ delay: 0.25, duration: 0.4 }}
            style={{
              fontSize: '1.2rem',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: 1.65,
              maxWidth: '680px',
              fontFamily: 'var(--font-satoshi)',
              fontWeight: 400
            }}
          >
            Full-Stack & Distributed AI Systems Engineer. Architecting high-performance web platforms, scalable microservices, and autonomous AI architectures.
          </motion.p>
        </div>
      </motion.div>
    </div>
  );
};
