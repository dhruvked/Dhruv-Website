import React from 'react';
import { X, CheckCircle2, Code2, Cpu, FolderGit2 } from 'lucide-react';
import type { Project } from '../types';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(4, 6, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        animation: 'fadeIn 0.2s ease'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '720px',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: '2rem',
          border: `1px solid ${project.accentColor}50`,
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            background: 'rgba(255, 255, 255, 0.08)',
            border: 'none',
            color: 'var(--text-primary)',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Category & Title Header */}
        <div style={{ marginBottom: '1.5rem' }}>
          <span className="badge" style={{ color: project.accentColor, borderColor: `${project.accentColor}50`, marginBottom: '0.75rem' }}>
            {project.category}
          </span>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.25rem' }}>{project.title}</h2>
          <p style={{ color: project.accentColor, fontWeight: 600 }}>{project.subtitle}</p>
        </div>

        {/* Description */}
        <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.05rem', lineHeight: 1.6 }}>
          {project.description}
        </p>

        {/* Metrics Banner */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '1rem',
            padding: '1rem',
            borderRadius: 'var(--radius-sm)',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            marginBottom: '1.5rem'
          }}
        >
          {project.metrics.map((metric, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} style={{ color: project.accentColor, flexShrink: 0 }} />
              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>{metric}</span>
            </div>
          ))}
        </div>

        {/* Architecture Details */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            <Cpu size={18} style={{ color: project.accentColor }} /> Architecture & Implementation
          </h4>
          <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
            {project.architectureDetails.map((detail, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: '0.6rem',
                  paddingLeft: '1.25rem',
                  position: 'relative',
                  color: 'var(--text-secondary)',
                  fontSize: '0.94rem'
                }}
              >
                <span
                  style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.6rem',
                    width: '6px',
                    height: '6px',
                    borderRadius: '50%',
                    background: project.accentColor
                  }}
                />
                {detail}
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack Tags */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem', fontSize: '1.1rem' }}>
            <Code2 size={18} style={{ color: project.accentColor }} /> Tech Stack
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  padding: '0.3rem 0.75rem',
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.82rem',
                  fontFamily: 'var(--font-mono)',
                  color: 'var(--text-primary)'
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Local Code File / Action Button */}
        {project.localPath && (
          <div
            style={{
              padding: '0.85rem 1rem',
              borderRadius: 'var(--radius-sm)',
              background: 'rgba(0, 0, 0, 0.4)',
              border: '1px dashed var(--border-subtle)',
              fontSize: '0.82rem',
              fontFamily: 'var(--font-mono)',
              color: 'var(--text-muted)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1rem'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
              <FolderGit2 size={16} style={{ color: project.accentColor, flexShrink: 0 }} />
              <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                Local Workspace: {project.localPath}
              </span>
            </div>
            <span className="badge" style={{ fontSize: '0.72rem' }}>VERIFIED CODEBASE</span>
          </div>
        )}
      </div>
    </div>
  );
};
