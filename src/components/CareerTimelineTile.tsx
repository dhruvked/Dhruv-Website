import React, { useState } from 'react';
import { Briefcase, GraduationCap, Sparkles, Filter } from 'lucide-react';

interface TimelineItem {
  id: string;
  year: string;
  role: string;
  company?: string;
  category: 'web' | 'ai' | 'edu';
  description: string;
  impactMetrics?: string[];
  skills: string[];
  type: 'work' | 'education';
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    id: 't1',
    year: '2024 – PRESENT',
    role: 'Senior Full-Stack & AI Engineer',
    category: 'ai',
    description: 'Architecting distributed multi-agent AI workflows, microservices, and React engines.',
    impactMetrics: ['+250k API calls/day', 'Autonomous Agent Pipelines'],
    skills: ['React', 'TypeScript', 'Python', 'AI Agents'],
    type: 'work'
  },
  {
    id: 't2',
    year: '2022 – 2024',
    role: 'Full-Stack Systems Engineer',
    category: 'web',
    description: 'Built high-throughput APIs, database cache pipelines (Redis/PostgreSQL), and modern web platforms.',
    impactMetrics: ['99.9% Uptime', '40% UX Speedup'],
    skills: ['Node.js', 'Python', 'AWS', 'Docker'],
    type: 'work'
  },
  {
    id: 't3',
    year: '2021 – 2022',
    role: 'Software Engineering Intern',
    category: 'web',
    description: 'Developed backend microservices, performance scripts, and open-source packages.',
    impactMetrics: ['Open Source Packages', 'Microservice Optimization'],
    skills: ['JavaScript', 'Python', 'Git'],
    type: 'work'
  },
  {
    id: 't4',
    year: '2021',
    role: 'B.Tech Computer Science',
    category: 'edu',
    description: 'Graduated with distinction; focused on distributed systems and algorithms.',
    impactMetrics: ['Distinction Honors', 'Distributed Systems'],
    skills: ['CS Fundamentals', 'Algorithms', 'OS'],
    type: 'education'
  }
];

interface CareerTimelineTileProps {
  accentColor: string;
}

export const CareerTimelineTile: React.FC<CareerTimelineTileProps> = ({ accentColor }) => {
  const [activeId, setActiveId] = useState<string>('t1');
  const [filterCategory, setFilterCategory] = useState<'all' | 'web' | 'ai' | 'edu'>('all');
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  const filteredItems = TIMELINE_DATA.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#07090e',
        borderTop: `3px solid ${accentColor}`,
        padding: '1.6rem 1.35rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      {/* Header Bar with Category Filter Tabs */}
      <div style={{ borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.65rem', marginBottom: '0.85rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.55rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
            <Sparkles size={14} style={{ color: accentColor }} />
            <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-clash)', color: '#ffffff', fontWeight: 700, letterSpacing: '0.03em' }}>
              CAREER TIMELINE
            </h2>
          </div>
          <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            {filteredItems.length} MILESTONES
          </span>
        </div>

        {/* Filter Bar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
          <Filter size={11} style={{ color: 'var(--text-muted)', marginRight: '2px' }} />
          {[
            { id: 'all', label: 'ALL' },
            { id: 'ai', label: 'AI/ML' },
            { id: 'web', label: 'WEB' },
            { id: 'edu', label: 'EDU' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setFilterCategory(tab.id as any)}
              style={{
                background: filterCategory === tab.id ? 'rgba(255, 107, 0, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                border: `1px solid ${filterCategory === tab.id ? accentColor : 'var(--border-hairline)'}`,
                color: filterCategory === tab.id ? accentColor : 'var(--text-muted)',
                padding: '0.15rem 0.5rem',
                borderRadius: '4px',
                fontSize: '0.65rem',
                fontFamily: 'var(--font-mono)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Vertical Timeline Axis Container */}
      <div style={{ position: 'relative', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', paddingLeft: '1.25rem', margin: '0.4rem 0' }}>
        {/* Illuminated 1px Vertical Axis */}
        <div
          style={{
            position: 'absolute',
            top: '8px',
            bottom: '8px',
            left: '4px',
            width: '1px',
            background: `linear-gradient(180deg, ${accentColor} 0%, rgba(255,107,0,0.4) 50%, rgba(255,255,255,0.12) 100%)`,
            boxShadow: `0 0 8px ${accentColor}40`
          }}
        />

        {/* Milestone Nodes */}
        {filteredItems.map((item, index) => {
          const isActive = activeId === item.id;
          const isPresentRole = index === 0 && item.id === 't1';

          return (
            <div
              key={item.id}
              onClick={() => setActiveId(item.id)}
              onMouseEnter={() => setActiveId(item.id)}
              style={{
                position: 'relative',
                cursor: 'pointer',
                transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                padding: '0.45rem 0.65rem',
                borderRadius: '6px',
                background: isActive ? 'rgba(8, 10, 15, 0.95)' : 'transparent',
                border: `1px solid ${isActive ? 'rgba(255, 107, 0, 0.45)' : 'transparent'}`,
                boxShadow: isActive ? '0 8px 25px rgba(0, 0, 0, 0.7), inset 0 0 15px rgba(255, 107, 0, 0.08)' : 'none',
                transform: isActive ? 'translateY(-1px)' : 'none'
              }}
            >
              {/* Radar Pulsing Bullet Node */}
              <div
                style={{
                  position: 'absolute',
                  left: '-1.45rem',
                  top: '0.75rem',
                  width: isPresentRole ? '9px' : isActive ? '8px' : '6px',
                  height: isPresentRole ? '9px' : isActive ? '8px' : '6px',
                  borderRadius: '50%',
                  background: isPresentRole ? '#10b981' : isActive ? accentColor : 'rgba(255,255,255,0.3)',
                  boxShadow: isPresentRole ? '0 0 12px #10b981' : isActive ? `0 0 12px ${accentColor}` : 'none',
                  transition: 'all 0.25s ease'
                }}
              />

              {/* Date Pill & Type Icon */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.2rem' }}>
                <span
                  style={{
                    fontSize: '0.68rem',
                    fontFamily: 'var(--font-mono)',
                    color: isPresentRole ? '#10b981' : isActive ? accentColor : 'var(--text-muted)',
                    fontWeight: 600,
                    letterSpacing: '0.05em',
                    background: isPresentRole ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255,255,255,0.03)',
                    border: `1px solid ${isPresentRole ? 'rgba(16, 185, 129, 0.3)' : 'var(--border-hairline)'}`,
                    padding: '0.12rem 0.5rem',
                    borderRadius: '12px'
                  }}
                >
                  {item.year}
                </span>

                {item.type === 'work' ? (
                  <Briefcase size={12} style={{ color: isActive ? accentColor : 'var(--text-muted)', opacity: 0.75 }} />
                ) : (
                  <GraduationCap size={12} style={{ color: isActive ? accentColor : 'var(--text-muted)', opacity: 0.75 }} />
                )}
              </div>

              {/* Role Title */}
              <h3 style={{ fontSize: '0.94rem', fontFamily: 'var(--font-satoshi)', color: '#ffffff', fontWeight: 700, margin: '0.15rem 0' }}>
                {item.role}
              </h3>

              {/* Description */}
              <p style={{ fontSize: '0.78rem', fontFamily: 'var(--font-satoshi)', color: isActive ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.65)', lineHeight: 1.45, margin: '0.25rem 0' }}>
                {item.description}
              </p>

              {/* Impact Metrics Badges (Revealed on active) */}
              {isActive && item.impactMetrics && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', margin: '0.35rem 0 0.1rem 0' }}>
                  {item.impactMetrics.map((metric) => (
                    <span
                      key={metric}
                      style={{
                        fontSize: '0.66rem',
                        fontFamily: 'var(--font-mono)',
                        color: '#10b981',
                        background: 'rgba(16, 185, 129, 0.1)',
                        border: '1px solid rgba(16, 185, 129, 0.3)',
                        padding: '0.1rem 0.45rem',
                        borderRadius: '4px'
                      }}
                    >
                      ✓ {metric}
                    </span>
                  ))}
                </div>
              )}

              {/* Tech Skill Badges */}
              {isActive && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.45rem' }}>
                  {item.skills.map((skill) => {
                    const isSelected = selectedSkill === skill;
                    return (
                      <span
                        key={skill}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedSkill(isSelected ? null : skill);
                        }}
                        className="tech-badge"
                        style={{
                          fontSize: '0.66rem',
                          padding: '0.15rem 0.45rem',
                          color: isSelected ? '#ffffff' : accentColor,
                          background: isSelected ? accentColor : 'rgba(255,255,255,0.03)',
                          borderColor: `${accentColor}45`,
                          cursor: 'pointer'
                        }}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Footer Indicator */}
      <div style={{ borderTop: '1px solid var(--border-hairline)', paddingTop: '0.6rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
          PAGE 01 | ADJACENT MATRIX
        </span>
        <span style={{ fontSize: '0.66rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
          ● INTERACTIVE NODES
        </span>
      </div>
    </div>
  );
};
