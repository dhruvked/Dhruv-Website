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

  // Animation frame loop for clouds, steam, Zzz, and typing arms
  useEffect(() => {
    const pixelTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 12);
    }, 220);

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
  const isLateNight = hours >= 23 || hours < 6;

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

        {/* BACK FACE: RICH 8-BIT SCENE (WINDOW, LAMP, STEAM / ZZZ, TYPING DEV) */}
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
          {/* Location */}
          <div
            style={{
              fontSize: '0.75rem',
              fontFamily: 'var(--font-clash)',
              color: accentColor,
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase'
            }}
          >
            KOLKATA, INDIA
          </div>

          {/* 8-Bit Pixel Scene (Window + Lamp + Steam/Zzz + Dev) */}
          <div
            style={{
              width: '100%',
              height: '68px',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.1rem 0'
            }}
          >
            <svg width="100" height="68" viewBox="0 0 100 68" fill="none" style={{ shapeRendering: 'crispEdges' }}>
              {/* PIXEL BACKGROUND WINDOW */}
              <rect x="6" y="4" width="22" height="18" fill="#0f172a" rx="1" />
              <rect
                x="7"
                y="5"
                width="20"
                height="16"
                fill={isDaytime ? '#38bdf8' : isSunset ? '#c084fc' : '#090d16'}
              />

              {isDaytime && (
                <>
                  <rect x={7 + ((frame * 2) % 16)} y="8" width="6" height="2" fill="#ffffff" opacity="0.9" />
                  <rect x={12 + ((frame * 2 + 6) % 14)} y="12" width="5" height="2" fill="#ffffff" opacity="0.8" />
                </>
              )}

              {isSunset && (
                <rect x="15" y="14" width="4" height="4" fill="#ff6b00" />
              )}

              {isNighttime && (
                <>
                  <rect x="22" y="8" width="3" height="3" fill="#fef08a" />
                  <rect x="10" y="7" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 2 === 0 ? 1 : 0.3} />
                  <rect x="18" y="15" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 3 === 0 ? 1 : 0.3} />
                </>
              )}

              <rect x="16" y="5" width="2" height="16" fill="#1e293b" />
              <rect x="7" y="12" width="20" height="2" fill="#1e293b" />

              {/* DESK LAMP & LIGHT CONE */}
              <rect x="72" y="16" width="2" height="16" fill="#475569" />
              <rect x="68" y="14" width="8" height="3" fill={isNighttime ? '#fef08a' : '#64748b'} />

              {isNighttime && (
                <polygon points="68,17 90,44 48,44" fill="rgba(254, 240, 138, 0.14)" />
              )}

              {/* Monitor Screen */}
              <rect x="36" y="16" width="30" height="20" fill="#1e293b" rx="2" />
              <rect x="38" y="18" width="26" height="16" fill="#0f172a" />
              <rect x="40" y="20" width={frame % 2 === 0 ? '14' : '8'} height="2" fill={accentColor} />
              <rect x="40" y="24" width={frame % 3 === 0 ? '18' : '10'} height="2" fill="#38bdf8" />
              <rect x="40" y="28" width={frame % 2 === 1 ? '12' : '6'} height="2" fill="#10b981" />

              {/* Monitor Stand */}
              <rect x="49" y="36" width="4" height="4" fill="#475569" />
              <rect x="45" y="40" width="12" height="2" fill="#475569" />

              {/* Desk */}
              <rect x="4" y="42" width="92" height="3" fill="#334155" />
              <rect x="8" y="45" width="4" height="20" fill="#1e293b" />
              <rect x="88" y="45" width="4" height="20" fill="#1e293b" />

              {/* COFFEE STEAM vs FLOATING ZZZ BUBBLES */}
              {!isLateNight ? (
                <>
                  <rect x="22" y="36" width="6" height="6" fill="#f87171" rx="1" />
                  <rect x="20" y="38" width="2" height="3" fill="#f87171" />
                  <rect x="23" y={32 - (frame % 3)} width="1" height="2" fill="#ffffff" opacity="0.6" />
                  <rect x="26" y={30 - ((frame + 1) % 3)} width="1" height="2" fill="#ffffff" opacity="0.6" />
                </>
              ) : (
                <>
                  <text
                    x={68 + (frame % 3)}
                    y={22 - (frame % 4) * 3}
                    fill="#c084fc"
                    fontSize="7"
                    fontFamily="monospace"
                    fontWeight="bold"
                    opacity={1 - (frame % 4) * 0.2}
                  >
                    Z
                  </text>
                  <text
                    x={74 + (frame % 2)}
                    y={16 - (frame % 3) * 3}
                    fill="#a855f7"
                    fontSize="5"
                    fontFamily="monospace"
                    opacity={0.8}
                  >
                    z
                  </text>
                </>
              )}

              {/* Developer Character */}
              <rect
                x="64"
                y={isLateNight ? 26 : 24}
                width="10"
                height="10"
                fill="#f87171"
                rx="2"
              />
              <rect x="62" y="34" width="14" height="10" fill={isLateNight ? '#475569' : '#3b82f6'} />

              {!isLateNight ? (
                frame % 2 === 0 ? (
                  <>
                    <rect x="56" y="35" width="8" height="3" fill="#f87171" />
                    <rect x="54" y="37" width="6" height="3" fill="#f87171" />
                  </>
                ) : (
                  <>
                    <rect x="56" y="37" width="8" height="3" fill="#f87171" />
                    <rect x="52" y="35" width="6" height="3" fill="#f87171" />
                  </>
                )
              ) : (
                <rect x="54" y="38" width="12" height="3" fill="#f87171" />
              )}

              {/* Keyboard */}
              <rect x="44" y="40" width="14" height="2" fill="#94a3b8" />
            </svg>
          </div>

          {/* Local Digital Time */}
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
