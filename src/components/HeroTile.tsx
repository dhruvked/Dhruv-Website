import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';

interface HeroTileProps {
  accentColor: string;
}

export const HeroTile: React.FC<HeroTileProps> = ({ accentColor }) => {
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
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '8px',
        padding: '3rem 2.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        background: '#07090e',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderTop: `2px solid ${accentColor}`,
        overflow: 'hidden'
      }}
    >
      {/* Top-Right Download Resume Button */}
      <motion.button
        whileHover={{ scale: 1.06, borderColor: accentColor }}
        whileTap={{ scale: 0.95 }}
        onClick={handleDownloadResume}
        title="Download Resume (Dhruv_Kedia_Resume.pdf)"
        style={{
          position: 'absolute',
          top: '1.2rem',
          right: '1.2rem',
          background: 'rgba(255, 255, 255, 0.04)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '6px',
          padding: '0.45rem 0.9rem',
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

      {/* Main Name Heading */}
      <h1
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
      </h1>

      {/* Description Paragraph */}
      <p
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
      </p>
    </div>
  );
};
