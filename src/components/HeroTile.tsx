import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Phone, ChevronDown } from 'lucide-react';
import { ContentStore, type HeroBioContent, type SocialLinks } from '../data/contentStore';

interface HeroTileProps {
  accentColor: string;
}

export const HeroTile: React.FC<HeroTileProps> = ({ accentColor }) => {
  const [heroBio, setHeroBio] = useState<HeroBioContent>(() => ContentStore.getContent().heroBio);
  const [socials, setSocials] = useState<SocialLinks>(() => ContentStore.getContent().socials);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    setHeroBio(ContentStore.getContent().heroBio);
    setSocials(ContentStore.getContent().socials);
  }, []);

  const handleDownloadResume = (e: React.MouseEvent) => {
    e.stopPropagation();
    const link = document.createElement('a');
    link.href = heroBio.resumeUrl || '/Dhruv_Kedia_Resume.pdf';
    link.download = 'Dhruv_Kedia_Resume.pdf';
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setCopiedId('resume');
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  const socialLinks = [
    {
      id: 'github',
      name: 'GitHub',
      url: socials.github,
      svgPath: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
          <path d="M9 18c-4.51 2-5-2-7-2" />
        </svg>
      )
    },
    {
      id: 'linkedin',
      name: 'LinkedIn',
      url: socials.linkedin,
      svgPath: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
          <rect x="2" y="9" width="4" height="12" />
          <circle cx="4" cy="4" r="2" />
        </svg>
      )
    },
    {
      id: 'phone',
      name: 'Phone',
      url: socials.phone || '+91 9876543210',
      svgPath: <Phone size={20} />
    },
    {
      id: 'email',
      name: 'Email',
      url: socials.email,
      svgPath: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect width="20" height="16" x="2" y="4" rx="2" />
          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
        </svg>
      )
    }
  ];

  const handleSocialClick = (e: React.MouseEvent, item: typeof socialLinks[0]) => {
    e.stopPropagation();

    if (item.id === 'phone' || item.id === 'email') {
      // Copy to clipboard for Phone & Email with tick animation
      const copyValue = item.id === 'phone' ? item.url : socials.email;
      navigator.clipboard.writeText(copyValue);
      setCopiedId(item.id);

      setTimeout(() => {
        setCopiedId(null);
      }, 2000);
    } else {
      // Direct external navigation for GitHub & LinkedIn (No tick animation)
      window.open(item.url, '_blank');
    }
  };

  return (
    <div
      className="hero-tile-container"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        borderRadius: '8px',
        padding: '2.8rem 2rem 2.2rem 2rem',
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
      {/* Main Name Heading */}
      <h1
        style={{
          fontSize: '3.4rem',
          fontFamily: 'var(--font-clash)',
          color: '#ffffff',
          fontWeight: 700,
          marginBottom: '0.8rem',
          letterSpacing: '-0.02em',
          lineHeight: 1.1
        }}
      >
        {heroBio.name}
      </h1>

      {/* Description Paragraph */}
      <p
        style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.8)',
          lineHeight: 1.6,
          maxWidth: '660px',
          fontFamily: 'var(--font-satoshi)',
          fontWeight: 400
        }}
      >
        {heroBio.bioSummary}
      </p>

      {/* Embedded Glowing Social Dock & Seamless Resume Button (Shown strictly in Mobile / Tablet Mode < 1024px) */}
      <div className="hero-mobile-socials">
        <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center', justifyContent: 'center', flexWrap: 'nowrap' }}>
          {socialLinks.map((item) => {
            const isCopied = copiedId === item.id;
            return (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.25, color: accentColor }}
                whileTap={{ scale: 0.85 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={(e) => handleSocialClick(e, item)}
                title={
                  item.id === 'phone'
                    ? `Copy Phone (${item.url})`
                    : item.id === 'email'
                    ? `Copy Email (${item.url})`
                    : item.name
                }
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255, 255, 255, 0.85)',
                  cursor: 'pointer',
                  padding: '0.35rem',
                  transition: 'filter 0.25s ease, color 0.25s ease'
                }}
                className="social-logo-glow-item"
              >
                <AnimatePresence mode="wait">
                  {isCopied ? (
                    <motion.div
                      key="copied"
                      initial={{ scale: 0.2, rotate: -45, opacity: 0 }}
                      animate={{ scale: 1.15, rotate: 0, opacity: 1 }}
                      exit={{ scale: 0.2, rotate: 45, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                      style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      <Check size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="icon"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                    >
                      {item.svgPath}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}

          {/* Fixed-Width RESUME Button (Prevents Layout Shifting) */}
          <motion.button
            whileHover={{ scale: 1.15, color: accentColor }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={handleDownloadResume}
            title="Download Resume (Dhruv_Kedia_Resume.pdf)"
            style={{
              background: 'transparent',
              border: 'none',
              color: 'rgba(255, 255, 255, 0.85)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              padding: '0.35rem',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              transition: 'color 0.25s ease, text-shadow 0.25s ease'
            }}
            className="resume-text-btn-glow"
          >
            <AnimatePresence mode="wait">
              {copiedId === 'resume' ? (
                <motion.div
                  key="hero-resume-copied"
                  initial={{ scale: 0.2, rotate: -45, opacity: 0 }}
                  animate={{ scale: 1.15, rotate: 0, opacity: 1 }}
                  exit={{ scale: 0.2, rotate: 45, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 450, damping: 22 }}
                  style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', width: '64px' }}
                >
                  <Check size={18} />
                </motion.div>
              ) : (
                <motion.span
                  key="hero-resume-text"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'inline-block', width: '64px', textAlign: 'center' }}
                >
                  RESUME
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        </div>
      </div>

      {/* Animated Mobile Scroll Down Hint Indicator */}
      <motion.div
        className="hero-mobile-scroll-hint"
        animate={{ y: [0, 6, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
      >
        <ChevronDown size={14} style={{ color: accentColor }} />
        <span>SCROLL TO EXPLORE</span>
      </motion.div>
    </div>
  );
};
