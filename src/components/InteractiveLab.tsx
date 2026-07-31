import React, { useState } from 'react';
import { Sliders, Cpu, Activity, Play, RefreshCw, CheckCircle2, FileText, Database } from 'lucide-react';

export const InteractiveLab: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'3d' | 'webrtc' | 'rag'>('3d');

  // 3D Shader State
  const [meshDensity, setMeshDensity] = useState(16);
  const [smoothShading, setSmoothShading] = useState(true);
  const [recalculateNormals, setRecalculateNormals] = useState(true);

  // WebRTC Simulator State
  const [frameRate, setFrameRate] = useState(30);
  const [resolution, setResolution] = useState<'720p' | '1080p'>('720p');

  // RAG Search State
  const [query, setQuery] = useState('Patient HbA1c lab history & allergies');
  const [isSearching, setIsSearching] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(
    'Synthesized Summary: Patient exhibits stable HbA1c levels (5.8%) over 6 months. No severe adverse drug reactions logged in ABDM profile. Recommended routine follow-up in 90 days.'
  );

  const handleRunRAG = () => {
    setIsSearching(true);
    setSearchResult(null);
    setTimeout(() => {
      setIsSearching(false);
      setSearchResult(
        `Synthesized Summary for "${query}": Match found in 3 EHR encounters via vector similarity (score: 0.94). EHR #1042 indicates clear clinical notes with no active contraindications.`
      );
    }, 600);
  };

  return (
    <section id="lab" className="section-padding" style={{ background: 'rgba(12, 16, 23, 0.6)' }}>
      <div className="container">
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div className="badge" style={{ marginBottom: '1rem' }}>
            <Sliders size={14} />
            <span>INTERACTIVE TECH LAB</span>
          </div>

          <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            Experiment with <span className="gradient-text-cyan">Live AI & 3D Widgets</span>
          </h2>

          <p style={{ color: 'var(--text-secondary)', maxWidth: '640px', margin: '0 auto', fontSize: '1.05rem' }}>
            Test live parameters simulating 3D mesh automation, WebRTC frame processing, and ABDM vector query synthesis.
          </p>
        </div>

        {/* Tab Buttons */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1rem',
            marginBottom: '2rem',
            flexWrap: 'wrap'
          }}
        >
          <button
            onClick={() => setActiveTab('3d')}
            className={`btn ${activeTab === '3d' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Cpu size={16} /> 3D Mesh Inspector (Blender `bpy`)
          </button>

          <button
            onClick={() => setActiveTab('webrtc')}
            className={`btn ${activeTab === 'webrtc' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Activity size={16} /> WebRTC Latency Benchmark
          </button>

          <button
            onClick={() => setActiveTab('rag')}
            className={`btn ${activeTab === 'rag' ? 'btn-primary' : 'btn-secondary'}`}
          >
            <Database size={16} /> Healthcare RAG Vector Query
          </button>
        </div>

        {/* Widget Canvas Card */}
        <div className="glass-card" style={{ padding: '2rem', minHeight: '380px' }}>
          {/* TAB 1: 3D MESH INSPECTOR */}
          {activeTab === '3d' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }} className="lab-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <Cpu size={15} /> BLENDER BPY AUTOMATION SIMULATOR
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>3D Garment Mesh Transformation</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
                  Simulates the headless Python process executed by Blender 5.0 in the <code style={{ color: 'var(--accent-cyan)' }}>clothing</code> repository.
                </p>

                {/* Controls */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem', color: 'var(--text-primary)' }}>
                      <span>Mesh Subdivisions (Polygon Resolution)</span>
                      <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{meshDensity * meshDensity} Polys</span>
                    </label>
                    <input
                      type="range"
                      min="8"
                      max="32"
                      step="4"
                      value={meshDensity}
                      onChange={(e) => setMeshDensity(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={smoothShading}
                        onChange={(e) => setSmoothShading(e.target.checked)}
                        style={{ accentColor: 'var(--accent-cyan)' }}
                      />
                      <span>Smooth Shading (`bpy.ops.object.shade_smooth`)</span>
                    </label>
                  </div>

                  <div style={{ display: 'flex', gap: '1.5rem' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={recalculateNormals}
                        onChange={(e) => setRecalculateNormals(e.target.checked)}
                        style={{ accentColor: 'var(--accent-cyan)' }}
                      />
                      <span>Recalculate Outside Normals</span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Preview Box */}
              <div
                style={{
                  background: '#04060a',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
                  <span>STATUS: READY</span>
                  <span>FORMAT: GLB 3D MESH</span>
                </div>

                {/* Simulated Wireframe Display */}
                <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                  <div
                    style={{
                      width: '120px',
                      height: '120px',
                      margin: '0 auto',
                      borderRadius: smoothShading ? '50%' : '12px',
                      border: `${recalculateNormals ? '2px' : '1px'} dashed var(--accent-cyan)`,
                      background: 'radial-gradient(circle, rgba(0, 240, 255, 0.15) 0%, transparent 70%)',
                      boxShadow: smoothShading ? '0 0 25px rgba(0, 240, 255, 0.3)' : 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <span className="font-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-cyan)' }}>
                      {meshDensity}x{meshDensity} GRID
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)' }}>
                  <span>NORMALS: {recalculateNormals ? 'VALIDATED' : 'RAW'}</span>
                  <span>SHADOWS: {smoothShading ? 'SMOOTH' : 'FLAT'}</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: WEBRTC LATENCY SIMULATOR */}
          {activeTab === 'webrtc' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }} className="lab-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <Activity size={15} /> DECART REALTIME API WEBRTC BENCHMARK
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Real-time Video Try-On Latency</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
                  Simulates frame transport latency for live WebRTC AI video-to-video processing in <code style={{ color: 'var(--accent-cyan)' }}>vot-decart</code>.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div>
                    <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.88rem', marginBottom: '0.4rem' }}>
                      <span>Stream Frame Rate</span>
                      <span className="font-mono" style={{ color: 'var(--accent-cyan)' }}>{frameRate} FPS</span>
                    </label>
                    <input
                      type="range"
                      min="15"
                      max="60"
                      step="15"
                      value={frameRate}
                      onChange={(e) => setFrameRate(parseInt(e.target.value))}
                      style={{ width: '100%', accentColor: 'var(--accent-cyan)' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '0.88rem', marginBottom: '0.4rem', display: 'block' }}>Video Resolution</label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => setResolution('720p')}
                        className={`btn ${resolution === '720p' ? 'btn-primary' : 'btn-outline'}`}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      >
                        720p (Low Latency)
                      </button>
                      <button
                        onClick={() => setResolution('1080p')}
                        className={`btn ${resolution === '1080p' ? 'btn-primary' : 'btn-outline'}`}
                        style={{ padding: '0.4rem 1rem', fontSize: '0.85rem' }}
                      >
                        1080p (High Detail)
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benchmark Latency Card */}
              <div
                style={{
                  background: '#04060a',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontSize: '0.85rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={16} /> PIPELINE HEALTHY
                </div>

                <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
                  <div className="font-mono" style={{ fontSize: '3rem', fontWeight: 800, color: 'var(--accent-cyan)', lineHeight: 1 }}>
                    {resolution === '720p' ? Math.round(110 + (60 - frameRate) * 0.8) : Math.round(145 + (60 - frameRate) * 0.9)} ms
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                    End-to-End WebRTC Frame Latency
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--text-secondary)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>MODEL: lucy_2_rt</span>
                  <span>ENHANCE: ENABLED</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HEALTHCARE RAG VECTOR QUERY */}
          {activeTab === 'rag' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', alignItems: 'center' }} className="lab-grid">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)', marginBottom: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}>
                  <Database size={15} /> ABDM HEALTHCARE VECTOR SEARCH
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>EHR Vector Synthesis (`Seam`)</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.94rem', marginBottom: '1.5rem' }}>
                  Demonstrates how clinical queries retrieve context vectors and generate patient record summaries.
                </p>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div>
                    <label style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'block', marginBottom: '0.4rem' }}>
                      Select or enter clinical query:
                    </label>
                    <input
                      type="text"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        borderRadius: 'var(--radius-sm)',
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        fontFamily: 'var(--font-body)',
                        fontSize: '0.9rem'
                      }}
                    />
                  </div>

                  <button onClick={handleRunRAG} className="btn btn-primary" style={{ alignSelf: 'flex-start' }} disabled={isSearching}>
                    {isSearching ? <RefreshCw size={16} className="spin" /> : <Play size={16} />}
                    {isSearching ? 'Synthesizing...' : 'Execute Vector RAG Query'}
                  </button>
                </div>
              </div>

              {/* RAG Result Output */}
              <div
                style={{
                  background: '#04060a',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '1.5rem',
                  minHeight: '260px',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}
              >
                <div style={{ fontSize: '0.8rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-emerald)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <FileText size={15} /> ABDM PATIENT RECORD CONTEXT
                </div>

                <div style={{ margin: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: 1.6 }}>
                  {isSearching ? (
                    <div style={{ textAlign: 'center', color: 'var(--accent-cyan)' }}>Searching pgvector index...</div>
                  ) : (
                    searchResult
                  )}
                </div>

                <div style={{ fontSize: '0.78rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', display: 'flex', justifyContent: 'space-between' }}>
                  <span>SIMILARITY: 0.94 (Cosine)</span>
                  <span>ENCRYPTION: AES-256</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .spin {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          100% { transform: rotate(360deg); }
        }
        @media (max-width: 860px) {
          .lab-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};
