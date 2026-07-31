import React from 'react';
import { Cpu, Zap, Box, Layers, Database, Code, Server, Container, Cloud, Sliders, Video, GitBranch } from 'lucide-react';
import { SKILL_CATEGORIES } from '../data/skills';

export const TechStack: React.FC = () => {
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Zap': return <Zap size={16} />;
      case 'Video': return <Video size={16} />;
      case 'Database': return <Database size={16} />;
      case 'Cpu': return <Cpu size={16} />;
      case 'Sliders': return <Sliders size={16} />;
      case 'Box': return <Box size={16} />;
      case 'Layers': return <Layers size={16} />;
      case 'Code': return <Code size={16} />;
      case 'Server': return <Server size={16} />;
      case 'Container': return <Container size={16} />;
      case 'Cloud': return <Cloud size={16} />;
      default: return <GitBranch size={16} />;
    }
  };

  return (
    <section id="skills" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Cpu size={14} />
            <span>TECH RADAR & CAPABILITIES</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Core Architectural <span className="gradient-text">Stack</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Specialized engineering capabilities across real-time AI streaming, 3D graphics, full-stack web, and cloud infrastructure.
          </p>
        </div>

        {/* Skill Category Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))',
            gap: '1.75rem'
          }}
        >
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.id}
              className="glass-card"
              style={{
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between'
              }}
            >
              <div>
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                  {category.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '1.5rem', lineHeight: 1.5 }}>
                  {category.description}
                </p>

                {/* Skill Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '0.6rem 0.85rem',
                        borderRadius: 'var(--radius-sm)',
                        background: skill.featured ? 'rgba(0, 240, 255, 0.06)' : 'rgba(255, 255, 255, 0.02)',
                        border: skill.featured ? '1px solid rgba(0, 240, 255, 0.2)' : '1px solid var(--border-subtle)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                        <span style={{ color: skill.featured ? 'var(--accent-cyan)' : 'var(--text-secondary)' }}>
                          {getIcon(skill.iconName)}
                        </span>
                        <span style={{ fontSize: '0.9rem', fontWeight: skill.featured ? 600 : 400, color: 'var(--text-primary)' }}>
                          {skill.name}
                        </span>
                      </div>

                      <span
                        style={{
                          fontSize: '0.75rem',
                          fontFamily: 'var(--font-mono)',
                          color: skill.level === 'Expert' ? 'var(--accent-cyan)' : 'var(--text-muted)'
                        }}
                      >
                        {skill.level}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
