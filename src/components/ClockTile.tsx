import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ClockTileProps {
  accentColor?: string;
}

export const ClockTile: React.FC<ClockTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [time, setTime] = useState<Date>(new Date());
  const [isFlipped, setIsFlipped] = useState(false);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const pixelTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 16);
    }, 250);

    return () => {
      clearInterval(timer);
      clearInterval(pixelTimer);
    };
  }, []);

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondsDegrees = (seconds / 60) * 360;
  const minutesDegrees = ((minutes + seconds / 60) / 60) * 360;
  const hoursDegrees = ((hours + minutes / 60) / 12) * 360;

  const isDaytime = time.getHours() >= 6 && time.getHours() < 18;
  const timeString = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });

  return (
    <div
      className="clock-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(false);
      }}
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
            border: 'none',
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
                    top: '4px',
                    left: '50%',
                    width: isMajor ? '2px' : '1px',
                    height: isMajor ? '8px' : '5px',
                    background: isMajor ? accentColor : 'rgba(255, 255, 255, 0.25)',
                    transformOrigin: '50% 61px',
                    transform: `rotate(${angle}deg) translate(-50%, 0)`
                  }}
                />
              );
            })}

            {/* Hour Hand */}
            <div
              style={{
                position: 'absolute',
                bottom: '50%',
                left: '50%',
                width: '3px',
                height: '35px',
                background: '#ffffff',
                borderRadius: '2px',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${hoursDegrees}deg)`,
                boxShadow: '0 0 6px rgba(255,255,255,0.4)'
              }}
            />

            {/* Minute Hand */}
            <div
              style={{
                position: 'absolute',
                bottom: '50%',
                left: '50%',
                width: '2px',
                height: '48px',
                background: 'rgba(255, 255, 255, 0.85)',
                borderRadius: '2px',
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${minutesDegrees}deg)`
              }}
            />

            {/* Second Hand */}
            <div
              style={{
                position: 'absolute',
                bottom: '50%',
                left: '50%',
                width: '1.5px',
                height: '52px',
                background: accentColor,
                transformOrigin: '50% 100%',
                transform: `translateX(-50%) rotate(${secondsDegrees}deg)`,
                boxShadow: `0 0 8px ${accentColor}`
              }}
            />

            {/* Center Pivot Cap */}
            <div
              style={{
                width: '7px',
                height: '7px',
                borderRadius: '50%',
                background: accentColor,
                border: '1.5px solid #ffffff',
                boxShadow: `0 0 8px ${accentColor}`,
                zIndex: 10
              }}
            />
          </div>

          {/* Time Zone Subtext Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '0.9rem',
              fontSize: '0.62rem',
              fontFamily: 'var(--font-mono)',
              color: 'rgba(255, 255, 255, 0.45)',
              letterSpacing: '0.04em'
            }}
          >
            KOLKATA // IST (+5:30)
          </div>
        </div>

        {/* BACK FACE: 8-BIT ANIMATED RETRO KOLKATA SCENE */}
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
            padding: '1.2rem 1rem 0.8rem 1rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* Pixel Art Kolkata Scene SVG */}
          <div style={{ flex: 1, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg
              width="150"
              height="85"
              viewBox="0 0 110 65"
              fill="none"
              style={{ shapeRendering: 'crispEdges', maxWidth: '100%', maxHeight: '100%' }}
            >
              {/* Sky Background */}
              <rect
                x="0"
                y="0"
                width="110"
                height="45"
                fill={isDaytime ? '#38bdf8' : '#0a0d16'}
              />

              {/* Day Sun & Clouds */}
              {isDaytime ? (
                <>
                  <rect x="85" y="6" width="10" height="10" fill="#fef08a" />
                  <rect x={10 + ((frame * 2) % 25)} y="10" width="12" height="4" fill="#ffffff" opacity="0.9" />
                  <rect x={55 + ((frame * 2) % 20)} y="15" width="10" height="3" fill="#ffffff" opacity="0.8" />
                </>
              ) : (
                <>
                  {/* Moon & Stars */}
                  <rect x="86" y="6" width="8" height="8" fill="#fef08a" />
                  <rect x="12" y="8" width="2" height="2" fill="#ffffff" opacity={frame % 2 === 0 ? 1 : 0.3} />
                  <rect x="35" y="14" width="2" height="2" fill="#ffffff" opacity={frame % 3 === 0 ? 1 : 0.4} />
                  <rect x="62" y="7" width="2" height="2" fill="#ffffff" opacity={frame % 2 === 1 ? 1 : 0.2} />
                  {/* Shooting Star */}
                  <rect x={75 - (frame % 6) * 3} y={4 + (frame % 6) * 2} width="4" height="1" fill="#ffffff" opacity="0.8" />
                </>
              )}

              {/* HOWRAH BRIDGE STEEL CANTILEVER TRUSS STRUCTURE */}
              {/* Bridge Pylons */}
              <rect x="12" y="14" width="4" height="34" fill="#64748b" />
              <rect x="16" y="14" width="2" height="34" fill="#475569" />
              <rect x="92" y="14" width="4" height="34" fill="#64748b" />
              <rect x="90" y="14" width="2" height="48" fill="#475569" />

              {/* Cantilever Upper Steel Girders & Diagonal Cross Bracing */}
              <polygon points="12,14 54,28 96,14" stroke="#94a3b8" strokeWidth="2" fill="none" />
              <line x1="14" y1="14" x2="94" y2="14" stroke="#64748b" strokeWidth="2" />
              <line x1="24" y1="18" x2="24" y2="38" stroke="#475569" strokeWidth="1" />
              <line x1="40" y1="23" x2="40" y2="38" stroke="#475569" strokeWidth="1" />
              <line x1="68" y1="23" x2="68" y2="38" stroke="#475569" strokeWidth="1" />
              <line x1="84" y1="18" x2="84" y2="38" stroke="#475569" strokeWidth="1" />

              {/* Diagonal Steel Struts */}
              <line x1="14" y1="14" x2="40" y2="38" stroke="#64748b" strokeWidth="1" />
              <line x1="94" y1="14" x2="68" y2="38" stroke="#64748b" strokeWidth="1" />

              {/* Bridge Road Deck */}
              <rect x="0" y="38" width="110" height="4" fill="#334155" />
              <rect x="0" y="42" width="110" height="2" fill="#1e293b" />

              {/* ANIMATED KOLKATA YELLOW TAXI CAB (TRAVERSING BRIDGE) */}
              <g transform={`translate(${(frame * 7) % 120 - 15}, 0)`}>
                {/* Yellow Taxi Body */}
                <rect x="0" y="32" width="16" height="6" fill="#eab308" rx="1" />
                <rect x="3" y="29" width="10" height="4" fill="#fde047" rx="1" />
                {/* Taxi Windows */}
                <rect x="4" y="30" width="3" height="2" fill="#0f172a" />
                <rect x="9" y="30" width="3" height="2" fill="#0f172a" />
                {/* Black Stripe */}
                <rect x="0" y="35" width="16" height="1" fill="#000000" />
                {/* Wheels */}
                <rect x="2" y="38" width="3" height="3" fill="#000000" />
                <rect x="11" y="38" width="3" height="3" fill="#000000" />
                {/* Headlight Glow */}
                <rect x="15" y="34" width="2" height="2" fill="#fef08a" />
              </g>

              {/* HOOGHLY RIVER WATER REFLECTIONS */}
              <rect x="0" y="44" width="110" height="21" fill="#030712" />
              {/* Animated Water Ripples */}
              <rect x={5 + (frame % 4) * 3} y="48" width="14" height="1" fill="#38bdf8" opacity="0.4" />
              <rect x={40 + ((frame + 2) % 4) * 4} y="53" width="18" height="1" fill="#38bdf8" opacity="0.3" />
              <rect x={75 + (frame % 3) * 3} y="58" width="12" height="1" fill="#38bdf8" opacity="0.5" />
              <rect x={20 + (frame % 5) * 2} y="61" width="22" height="1" fill="#38bdf8" opacity="0.25" />
            </svg>
          </div>

          {/* Digital Time Readout */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '0.92rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, letterSpacing: '0.06em' }}>
              {timeString}
            </div>
            <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.45)', textTransform: 'uppercase' }}>
              KOLKATA, INDIA
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
