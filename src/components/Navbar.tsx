import React, { useState } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header style={{ width: '100%', position: 'relative', zIndex: 10 }}>
      <div className="container" style={{ padding: 0 }}>
        {/* Monolithic Header Grid Row - Top Border Removed */}
        <div className="header-grid-responsive">
          {/* Cell 1: Brand */}
          <div className="header-cell" style={{ gridColumn: 'span 4' }}>
            <a
              href="#"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                textDecoration: 'none',
                color: 'var(--text-primary)',
                fontFamily: 'var(--font-heading)',
                fontSize: '1.1rem',
                fontWeight: 800
              }}
            >
              <div
                style={{
                  width: '24px',
                  height: '24px',
                  background: 'var(--accent-orange)',
                  color: '#040406',
                  fontWeight: 900,
                  borderRadius: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.85rem'
                }}
              >
                D
              </div>
              <span>Dhruv<span style={{ color: 'var(--accent-orange)' }}>.ai</span></span>
            </a>
          </div>

          {/* Cell 2: Nav Link 1 */}
          <div className="header-cell desktop-cell" style={{ gridColumn: 'span 3' }}>
            <a href="#grid" className="header-nav-link">Monolithic Grid</a>
          </div>

          {/* Cell 3: Nav Link 2 */}
          <div className="header-cell desktop-cell" style={{ gridColumn: 'span 3' }}>
            <a href="#projects" className="header-nav-link">Projects & Stack</a>
          </div>

          {/* Cell 4: Action */}
          <div className="header-cell desktop-cell" style={{ gridColumn: 'span 2' }}>
            <a href="#contact" className="header-action-link">
              <span>Get In Touch</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          {/* Mobile Toggle Cell */}
          <div className="header-cell mobile-cell" style={{ display: 'none' }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer */}
        {mobileOpen && (
          <div
            style={{
              background: 'var(--bg-tile)',
              borderLeft: '1px solid var(--border-hairline)',
              borderRight: '1px solid var(--border-hairline)',
              borderBottom: '1px solid var(--border-hairline)',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem'
            }}
          >
            <a href="#grid" onClick={() => setMobileOpen(false)} className="header-nav-link">Monolithic Grid</a>
            <a href="#projects" onClick={() => setMobileOpen(false)} className="header-nav-link">Projects & Stack</a>
            <a href="#contact" onClick={() => setMobileOpen(false)} className="btn btn-primary" style={{ justifyContent: 'center' }}>
              Get In Touch
            </a>
          </div>
        )}
      </div>

      <style>{`
        .header-grid-responsive {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          width: 100%;
          border-top: none !important;
          border-left: 1px solid var(--border-hairline);
          border-right: 1px solid var(--border-hairline);
          border-bottom: 1px solid var(--border-hairline);
          background-color: var(--border-hairline);
          gap: 1px;
        }

        .header-cell {
          background: var(--bg-tile);
          padding: 0.75rem 1.25rem;
          display: flex;
          alignItems: center;
          justify-content: space-between;
          box-sizing: border-box;
        }

        .header-nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.85rem;
          font-weight: 500;
          transition: color 0.2s ease;
        }

        .header-nav-link:hover {
          color: var(--accent-orange);
        }

        .header-action-link {
          color: var(--accent-orange);
          text-decoration: none;
          font-size: 0.82rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          gap: 0.3rem;
          transition: opacity 0.2s ease;
        }

        .header-action-link:hover {
          opacity: 0.8;
        }

        @media (max-width: 768px) {
          .desktop-cell { display: none !important; }
          .mobile-cell { display: flex !important; grid-column: span 8 !important; justify-content: flex-end !important; }
          .header-cell { grid-column: span 4 !important; }
        }
      `}</style>
    </header>
  );
};
