import React from 'react';
import { Code, Share2, Mail } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer id="contact" style={{ width: '100%', marginTop: '-1px', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ padding: 0 }}>
        {/* Monolithic Footer Grid Row - Bottom Border Removed */}
        <div className="footer-grid-responsive">
          {/* Cell 1: Brand & Identity */}
          <div className="footer-cell" style={{ gridColumn: 'span 6' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.35rem' }}>
              <div
                style={{
                  width: '20px',
                  height: '20px',
                  background: 'var(--accent-orange)',
                  color: '#040406',
                  fontWeight: 900,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem'
                }}
              >
                D
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 800, fontSize: '1rem' }}>
                Dhruv<span style={{ color: 'var(--accent-orange)' }}>.ai</span>
              </span>
            </div>

            <p style={{ color: 'var(--text-muted)', fontSize: '0.78rem', maxWidth: '440px', lineHeight: 1.4 }}>
              Full Stack AI Architect. Real-time media pipelines & 3D rendering engines.
            </p>
          </div>

          {/* Cell 2: Connect */}
          <div className="footer-cell" style={{ gridColumn: 'span 4' }}>
            <div style={{ fontSize: '0.78rem', marginBottom: '0.35rem', color: 'var(--text-primary)', fontWeight: 600 }}>
              System Connect
            </div>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="GitHub">
                <Code size={14} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-btn" aria-label="LinkedIn">
                <Share2 size={14} />
              </a>
              <a href="mailto:dhruv@example.com" className="social-btn" aria-label="Email">
                <Mail size={14} />
              </a>
            </div>
          </div>

          {/* Cell 3: Copyright */}
          <div className="footer-cell" style={{ gridColumn: 'span 2', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              © {new Date().getFullYear()} Dhruv.ai
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .footer-grid-responsive {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          width: 100%;
          border-top: 1px solid var(--border-hairline);
          border-left: 1px solid var(--border-hairline);
          border-right: 1px solid var(--border-hairline);
          border-bottom: none !important;
          background-color: var(--border-hairline);
          gap: 1px;
        }

        .footer-cell {
          background: var(--bg-tile);
          padding: 0.75rem 1.25rem;
          box-sizing: border-box;
        }

        .social-btn {
          width: 28px;
          height: 28px;
          border-radius: 3px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-hairline);
          color: var(--text-secondary);
          display: flex;
          alignItems: center;
          justifyContent: center;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .social-btn:hover {
          color: var(--accent-orange);
          border-color: var(--accent-orange);
        }

        @media (max-width: 768px) {
          .footer-grid-responsive {
            grid-template-columns: 1fr !important;
          }
          .footer-cell {
            grid-column: span 1 !important;
            align-items: flex-start !important;
          }
        }
      `}</style>
    </footer>
  );
};
