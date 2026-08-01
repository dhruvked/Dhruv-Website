import React, { useState } from 'react';
import { ContentStore, type PortfolioContentModel, type TimelineItem, type ProjectItem, type TechStackDomain } from '../data/contentStore';
import { Save, Copy, RotateCcw, ArrowLeft, Check, Plus, Trash2, Edit3, Sparkles, Briefcase, Code2, Layers, Share2 } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const [content, setContent] = useState<PortfolioContentModel>(() => ContentStore.getContent());
  const [saved, setSaved] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'timeline' | 'hero' | 'projects' | 'tech' | 'socials'>('timeline');

  const handleSave = () => {
    ContentStore.updateContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleCopyCode = () => {
    const codeString = `export const INITIAL_CONTENT: PortfolioContentModel = ${JSON.stringify(content, null, 2)};`;
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReset = () => {
    const defaultContent = ContentStore.resetContent();
    setContent(defaultContent);
  };

  // Timeline Handlers
  const handleAddTimeline = () => {
    const newItem: TimelineItem = {
      id: `t_${Date.now()}`,
      year: '2026',
      role: 'New Engineering Role / Project',
      description: 'Brief description of engineering achievements.'
    };
    const updated = { ...content, timeline: [...content.timeline, newItem] };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  const handleUpdateTimeline = (id: string, updatedFields: Partial<TimelineItem>) => {
    const updated = {
      ...content,
      timeline: content.timeline.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  const handleDeleteTimeline = (id: string) => {
    const updated = {
      ...content,
      timeline: content.timeline.filter((t) => t.id !== id)
    };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  // Project Handlers
  const handleAddProject = () => {
    const newProj: ProjectItem = {
      id: `p_${Date.now()}`,
      title: 'NEW PROJECT',
      tag: `0${content.projects.length + 1} / NEW`,
      tagline: 'Short System Tagline',
      description: 'Detailed description of architecture and implementation.',
      techPills: ['React', 'TypeScript', 'Node.js'],
      codeUrl: 'https://github.com/dhruvked',
      specs: ['High-throughput performance', 'Clean API contracts']
    };
    const updated = { ...content, projects: [...content.projects, newProj] };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  const handleUpdateProject = (id: string, updatedFields: Partial<ProjectItem>) => {
    const updated = {
      ...content,
      projects: content.projects.map((p) => (p.id === id ? { ...p, ...updatedFields } : p))
    };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = {
      ...content,
      projects: content.projects.filter((p) => p.id !== id)
    };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  // Tech Stack Handlers
  const handleUpdateTechStack = (id: string, updatedFields: Partial<TechStackDomain>) => {
    const updated = {
      ...content,
      techStack: content.techStack.map((s) => (s.id === id ? { ...s, ...updatedFields } : s))
    };
    setContent(updated);
    ContentStore.updateContent(updated);
  };

  return (
    <div
      style={{
        width: '100vw',
        minHeight: '100vh',
        background: '#040508',
        color: '#ffffff',
        fontFamily: 'var(--font-satoshi)',
        padding: '2rem 3rem',
        overflowY: 'auto'
      }}
    >
      {/* Admin Navigation Header */}
      <header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
          paddingBottom: '1.2rem',
          marginBottom: '1.5rem',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <Edit3 size={18} style={{ color: 'var(--accent-orange)' }} />
            <h1 style={{ fontSize: '1.6rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0, fontWeight: 700 }}>
              PORTFOLIO CONTENT STUDIO ADMIN
            </h1>
          </div>
          <p style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', margin: '0.2rem 0 0 0', fontFamily: 'var(--font-mono)' }}>
            PATH: /admin — Edit career timeline milestones, project descriptions, stack ratings, and hero bio.
          </p>
        </div>

        {/* Action Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <button
            onClick={handleSave}
            style={{
              background: '#ff6b00',
              color: '#000000',
              border: 'none',
              borderRadius: '6px',
              padding: '0.6rem 1.1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem',
              boxShadow: '0 4px 15px rgba(255, 107, 0, 0.3)'
            }}
          >
            {saved ? <Check size={15} /> : <Save size={15} />}
            <span>{saved ? 'Saved Live!' : 'Save Content'}</span>
          </button>

          <button
            onClick={handleCopyCode}
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              color: '#ffffff',
              borderRadius: '6px',
              padding: '0.6rem 1.1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            {copied ? <Check size={15} style={{ color: '#10b981' }} /> : <Copy size={15} />}
            <span>{copied ? 'Copied TS Code!' : 'Copy Code for contentStore.ts'}</span>
          </button>

          <button
            onClick={handleReset}
            style={{
              background: 'rgba(239, 68, 68, 0.08)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              color: '#ef4444',
              borderRadius: '6px',
              padding: '0.6rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <RotateCcw size={14} />
            <span>Reset Defaults</span>
          </button>

          <a
            href="/"
            style={{
              background: 'rgba(255, 255, 255, 0.04)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(255, 255, 255, 0.8)',
              borderRadius: '6px',
              padding: '0.6rem 1rem',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.8rem',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '0.4rem'
            }}
          >
            <ArrowLeft size={14} />
            <span>View Live Site</span>
          </a>
        </div>
      </header>

      {/* Category Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '0.75rem' }}>
        <button
          onClick={() => setActiveTab('timeline')}
          style={tabButtonStyle(activeTab === 'timeline')}
        >
          <Briefcase size={14} />
          <span>Career Timeline ({content.timeline.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('projects')}
          style={tabButtonStyle(activeTab === 'projects')}
        >
          <Code2 size={14} />
          <span>Featured Projects ({content.projects.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('tech')}
          style={tabButtonStyle(activeTab === 'tech')}
        >
          <Layers size={14} />
          <span>Tech Stack Ratings</span>
        </button>

        <button
          onClick={() => setActiveTab('hero')}
          style={tabButtonStyle(activeTab === 'hero')}
        >
          <Sparkles size={14} />
          <span>Hero Bio</span>
        </button>

        <button
          onClick={() => setActiveTab('socials')}
          style={tabButtonStyle(activeTab === 'socials')}
        >
          <Share2 size={14} />
          <span>Social Connect Links</span>
        </button>
      </div>

      {/* TAB 1: CAREER TIMELINE EDITOR */}
      {activeTab === 'timeline' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0 }}>
              CAREER TIMELINE MILESTONES
            </h2>
            <button
              onClick={handleAddTimeline}
              style={{
                background: 'var(--accent-orange)',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                padding: '0.45rem 0.9rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Plus size={14} />
              <span>Add Career Milestone</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.timeline.map((item, idx) => (
              <div
                key={item.id}
                style={{
                  background: '#090b10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderLeft: `3px solid ${idx === 0 ? '#38bdf8' : 'var(--accent-orange)'}`,
                  borderRadius: '6px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: idx === 0 ? '#38bdf8' : 'var(--accent-orange)', fontWeight: 700 }}>
                    MILESTONE #{idx + 1} {idx === 0 ? '[PRESENT / ACTIVE]' : ''}
                  </span>
                  <button
                    onClick={() => handleDeleteTimeline(item.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                    title="Delete Milestone"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>YEAR / DURATION</label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => handleUpdateTimeline(item.id, { year: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. 2024 – PRESENT"
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>ROLE / DEGREE TITLE</label>
                    <input
                      type="text"
                      value={item.role}
                      onChange={(e) => handleUpdateTimeline(item.id, { role: e.target.value })}
                      style={inputStyle}
                      placeholder="e.g. Senior Full-Stack & AI Engineer"
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={labelStyle}>DESCRIPTION & ACHIEVEMENTS</label>
                  <textarea
                    value={item.description}
                    onChange={(e) => handleUpdateTimeline(item.id, { description: e.target.value })}
                    style={{ ...inputStyle, minHeight: '54px', resize: 'vertical' }}
                    placeholder="Engineering focus and key achievements..."
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: FEATURED PROJECTS EDITOR */}
      {activeTab === 'projects' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0 }}>
              FEATURED PROJECTS BENTO MATRIX
            </h2>
            <button
              onClick={handleAddProject}
              style={{
                background: 'var(--accent-orange)',
                color: '#000000',
                border: 'none',
                borderRadius: '4px',
                padding: '0.45rem 0.9rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem'
              }}
            >
              <Plus size={14} />
              <span>Add Project</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.projects.map((proj, idx) => (
              <div
                key={proj.id}
                style={{
                  background: '#090b10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderLeft: '3px solid var(--accent-orange)',
                  borderRadius: '6px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontSize: '0.72rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)', fontWeight: 700 }}>
                    PROJECT #{idx + 1} — {proj.tag}
                  </span>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer' }}
                    title="Delete Project"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>PROJECT TITLE</label>
                    <input
                      type="text"
                      value={proj.title}
                      onChange={(e) => handleUpdateProject(proj.id, { title: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>TAB TAG BADGE</label>
                    <input
                      type="text"
                      value={proj.tag}
                      onChange={(e) => handleUpdateProject(proj.id, { tag: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>TAGLINE / SUBTITLE</label>
                    <input
                      type="text"
                      value={proj.tagline}
                      onChange={(e) => handleUpdateProject(proj.id, { tagline: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <label style={labelStyle}>PROJECT DESCRIPTION</label>
                  <textarea
                    value={proj.description}
                    onChange={(e) => handleUpdateProject(proj.id, { description: e.target.value })}
                    style={{ ...inputStyle, minHeight: '54px', resize: 'vertical' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>TECH PILLS (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      value={proj.techPills.join(', ')}
                      onChange={(e) =>
                        handleUpdateProject(proj.id, {
                          techPills: e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                        })
                      }
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>GITHUB REPOSITORY URL</label>
                    <input
                      type="text"
                      value={proj.codeUrl}
                      onChange={(e) => handleUpdateProject(proj.id, { codeUrl: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: TECH STACK RATINGS EDITOR */}
      {activeTab === 'tech' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0 }}>
            TECH STACK RATINGS & DOMAINS
          </h2>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {content.techStack.map((domain) => (
              <div
                key={domain.id}
                style={{
                  background: '#090b10',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderLeft: '3px solid var(--accent-orange)',
                  borderRadius: '6px',
                  padding: '1.2rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.85rem'
                }}
              >
                <div style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '1rem', alignItems: 'center' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <label style={labelStyle}>DOMAIN NAME</label>
                    <input
                      type="text"
                      value={domain.domain}
                      onChange={(e) => handleUpdateTechStack(domain.id, { domain: e.target.value })}
                      style={inputStyle}
                    />
                  </div>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                      <span style={{ color: 'rgba(255,255,255,0.5)' }}>RATING</span>
                      <span style={{ color: 'var(--accent-orange)', fontWeight: 700 }}>{domain.percentage}%</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={domain.percentage}
                      onChange={(e) => handleUpdateTechStack(domain.id, { percentage: parseInt(e.target.value, 10) })}
                      style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HERO BIO EDITOR */}
      {activeTab === 'hero' && (
        <div style={{ background: '#090b10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0 }}>
            HERO BIO CONTENT
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>FULL NAME</label>
              <input
                type="text"
                value={content.heroBio.name}
                onChange={(e) => setContent({ ...content, heroBio: { ...content.heroBio, name: e.target.value } })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>ROLE TITLE</label>
              <input
                type="text"
                value={content.heroBio.roleTitle}
                onChange={(e) => setContent({ ...content, heroBio: { ...content.heroBio, roleTitle: e.target.value } })}
                style={inputStyle}
              />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <label style={labelStyle}>BIO SUMMARY PARAGRAPH</label>
            <textarea
              value={content.heroBio.bioSummary}
              onChange={(e) => setContent({ ...content, heroBio: { ...content.heroBio, bioSummary: e.target.value } })}
              style={{ ...inputStyle, minHeight: '80px', resize: 'vertical' }}
            />
          </div>
        </div>
      )}

      {/* TAB 5: SOCIAL LINKS EDITOR */}
      {activeTab === 'socials' && (
        <div style={{ background: '#090b10', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '8px', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
          <h2 style={{ fontSize: '1.2rem', fontFamily: 'var(--font-clash)', color: '#ffffff', margin: 0 }}>
            SOCIAL CONNECT LINKS
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>GITHUB URL</label>
              <input
                type="text"
                value={content.socials.github}
                onChange={(e) => setContent({ ...content, socials: { ...content.socials, github: e.target.value } })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>LINKEDIN URL</label>
              <input
                type="text"
                value={content.socials.linkedin}
                onChange={(e) => setContent({ ...content, socials: { ...content.socials, linkedin: e.target.value } })}
                style={inputStyle}
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>PHONE NUMBER (COPIED ON TAP)</label>
              <input
                type="text"
                value={content.socials.phone || ''}
                onChange={(e) => setContent({ ...content, socials: { ...content.socials, phone: e.target.value } })}
                style={inputStyle}
                placeholder="+91 9876543210"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              <label style={labelStyle}>EMAIL ADDRESS</label>
              <input
                type="text"
                value={content.socials.email}
                onChange={(e) => setContent({ ...content, socials: { ...content.socials, email: e.target.value } })}
                style={inputStyle}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const tabButtonStyle = (isActive: boolean): React.CSSProperties => ({
  background: isActive ? 'rgba(255, 107, 0, 0.15)' : 'rgba(255, 255, 255, 0.03)',
  border: `1px solid ${isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.08)'}`,
  color: isActive ? 'var(--accent-orange)' : 'rgba(255, 255, 255, 0.65)',
  borderRadius: '6px',
  padding: '0.5rem 0.9rem',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.78rem',
  fontWeight: 600,
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  gap: '0.45rem',
  transition: 'all 0.2s ease'
});

const labelStyle: React.CSSProperties = {
  fontSize: '0.68rem',
  color: 'rgba(255, 255, 255, 0.5)',
  fontFamily: 'var(--font-mono)'
};

const inputStyle: React.CSSProperties = {
  background: '#10121a',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  color: '#ffffff',
  padding: '0.45rem 0.75rem',
  borderRadius: '4px',
  fontSize: '0.82rem',
  fontFamily: 'var(--font-satoshi)',
  outline: 'none'
};
