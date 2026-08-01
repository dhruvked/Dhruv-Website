import React, { useState } from 'react';
import portraitImg from '../assets/dhruv_portrait.jpg';

interface HeroTileProps {
  accentColor: string;
}

export const HeroTile: React.FC<HeroTileProps> = ({ accentColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="hero-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1000px', cursor: 'pointer' }}
    >
      <div className={`cube-inner ${isFlipped ? 'is-rotated' : ''}`}>
        {/* FRONT FACE: CLEAN PORTRAIT PHOTO */}
        <div
          className="cube-face cube-face-front"
          style={{
            padding: 0,
            overflow: 'hidden',
            borderTop: `3px solid ${accentColor}`,
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.6)'
          }}
        >
          <img
            src={portraitImg}
            alt="Dhruv Kedia"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              filter: 'contrast(1.05) brightness(0.95)',
              transform: isFlipped ? 'scale(1.04)' : 'scale(1)',
              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
          />
        </div>

        {/* BACK FACE: CENTERED NAME (CLASH DISPLAY) & DESCRIPTION (SATOSHI) */}
        <div
          className="cube-face cube-face-side"
          style={{
            borderTop: `3px solid ${accentColor}`,
            padding: '3rem 2rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            background: '#07090e'
          }}
        >
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
      </div>
    </div>
  );
};
