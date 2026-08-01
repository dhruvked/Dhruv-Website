import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, CheckCircle2, Zap } from 'lucide-react';

interface PingTileProps {
  accentColor?: string;
}

export const PingTile: React.FC<PingTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 600);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setEmail('');
    setMessage('');
    setIsSubmitted(false);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: 'rgba(7, 9, 14, 0.95)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        borderRadius: '8px',
        padding: '1.1rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Header Bar with Live Pulse Dot */}
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
          <Zap size={14} style={{ color: accentColor }} />
          <span style={{ fontSize: '0.82rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
            QUICK SIGNAL PING
          </span>
        </div>

        {/* Online Status Pulse Dot */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span
            style={{
              width: '7px',
              height: '7px',
              borderRadius: '50%',
              background: '#10b981',
              boxShadow: '0 0 8px #10b981',
              display: 'inline-block'
            }}
          />
          <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.6)' }}>
            ONLINE
          </span>
        </div>
      </div>

      {/* Main Form or Confirmation State */}
      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.form
            key="form"
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            onSubmit={handleSubmit}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '0.65rem',
              margin: '0.5rem 0'
            }}
          >
            {/* Input 1: Email / Contact */}
            <div>
              <input
                type="text"
                placeholder="Your email or LinkedIn profile..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  color: '#ffffff',
                  outline: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
              />
            </div>

            {/* Input 2: Message Box */}
            <div>
              <textarea
                placeholder="Write a quick note or hello..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={2}
                required
                style={{
                  width: '100%',
                  background: 'rgba(255, 255, 255, 0.025)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '4px',
                  padding: '0.45rem 0.65rem',
                  fontSize: '0.75rem',
                  fontFamily: 'var(--font-satoshi)',
                  color: '#ffffff',
                  outline: 'none',
                  resize: 'none',
                  transition: 'border-color 0.2s ease'
                }}
                onFocus={(e) => (e.target.style.borderColor = accentColor)}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                width: '100%',
                background: accentColor,
                border: 'none',
                borderRadius: '4px',
                padding: '0.45rem',
                color: '#000000',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.4rem',
                transition: 'opacity 0.2s ease, transform 0.1s ease'
              }}
            >
              <span>{isSubmitting ? 'TRANSMITTING...' : 'SEND SIGNAL'}</span>
              <Send size={12} />
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              textAlign: 'center',
              gap: '0.5rem',
              padding: '0.5rem 0'
            }}
          >
            <CheckCircle2 size={24} style={{ color: '#10b981' }} />
            <div>
              <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                SIGNAL TRANSMITTED
              </h4>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-satoshi)', marginTop: '0.2rem' }}>
                Thanks for reaching out! I'll reply to your message shortly.
              </p>
            </div>
            <button
              onClick={handleReset}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '4px',
                padding: '0.25rem 0.65rem',
                color: 'rgba(255, 255, 255, 0.8)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                cursor: 'pointer',
                marginTop: '0.2rem'
              }}
            >
              Send Another Note
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Disclaimer */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem', textAlign: 'center' }}>
        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.4)' }}>
          DIRECT TO DHRUV'S INBOX • NO SPAM
        </span>
      </div>
    </div>
  );
};
