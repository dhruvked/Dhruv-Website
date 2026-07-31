import React, { useEffect, useRef } from 'react';

interface CursorAccentProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

export const CursorAccent: React.FC<CursorAccentProps> = ({ containerRef }) => {
  const spotlightRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const container = containerRef.current;
      const spotlight = spotlightRef.current;
      if (!container || !spotlight) return;

      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Check if cursor is strictly inside the grid container boundaries
      const isInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (isInside) {
        spotlight.style.opacity = '1';
        spotlight.style.background = `radial-gradient(240px circle at ${x}px ${y}px, rgba(255, 107, 0, 0.14), rgba(255, 107, 0, 0.025) 45%, transparent 80%)`;
      } else {
        spotlight.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [containerRef]);

  return (
    <div
      ref={spotlightRef}
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 5,
        overflow: 'hidden',
        opacity: 0,
        transition: 'opacity 0.2s ease, background 0.04s ease-out'
      }}
    />
  );
};
