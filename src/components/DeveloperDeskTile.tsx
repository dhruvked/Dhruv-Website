import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitCommit, GitBranch, ExternalLink, Loader2 } from 'lucide-react';

interface DeveloperDeskTileProps {
  accentColor?: string;
}

interface CommitData {
  hash: string;
  message: string;
  repo: string;
  time: string;
  url: string;
  description: string | null;
  isLoading: boolean;
}

export const DeveloperDeskTile: React.FC<DeveloperDeskTileProps> = ({ accentColor = '#ff6b00' }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [frame, setFrame] = useState(0);
  const [time, setTime] = useState<Date>(new Date());
  
  const [latestCommit, setLatestCommit] = useState<CommitData>({
    hash: '',
    message: '',
    repo: 'dhruvked/Dhruv-Website',
    time: '',
    url: 'https://github.com/dhruvked/Dhruv-Website',
    description: null,
    isLoading: true
  });

  // Fetch live GitHub repository description and latest commit info directly from GitHub API
  useEffect(() => {
    let isMounted = true;

    const fetchGitHubData = async () => {
      try {
        const [commitRes, repoRes] = await Promise.all([
          fetch('https://api.github.com/repos/dhruvked/Dhruv-Website/commits?per_page=1', {
            headers: { Accept: 'application/vnd.github.v3+json' }
          }),
          fetch('https://api.github.com/repos/dhruvked/Dhruv-Website', {
            headers: { Accept: 'application/vnd.github.v3+json' }
          })
        ]);

        let commitMsg = '';
        let commitHash = '';
        let commitTime = '';
        let commitUrl = 'https://github.com/dhruvked/Dhruv-Website';
        let repoDesc: string | null = null;

        if (commitRes.ok) {
          const commitData = await commitRes.json();
          if (Array.isArray(commitData) && commitData[0]) {
            const commit = commitData[0];
            commitHash = commit.sha.substring(0, 7);
            commitMsg = commit.commit.message.split('\n')[0];
            commitTime = new Date(commit.commit.author.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            });
            commitUrl = commit.html_url || 'https://github.com/dhruvked/Dhruv-Website';
          }
        }

        if (repoRes.ok) {
          const repoData = await repoRes.json();
          if (repoData && typeof repoData.description === 'string' && repoData.description.trim() !== '') {
            repoDesc = repoData.description.trim();
          }
        }

        if (isMounted) {
          setLatestCommit({
            hash: commitHash,
            message: commitMsg,
            repo: 'dhruvked/Dhruv-Website',
            time: commitTime,
            url: commitUrl,
            description: repoDesc,
            isLoading: false
          });
        }
      } catch (e) {
        console.warn('Failed to fetch live GitHub commit data:', e);
        if (isMounted) {
          setLatestCommit((prev) => ({ ...prev, isLoading: false }));
        }
      }
    };

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    const pixelTimer = setInterval(() => {
      setFrame((prev) => (prev + 1) % 16);
    }, 200);

    return () => {
      clearInterval(timer);
      clearInterval(pixelTimer);
    };
  }, []);

  const hours = time.getHours();
  const isDaytime = hours >= 6 && hours < 18;
  const isSunset = hours >= 18 && hours < 20;
  const isNighttime = hours >= 20 || hours < 6;
  const isLateNight = hours >= 23 || hours < 6;

  // RGB Ambient Light Color Cycle
  const rgbColors = ['#ff6b00', '#38bdf8', '#a855f7', '#10b981'];
  const currentRgbColor = rgbColors[Math.floor(frame / 4) % rgbColors.length];

  return (
    <div
      className="developer-desk-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(true);
      }}
      onMouseLeave={() => {
        if (window.matchMedia('(hover: hover)').matches) setIsFlipped(false);
      }}
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
        {/* FRONT FACE: ENHANCED 8-BIT SCENE */}
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
            padding: '1.2rem 1.4rem 0.8rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* 8-Bit Pixel Scene SVG */}
          <div
            style={{
              flex: 1,
              width: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0.2rem 0'
            }}
          >
            <svg
              width="150"
              height="96"
              viewBox="0 0 106 68"
              fill="none"
              style={{ shapeRendering: 'crispEdges', maxWidth: '100%', maxHeight: '100%' }}
            >
              {/* RGB AMBIENT GLOW STRIP BEHIND DESK */}
              <rect x="2" y="38" width="102" height="4" fill={currentRgbColor} opacity="0.35" />

              {/* PIXEL BACKGROUND WINDOW */}
              <rect x="6" y="4" width="22" height="18" fill="#0f172a" rx="1" />
              <rect
                x="7"
                y="5"
                width="20"
                height="16"
                fill={isDaytime ? '#38bdf8' : isSunset ? '#c084fc' : '#090d16'}
              />

              {/* Day Clouds */}
              {isDaytime && (
                <>
                  <rect x={7 + ((frame * 2) % 16)} y="8" width="6" height="2" fill="#ffffff" opacity="0.9" />
                  <rect x={12 + ((frame * 2 + 6) % 14)} y="12" width="5" height="2" fill="#ffffff" opacity="0.8" />
                </>
              )}

              {/* Sunset Sun */}
              {isSunset && (
                <rect x="15" y="14" width="4" height="4" fill="#ff6b00" />
              )}

              {/* Night Moon & Twinkling Stars & Shooting Star */}
              {isNighttime && (
                <>
                  <rect x="22" y="8" width="3" height="3" fill="#fef08a" />
                  <rect x="10" y="7" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 2 === 0 ? 1 : 0.3} />
                  <rect x="18" y="15" width="1.5" height="1.5" fill="#ffffff" opacity={frame % 3 === 0 ? 1 : 0.3} />
                  {/* Shooting Star Event */}
                  <rect x={24 - (frame % 8) * 2} y={5 + (frame % 8)} width="2" height="1" fill="#ffffff" opacity="0.8" />
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

              {/* PIXEL SERVER TOWER WITH BLINKING LED LIGHTS */}
              <rect x="84" y="24" width="12" height="18" fill="#1e293b" rx="1" />
              <rect x="86" y="27" width="2" height="2" fill={frame % 2 === 0 ? '#10b981' : '#334155'} />
              <rect x="90" y="27" width="2" height="2" fill={frame % 3 === 0 ? '#ff6b00' : '#334155'} />
              <rect x="86" y="32" width="2" height="2" fill={frame % 4 === 0 ? '#38bdf8' : '#334155'} />
              <rect x="90" y="32" width="2" height="2" fill={frame % 2 === 1 ? '#10b981' : '#334155'} />
              <rect x="86" y="37" width="6" height="1" fill="#475569" />

              {/* Dual Monitors Setup */}
              <rect x="36" y="16" width="30" height="20" fill="#1e293b" rx="2" />
              <rect x="38" y="18" width="26" height="16" fill="#0f172a" />
              <rect x="40" y="20" width={frame % 2 === 0 ? '14' : '8'} height="2" fill={accentColor} />
              <rect x="40" y="24" width={frame % 3 === 0 ? '18' : '10'} height="2" fill="#38bdf8" />
              <rect x="40" y="28" width={frame % 2 === 1 ? '12' : '6'} height="2" fill="#10b981" />

              {/* Monitor Stand */}
              <rect x="49" y="36" width="4" height="4" fill="#475569" />
              <rect x="45" y="40" width="12" height="2" fill="#475569" />

              {/* Desk */}
              <rect x="4" y="42" width="98" height="3" fill="#334155" />
              <rect x="8" y="45" width="4" height="20" fill="#1e293b" />
              <rect x="94" y="45" width="4" height="20" fill="#1e293b" />

              {/* POTTED PIXEL BONSAI / CACTUS PLANT */}
              <rect x="14" y="36" width="6" height="6" fill="#b45309" rx="1" />
              <rect x="16" y="30" width="2" height="6" fill="#10b981" />
              <rect x="14" y="32" width="2" height="2" fill="#10b981" />
              <rect x="18" y="31" width="2" height="2" fill="#10b981" />

              {/* COFFEE STEAM vs FLOATING ZZZ BUBBLES */}
              {!isLateNight ? (
                <>
                  <rect x="24" y="36" width="5" height="6" fill="#f87171" rx="1" />
                  <rect x="22" y="38" width="2" height="3" fill="#f87171" />
                  <rect x="25" y={32 - (frame % 3)} width="1" height="2" fill="#ffffff" opacity="0.6" />
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

              {/* DEVELOPER CHARACTER WITH RETRO HEADPHONES & MUSIC NOTES */}
              <rect
                x="64"
                y={isLateNight ? 26 : 24}
                width="10"
                height="10"
                fill="#f87171"
                rx="2"
              />
              <rect x="63" y={isLateNight ? 24 : 22} width="12" height="3" fill="#ff6b00" />
              <rect x="62" y={isLateNight ? 26 : 24} width="2" height="5" fill="#38bdf8" />
              <rect x="74" y={isLateNight ? 26 : 24} width="2" height="5" fill="#38bdf8" />

              {!isLateNight && (
                <text
                  x={76 + (frame % 2)}
                  y={18 - (frame % 3) * 2}
                  fill="#ff6b00"
                  fontSize="6"
                  fontFamily="monospace"
                  opacity={0.9}
                >
                  ♪
                </text>
              )}

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

              <rect x="44" y="40" width="14" height="2" fill="#94a3b8" />
            </svg>
          </div>

          {/* INCONSPICUOUS SUBTLE BOTTOM MESSAGE */}
          <div style={{ paddingTop: '0.35rem', textAlign: 'center' }}>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.45)', letterSpacing: '0.02em' }}>
              flip to view latest commit ↗
            </span>
          </div>
        </div>

        {/* BACK FACE: SLEEK HEADER (TOP) -> SINGLE COMBINED REPO & COMMIT CARD (MIDDLE) -> ARTISTIC QUOTE (BOTTOM) */}
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
            padding: '1.2rem 1.4rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          {/* 1. SLEEK SMART HEADER OUTSIDE THE CARD (AT THE VERY TOP) */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }} />
              <span style={{ fontSize: '0.74rem', fontFamily: 'var(--font-mono)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.08em' }}>
                LATEST COMMIT & REPOSITORY
              </span>
            </div>

            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: accentColor, fontWeight: 700 }}>
              GITHUB STREAM
            </span>
          </div>

          {/* 2. SINGLE COMBINED REPO + COMMIT CARD (MIDDLE) */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.025)',
              border: '1px solid rgba(255, 255, 255, 0.06)',
              borderLeft: `3px solid ${accentColor}`,
              borderRadius: '6px',
              padding: '0.75rem 0.9rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.45rem',
              margin: '0.3rem 0'
            }}
          >
            {/* Repo Link + Hash Row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <a
                href={latestCommit.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-mono)',
                  color: accentColor,
                  fontWeight: 700,
                  textDecoration: 'none'
                }}
              >
                <GitBranch size={12} />
                <span>{latestCommit.repo}</span>
                <ExternalLink size={10} />
              </a>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.65rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.6)' }}>
                {latestCommit.isLoading ? (
                  <Loader2 size={11} className="animate-spin" style={{ color: accentColor }} />
                ) : (
                  <GitCommit size={11} style={{ color: accentColor }} />
                )}
                <span>{latestCommit.hash || 'e136b76'}</span>
              </div>
            </div>

            {/* Commit Message */}
            {latestCommit.message && (
              <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-satoshi)', color: '#ffffff', margin: 0, fontWeight: 500, lineHeight: 1.4 }}>
                "{latestCommit.message}"
              </p>
            )}

            {/* Commit Time */}
            {latestCommit.time && (
              <span style={{ fontSize: '0.58rem', fontFamily: 'var(--font-mono)', color: 'rgba(255, 255, 255, 0.35)' }}>
                Pushed {latestCommit.time}
              </span>
            )}
          </div>

          {/* 3. ARTISTIC EDITORIAL CYBER-JOURNAL QUOTE (BELOW THE CARD) */}
          {latestCommit.description ? (
            <div
              style={{
                position: 'relative',
                paddingLeft: '1.2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '-0.4rem',
                  fontSize: '2.2rem',
                  lineHeight: 1,
                  fontFamily: 'serif',
                  color: accentColor,
                  opacity: 0.85
                }}
              >
                “
              </span>
              <p
                style={{
                  fontSize: '0.76rem',
                  fontFamily: 'var(--font-clash)',
                  color: 'rgba(255, 255, 255, 0.85)',
                  fontWeight: 600,
                  margin: 0,
                  lineHeight: 1.45,
                  fontStyle: 'italic'
                }}
              >
                {latestCommit.description}
              </p>
            </div>
          ) : null}
        </div>
      </motion.div>
    </div>
  );
};
