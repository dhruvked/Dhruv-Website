import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClockTileProps {
  accentColor: string;
}

export const ClockTile: React.FC<ClockTileProps> = ({ accentColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [time, setTime] = useState<Date>(new Date());
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Animation frame loop for Kolkata scene (Taxi movement, water ripples, stars)
  useEffect(() => {
    const pixelTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 24);
    }, 180);

    return () => clearInterval(pixelTimer);
  }, []);

  // Time metrics
  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours();

  // Time of Day States
  const isDaytime = hours >= 6 && hours < 18;
  const isSunset = hours >= 18 && hours < 20;
  const isNighttime = hours >= 20 || hours < 6;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = (hours % 12) * 30 + minutes * 0.5;

  const formattedTimeStr = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <div
      className="clock-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
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
        {/* FRONT FACE: SUBTLE DAY/NIGHT ATMOSPHERE + ANALOG CLOCK */}
        <div
          className="cube-face cube-face-front"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderTop: `2px solid ${accentColor}`,
            borderRadius: '8px',
            padding: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Subtle Day / Night Background Tint */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: isDaytime
                ? 'radial-gradient(circle at center, rgba(255,107,0,0.06) 0%, transparent 70%)'
                : 'radial-gradient(circle at center, rgba(168,85,247,0.06) 0%, transparent 70%)',
              pointerEvents: 'none'
            }}
          />

          {/* Analog Clock Face Dial */}
          <div
            style={{
              position: 'relative',
              width: '130px',
              height: '130px',
              borderRadius: '50%',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              boxShadow: 'inset 0 0 15px rgba(0,0,0,0.9)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.01)'
            }}
          >
            {/* Orbiting Sun or Moon Dot */}
            <div
              style={{
                position: 'absolute',
                top: '5px',
                left: '50%',
                width: '5px',
                height: '5px',
                borderRadius: '50%',
                background: isDaytime ? '#ffb84d' : '#c084fc',
                opacity: 0.85,
                transformOrigin: '50% 60px',
                transform: `rotate(${hours * 15}deg) translate(-50%, 0)`
              }}
            />

            {/* 12 Hour Ticks */}
            {Array.from({ length: 12 }).map((_, idx) => {
              const angle = idx * 30;
              const isMajor = idx % 3 === 0;
              return (
                <div
                  key={idx}
                  style={{
                    position: 'absolute',
                    top: '5px',
                    left: 'calc(50% - 1px)',
                    width: isMajor ? '2px' : '1px',
                    height: isMajor ? '8px' : '5px',
                    background: isMajor
                      ? isDaytime ? accentColor : '#c084fc'
                      : 'rgba(255, 255, 255, 0.25)',
                    transformOrigin: '50% 60px',
                    transform: `rotate(${angle}deg)`
                  }}
                />
              );
            })}

            {/* Hour Hand */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '3px',
                height: '32px',
                background: '#ffffff',
                borderRadius: '4px',
                transformOrigin: '50% 0%',
                transform: `translate(-50%, 0%) rotate(${hourDeg + 180}deg)`,
                zIndex: 2
              }}
            />

            {/* Minute Hand */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '2px',
                height: '46px',
                background: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '3px',
                transformOrigin: '50% 0%',
                transform: `translate(-50%, 0%) rotate(${minuteDeg + 180}deg)`,
                zIndex: 3
              }}
            />

            {/* Second Hand */}
            <div
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '1.5px',
                height: '52px',
                background: isDaytime ? accentColor : '#a855f7',
                borderRadius: '2px',
                transformOrigin: '50% 0%',
                transform: `translate(-50%, 0%) rotate(${secondDeg + 180}deg)`,
                zIndex: 4
              }}
            />

            {/* Center Pivot Dot */}
            <div
              style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: isDaytime ? accentColor : '#c084fc',
                zIndex: 5
              }}
            />
          </div>
        </div>

        {/* BACK FACE: ICONIC KOLKATA 8-BIT ANIMATION (HOWRAH BRIDGE + YELLOW TAXI + HOOGHLY RIVER) */}
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
            padding: '1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
            background: '#07090e'
          }}
        >
          {/* Location Header */}
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-clash)',
              color: accentColor,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}
          >
            KOLKATA, INDIA
          </div>

          {/* 8-Bit Pixel Scene Canvas (Howrah Bridge + Yellow Taxi + Hooghly River) */}
          <div
            style={{
              width: '100%',
              height: '76px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.1rem 0'
            }}
          >
            <svg
              width="140"
              height="76"
              viewBox="0 0 100 54"
              fill="none"
              style={{ shapeRendering: 'crispEdges', maxWidth: '100%', maxHeight: '100%' }}
            >
              {/* SKY BACKGROUND */}
              <rect
                x="0"
                y="0"
                width="100"
                height="34"
                fill={isDaytime ? '#38bdf8' : isSunset ? '#c084fc' : '#090d16'}
              />

              {/* Day Clouds or Night Moon/Stars */}
              {isDaytime && (
                <>
                  <rect x={10 + ((frame * 2) % 60)} y="6" width="12" height="3" fill="#ffffff" opacity="0.85" />
                  <rect x={40 + ((frame * 2 + 10) % 50)} y="12" width="10" height="3" fill="#ffffff" opacity="0.75" />
                </>
              )}

              {isSunset && (
                <rect x="74" y="10" width="8" height="8" fill="#ff6b00" rx="4" />
              )}

              {isNighttime && (
                <>
                  <rect x="80" y="6" width="5" height="5" fill="#fef08a" />
                  <rect x="12" y="8" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 2 === 0 ? 1 : 0.3} />
                  <rect x="35" y="14" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 3 === 0 ? 1 : 0.3} />
                  <rect x="62" y="7" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 4 === 0 ? 1 : 0.3} />
                </>
              )}

              {/* 🌁 HOWRAH BRIDGE STEEL TRUSS STRUCTURE */}
              {/* Left Main Tower */}
              <rect x="18" y="4" width="4" height="30" fill="#475569" />
              <rect x="16" y="2" width="8" height="3" fill="#334155" />
              <line x1="20" y1="4" x2="36" y2="34" stroke="#64748b" strokeWidth="1.5" />

              {/* Right Main Tower */}
              <rect x="78" y="4" width="4" height="30" fill="#475569" />
              <rect x="76" y="2" width="8" height="3" fill="#334155" />
              <line x1="80" y1="4" x2="64" y2="34" stroke="#64748b" strokeWidth="1.5" />

              {/* Bridge Cantilever Trusses */}
              <line x1="20" y1="6" x2="80" y2="6" stroke="#475569" strokeWidth="1.5" />
              <line x1="20" y1="12" x2="80" y2="12" stroke="#64748b" strokeWidth="1" />
              <line x1="20" y1="22" x2="80" y2="22" stroke="#64748b" strokeWidth="1" />

              {/* Diagonal Cross Supports */}
              <line x1="20" y1="6" x2="50" y2="22" stroke="#475569" strokeWidth="1" />
              <line x1="80" y1="6" x2="50" y2="22" stroke="#475569" strokeWidth="1" />

              {/* Bridge Road Deck */}
              <rect x="0" y="33" width="100" height="3" fill="#1e293b" />
              <rect x="0" y="36" width="100" height="1" fill="#ff6b00" opacity="0.6" />

              {/* 🚊 ANIMATED KOLKATA YELLOW TAXI CAB */}
              <g transform={`translate(${(frame * 4) % 110 - 15}, 26)`}>
                {/* Taxi Yellow Body */}
                <rect x="0" y="3" width="14" height="5" fill="#facc15" rx="1" />
                {/* Black Roof & Stripes */}
                <rect x="3" y="0" width="8" height="4" fill="#0f172a" />
                <rect x="4" y="1" width="6" height="2" fill="#38bdf8" opacity="0.9" />
                {/* Wheels */}
                <rect x="2" y="7" width="2.5" height="2.5" fill="#ffffff" />
                <rect x="9.5" y="7" width="2.5" height="2.5" fill="#ffffff" />
                {/* Headlight */}
                <rect x="13" y="4" width="1.5" height="2" fill={isNighttime ? '#fef08a' : '#ff6b00'} />
              </g>

              {/* 🌊 HOOGHLY RIVER WATER & ANIMATED RIPPLES */}
              <rect x="0" y="37" width="100" height="17" fill="#0f172a" />
              <rect x="0" y="38" width="100" height="16" fill={isDaytime ? '#1e3a8a' : '#090d16'} />

              {/* Water Ripples */}
              <rect x={(frame * 3) % 80} y="41" width="12" height="1" fill="#38bdf8" opacity="0.7" />
              <rect x={(frame * 2 + 30) % 70} y="46" width="16" height="1" fill="#38bdf8" opacity="0.5" />
              <rect x={(frame * 3 + 15) % 85} y="50" width="10" height="1" fill="#38bdf8" opacity="0.6" />
            </svg>
          </div>

          {/* Local Digital Time Readout */}
          <div
            style={{
              fontSize: '1.9rem',
              fontFamily: 'var(--font-clash)',
              color: '#ffffff',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              lineHeight: 1
            }}
          >
            {formattedTimeStr}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
