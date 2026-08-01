import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check } from 'lucide-react';

interface SocialLink {
  id: string;
  name: string;
  handle: string;
  url: string;
  svgPath: React.ReactNode;
}

const SOCIAL_LINKS: SocialLink[] = [
  {
    id: 'github',
    name: 'GitHub',
    handle: 'dhruvked',
    url: 'https://github.com/dhruvked',
    svgPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
        <path d="M9 18c-4.51 2-5-2-7-2" />
      </svg>
    )
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    handle: 'dhruvkedia',
    url: 'https://linkedin.com/in/dhruvkedia',
    svgPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    )
  },
  {
    id: 'twitter',
    name: 'X / Twitter',
    handle: '@dhruvkedia',
    url: 'https://x.com/dhruvkedia',
    svgPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
      </svg>
    )
  },
  {
    id: 'email',
    name: 'Email',
    handle: 'dhruvkedaria@gmail.com',
    url: 'mailto:dhruvkedaria@gmail.com',
    svgPath: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect width="20" height="16" x="2" y="4" rx="2" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </svg>
    )
  }
];

interface SocialConnectTileProps {
  accentColor: string;
}

export const SocialConnectTile: React.FC<SocialConnectTileProps> = ({ accentColor }) => {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent, item: SocialLink) => {
    e.stopPropagation();
    navigator.clipboard.writeText(item.id === 'email' ? item.handle : item.url);
    setCopiedId(item.id);
    window.open(item.url, '_blank');
    setTimeout(() => {
      setCopiedId(null);
    }, 1800);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="social-connect-pure-logos"
      style={{
        width: '100%',
        height: '100%',
        background: '#07090e',
        border: 'none',
        padding: '0.8rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        overflow: 'hidden'
      }}
    >
      {/* Horizontal Row of Glowing Brand Logos (No Headings, No Borders) */}
      {SOCIAL_LINKS.map((item) => {
        const isCopied = copiedId === item.id;

        return (
          <motion.div
            key={item.id}
            whileHover={{ scale: 1.2, color: accentColor }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            onClick={(e) => handleLinkClick(e, item)}
            title={`${item.name} (${item.handle})`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(255, 255, 255, 0.75)',
              cursor: 'pointer',
              padding: '0.5rem',
              transition: 'filter 0.25s ease, color 0.25s ease'
            }}
            className="social-logo-glow-item"
          >
            <AnimatePresence mode="wait">
              {isCopied ? (
                <motion.div
                  key="copied"
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.5, opacity: 0 }}
                  style={{ color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  <Check size={22} />
                </motion.div>
              ) : (
                <motion.div
                  key="icon"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                >
                  {item.svgPath}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      <style>{`
        .social-logo-glow-item:hover {
          color: var(--accent-orange) !important;
          filter: drop-shadow(0 0 10px var(--accent-orange)) drop-shadow(0 0 20px var(--accent-orange)) !important;
        }
      `}</style>
    </motion.div>
  );
};
