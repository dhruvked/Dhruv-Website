import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, CheckCircle2, RotateCw } from 'lucide-react';

interface GuestbookTileProps {
  accentColor?: string;
}

interface VisitorPing {
  id: string;
  author: string;
  message: string;
  time: string;
}

const INITIAL_PINGS: VisitorPing[] = [
  { id: '1', author: 'Alex', message: 'Loved the 3D Blender pipeline!', time: '2m ago' },
  { id: '2', author: 'Sam', message: 'Awesome portfolio layout & clock!', time: '12m ago' },
  { id: '3', author: 'Marcus', message: 'Clean RAG architecture specs.', time: '1h ago' },
  { id: '4', author: 'Priyanshu', message: 'Ultra slick dark theme!', time: '2h ago' }
];

const STORAGE_KEY_PINGS = 'dhruv_portfolio_guestbook_pings';

export const GuestbookTile: React.FC<GuestbookTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [pings, setPings] = useState<VisitorPing[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PINGS);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_PINGS;
  });

  const [visitorCount, setVisitorCount] = useState<number>(1428);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [authorInput, setAuthorInput] = useState('');
  const [messageInput, setMessageInput] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Save pings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PINGS, JSON.stringify(pings));
    } catch (e) {}
  }, [pings]);

  // Live Visitor Counter Simulation
  useEffect(() => {
    const timer = setInterval(() => {
      setVisitorCount((prev) => prev + 1);
    }, 15000);
    return () => clearInterval(timer);
  }, []);

  const handleTileClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!messageInput.trim()) return;

    const newPing: VisitorPing = {
      id: Date.now().toString(),
      author: authorInput.trim() || 'Anonymous',
      message: messageInput.trim(),
      time: 'Just now'
    };

    setPings([newPing, ...pings]);
    setAuthorInput('');
    setMessageInput('');
    setIsSubmitted(true);

    setTimeout(() => {
      setIsSubmitted(false);
      setIsFlipped(false);
    }, 1000);
  };

  return (
    <div
      className="guestbook-tile-container"
      onClick={handleTileClick}
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
        {/* FRONT FACE: FLOATING MESSAGES & LIVE VISITOR COUNTER */}
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
          {/* Top Header: Live Visitor Counter */}
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
              <MessageSquare size={13} style={{ color: accentColor }} />
              <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
                VISITOR WALL
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700 }}>
              <span className="pulsing-live-dot" style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }} />
              <span>{visitorCount.toLocaleString()} VISITS</span>
            </div>
          </div>

          {/* Floating Message Bubbles List */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
              margin: '0.5rem 0',
              overflowY: 'hidden',
              justifyContent: 'center'
            }}
          >
            <AnimatePresence mode="popLayout">
              {pings.slice(0, 3).map((ping, idx) => (
                <motion.div
                  key={ping.id}
                  initial={{ opacity: 0, y: 12, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.35, delay: idx * 0.06 }}
                  style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderLeft: `2px solid ${accentColor}`,
                    borderRadius: '4px',
                    padding: '0.45rem 0.75rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.15rem'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 600 }}>
                      {ping.author}
                    </span>
                    <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.4)' }}>
                      {ping.time}
                    </span>
                  </div>
                  <p style={{ fontSize: '0.74rem', color: 'rgba(255, 255, 255, 0.78)', fontFamily: 'var(--font-satoshi)', margin: 0, lineHeight: 1.35 }}>
                    "{ping.message}"
                  </p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Footer Action Prompt */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)' }}>
              LIVE MESSAGE STREAM
            </span>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <span>LEAVE A PING</span>
              <RotateCw size={10} />
            </span>
          </div>
        </div>

        {/* BACK FACE: MINIMAL TEXT INPUT FORM (STOP PROPAGATION PREVENTS ACCIDENTAL FLIPS) */}
        <div
          className="cube-face cube-face-side"
          onClick={(e) => e.stopPropagation()}
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
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.6rem' }}>
            <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
              LEAVE A QUICK PING
            </h3>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
              120 CHAR MAX
            </span>
          </div>

          {/* Form / Success Feedback */}
          {isSubmitted ? (
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', color: accentColor }}>
              <CheckCircle2 size={28} />
              <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#ffffff' }}>
                PING DELIVERED!
              </span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem', margin: '0.4rem 0' }}>
              <div>
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  maxLength={30}
                  value={authorInput}
                  onChange={(e) => setAuthorInput(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.65rem',
                    color: '#ffffff',
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '0.78rem',
                    outline: 'none'
                  }}
                />
              </div>

              <div>
                <textarea
                  placeholder="Type your message..."
                  maxLength={120}
                  rows={2}
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onClick={(e) => e.stopPropagation()}
                  style={{
                    width: '100%',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '4px',
                    padding: '0.4rem 0.65rem',
                    color: '#ffffff',
                    fontFamily: 'var(--font-satoshi)',
                    fontSize: '0.78rem',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              <button
                type="submit"
                onClick={(e) => e.stopPropagation()}
                style={{
                  background: accentColor,
                  border: 'none',
                  borderRadius: '4px',
                  padding: '0.45rem 0.8rem',
                  color: '#000000',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  transition: 'opacity 0.2s ease'
                }}
              >
                <span>SEND PING</span>
                <Send size={11} />
              </button>
            </form>
          )}

          {/* Footer Back Instruction Bar */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.4rem', textAlign: 'center' }}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsFlipped(false);
              }}
              style={{ background: 'transparent', border: 'none', color: 'rgba(255, 255, 255, 0.45)', fontFamily: 'var(--font-mono)', fontSize: '0.62rem', cursor: 'pointer' }}
            >
              CANCEL / FLIP BACK TO WALL ↺
            </button>
          </div>
        </div>
      </motion.div>

      <style>{`
        .pulsing-live-dot {
          animation: livePulse 2s infinite ease-in-out;
        }
        @keyframes livePulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(1.3); }
        }
      `}</style>
    </div>
  );
};
