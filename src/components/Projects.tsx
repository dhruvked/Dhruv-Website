import React, { useState } from 'react';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { PROJECTS } from '../data/projects';
import type { Project } from '../types';
import { ProjectModal } from './ProjectModal';

export const Projects: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  const categories = ['All', 'AI & Streaming', '3D & Graphics', 'Healthcare AI', 'Full Stack'];

  const filteredProjects = selectedCategory === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === selectedCategory);

  return (
    <section id="projects" className="section-padding">
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
          <div className="badge badge-violet" style={{ marginBottom: '1rem' }}>
            <Sparkles size={14} />
            <span>ENGINEERING SHOWCASE</span>
          </div>
          
          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Featured <span className="gradient-text">Systems & Projects</span>
          </h2>
          
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.05rem' }}>
            Production & open-source engineering work across real-time AI streaming, 3D graphics automation, and health tech.
          </p>

          {/* Category Filter Tabs */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.6rem',
              marginTop: '2rem'
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                style={{
                  padding: '0.5rem 1.1rem',
                  borderRadius: 'var(--radius-full)',
                  border: selectedCategory === cat ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
                  background: selectedCategory === cat ? 'rgba(0, 240, 255, 0.12)' : 'var(--bg-glass)',
                  color: selectedCategory === cat ? 'var(--accent-cyan)' : 'var(--text-secondary)',
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 600,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.75rem'
          }}
          className="projects-grid"
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="glass-card"
              onClick={() => setActiveModalProject(project)}
              style={{
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '1.75rem',
                borderTop: `2px solid ${project.accentColor}`
              }}
            >
              <div>
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span className="badge" style={{ color: project.accentColor, borderColor: `${project.accentColor}40`, fontSize: '0.75rem' }}>
                    {project.category}
                  </span>
                  <div
                    style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: 'rgba(255, 255, 255, 0.05)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--text-secondary)',
                      transition: 'all 0.2s ease'
                    }}
                    className="card-arrow"
                  >
                    <ArrowUpRight size={18} />
                  </div>
                </div>

                <h3 style={{ fontSize: '1.4rem', marginBottom: '0.35rem' }}>{project.title}</h3>
                <h4 style={{ fontSize: '0.95rem', color: project.accentColor, fontWeight: 600, marginBottom: '0.85rem' }}>
                  {project.subtitle}
                </h4>

                <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: 1.5 }}>
                  {project.tagline}
                </p>

                {/* Key Metrics */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                  {project.metrics.map((metric, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        padding: '0.2rem 0.6rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.04)',
                        color: 'var(--text-muted)',
                        border: '1px solid var(--border-subtle)'
                      }}
                    >
                      ⚡ {metric}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Tech Tags */}
              <div style={{ paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    style={{
                      fontSize: '0.75rem',
                      fontFamily: 'var(--font-mono)',
                      color: 'var(--text-muted)'
                    }}
                  >
                    #{tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span style={{ fontSize: '0.75rem', color: project.accentColor, fontFamily: 'var(--font-mono)' }}>
                    +{project.tags.length - 4} more
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />

      <style>{`
        .glass-card:hover .card-arrow {
          background: var(--accent-cyan) !important;
          color: #040810 !important;
          transform: translate(2px, -2px);
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
