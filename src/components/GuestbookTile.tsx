import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';

interface GuestbookTileProps {
  accentColor?: string;
}

export const GuestbookTile: React.FC<GuestbookTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSending(true);

    // Simulate instant network transmission
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      setSenderName('');
      setMessage('');

      // Auto-reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    }, 600);
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#07090e',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderTop: `2px solid ${accentColor}`,
        borderRadius: '8px',
        padding: '1.1rem 1.2rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '0.55rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
          <MessageSquare size={13} style={{ color: accentColor }} />
          <span style={{ fontSize: '0.8rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.04em' }}>
            PING DHRUV
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#10b981' }}>
          <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10b981', display: 'inline-block' }} />
          <span>LIVE INBOX</span>
        </div>
      </div>

      {/* BODY CONTENT */}
      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.6rem',
            textAlign: 'center',
            padding: '1rem 0'
          }}
        >
          <CheckCircle2 size={28} style={{ color: accentColor }} />
          <div>
            <h4 style={{ fontSize: '0.95rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, marginBottom: '0.2rem' }}>
              PING DELIVERED!
            </h4>
            <p style={{ fontSize: '0.75rem', color: 'rgba(255, 255, 255, 0.7)', fontFamily: 'var(--font-satoshi)' }}>
              Thanks for stopping by. Your note has been sent.
            </p>
          </div>
          <button
            onClick={() => setIsSubmitted(false)}
            style={{
              background: 'transparent',
              border: 'none',
              color: accentColor,
              fontFamily: 'var(--font-mono)',
              fontSize: '0.62rem',
              cursor: 'pointer',
              marginTop: '0.4rem',
              textDecoration: 'underline'
            }}
          >
            Send another message
          </button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.6rem', margin: '0.4rem 0' }}>
          {/* Input 1: Name / Email */}
          <div>
            <input
              type="text"
              placeholder="Your Name or Email (Optional)"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                padding: '0.4rem 0.65rem',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-satoshi)',
                color: '#ffffff',
                outline: 'none',
                transition: 'border-color 0.2s ease'
              }}
              onFocus={(e) => (e.target.style.borderColor = accentColor)}
              onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
            />
          </div>

          {/* Input 2: Message Text */}
          <div>
            <textarea
              required
              rows={2}
              placeholder="Leave a quick note..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{
                width: '100%',
                background: 'rgba(255, 255, 255, 0.025)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '4px',
                padding: '0.4rem 0.65rem',
                fontSize: '0.72rem',
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
            disabled={isSending || !message.trim()}
            style={{
              width: '100%',
              background: message.trim() ? accentColor : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${message.trim() ? accentColor : 'rgba(255, 255, 255, 0.08)'}`,
              borderRadius: '4px',
              padding: '0.4rem 0.8rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.4rem',
              color: message.trim() ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 700,
              cursor: message.trim() ? 'pointer' : 'not-allowed',
              transition: 'all 0.2s ease'
            }}
          >
            {isSending ? (
              <span>SENDING PING...</span>
            ) : (
              <>
                <span>SEND PING</span>
                <Send size={11} />
              </>
            )}
          </button>
        </form>
      )}

      {/* Footer Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '0.35rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.45)' }}>
          DIRECT TELEMETRY
        </span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.6rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
          <Sparkles size={10} />
          <span>RESPONDS &lt; 2 HRS</span>
        </div>
      </div>
    </div>
  );
};
