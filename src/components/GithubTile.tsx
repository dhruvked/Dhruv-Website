import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, BookOpen, Star, GitBranch, Code } from 'lucide-react';

interface GithubTileProps {
  accentColor: string;
}

interface GithubData {
  publicRepos: number;
  avatarUrl: string;
  latestRepo: string;
  totalStars: number;
  loading: boolean;
}

export const GithubTile: React.FC<GithubTileProps> = ({ accentColor }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [githubInfo, setGithubInfo] = useState<GithubData>({
    publicRepos: 17,
    avatarUrl: 'https://avatars.githubusercontent.com/u/84293083?v=4',
    latestRepo: 'dhruvked/Dhruv-Website',
    totalStars: 14,
    loading: true
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGithubData() {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch('https://api.github.com/users/dhruvked'),
          fetch('https://api.github.com/users/dhruvked/repos?sort=updated&per_page=100')
        ]);

        let publicRepos = 17;
        let avatarUrl = 'https://avatars.githubusercontent.com/u/84293083?v=4';
        let latestRepoName = 'dhruvked/Dhruv-Website';
        let starsCount = 14;

        if (userRes.ok) {
          const userData = await userRes.json();
          publicRepos = userData.public_repos || 17;
          avatarUrl = userData.avatar_url || avatarUrl;
        }

        if (reposRes.ok) {
          const reposData = await reposRes.json();
          if (Array.isArray(reposData)) {
            starsCount = reposData.reduce((acc: number, repo: any) => acc + (repo.stargazers_count || 0), 0);
            if (reposData[0]) latestRepoName = reposData[0].full_name;
          }
        }

        if (isMounted) {
          setGithubInfo({
            publicRepos,
            avatarUrl,
            latestRepo: latestRepoName,
            totalStars: starsCount,
            loading: false
          });
        }
      } catch (e) {
        console.warn('Fallback to static data fetch:', e);
        if (isMounted) {
          setGithubInfo((prev) => ({ ...prev, loading: false }));
        }
      }
    }

    fetchGithubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const handleOpenGithub = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open('https://github.com/dhruvked', '_blank');
  };

  return (
    <div
      className="github-tile-container"
      onClick={() => setIsFlipped(!isFlipped)}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ width: '100%', height: '100%', position: 'relative', perspective: '1200px', cursor: 'pointer' }}
    >
      {/* Framer Motion 3D Rotatable Wrapper */}
      <motion.div
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.75, type: 'spring', stiffness: 75, damping: 15 }}
        style={{ width: '100%', height: '100%', position: 'relative', transformStyle: 'preserve-3d' }}
      >
        {/* FRONT FACE: REAL LIVE GITHUB HEATMAP (CORS-SAFE CROSS-ORIGIN IMG TAG) */}
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
            padding: '1.2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#07090e',
            overflow: 'hidden'
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '0.4rem',
              position: 'relative'
            }}
          >
            {/* Live Cross-Origin GitHub Contribution Heatmap SVG Image */}
            <img
              src="https://ghchart.rshah.org/ff6b00/dhruvked"
              alt="Dhruv Kedia GitHub Contribution Heatmap"
              onLoad={() => setImgLoaded(true)}
              style={{
                width: '100%',
                maxHeight: '100%',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(255, 107, 0, 0.35))',
                opacity: imgLoaded ? 1 : 0,
                transition: 'opacity 0.4s ease'
              }}
            />

            {!imgLoaded && (
              <div style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                LOADING GITHUB HEATMAP...
              </div>
            )}
          </div>
        </div>

        {/* BACK FACE: LIVE GITHUB PROFILE & REPOSITORY SPECS */}
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
            borderTop: `3px solid ${accentColor}`,
            padding: '1.8rem 1.6rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e'
          }}
        >
          {/* Header Profile Identity */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '0.65rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <img
                src={githubInfo.avatarUrl}
                alt="dhruvked"
                style={{ width: '28px', height: '28px', borderRadius: '50%', border: `1px solid ${accentColor}` }}
              />
              <span style={{ fontSize: '1.05rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                dhruvked
              </span>
            </div>
            <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: '#10b981', background: 'rgba(16,185,129,0.12)', border: '1px solid rgba(16,185,129,0.3)', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>
              ● LIVE GITHUB DATA
            </span>
          </div>

          {/* 4-Box Stats Bento Grid (Pulled from live GitHub API) */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', margin: '0.5rem 0' }}>
            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.65rem 0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: accentColor, marginBottom: '0.2rem' }}>
                <BookOpen size={13} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>PUBLIC REPOS</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                {githubInfo.publicRepos}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.65rem 0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#38bdf8', marginBottom: '0.2rem' }}>
                <Star size={13} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>STARGAZERS</span>
              </div>
              <div style={{ fontSize: '1.5rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                {githubInfo.totalStars}
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.65rem 0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#10b981', marginBottom: '0.2rem' }}>
                <GitBranch size={13} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>STATUS</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                ACTIVE
              </div>
            </div>

            <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '6px', padding: '0.65rem 0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: '#a855f7', marginBottom: '0.2rem' }}>
                <Code size={13} />
                <span style={{ fontSize: '0.62rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.6)' }}>PRIMARY</span>
              </div>
              <div style={{ fontSize: '1.1rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700 }}>
                TypeScript
              </div>
            </div>
          </div>

          {/* Footer Active Repo & External Link CTA */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '0.65rem' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'rgba(255,255,255,0.7)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '180px' }}>
              {githubInfo.latestRepo}
            </span>
            <button
              onClick={handleOpenGithub}
              className="btn btn-primary"
              style={{ fontSize: '0.7rem', padding: '0.3rem 0.75rem', gap: '0.25rem' }}
            >
              <span>GitHub</span>
              <ArrowUpRight size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
