import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, Sparkles, Terminal, Activity, Layers, Zap } from 'lucide-react';

interface HeroProps {
  onOpenTerminal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenTerminal }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframeMode, setWireframeMode] = useState(true);
  const [rotationSpeed, setRotationSpeed] = useState(1);
  const [fps, setFps] = useState(60);

  // Interactive 3D Mesh Canvas Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 500);
    let height = (canvas.height = 380);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 380;
    };

    window.addEventListener('resize', handleResize);

    // Generate 3D Torus / Avatar Garment Mesh Vertices
    const nodes: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];
    const R = 110;
    const r = 45;
    const segmentsU = 16;
    const segmentsV = 12;

    for (let i = 0; i < segmentsU; i++) {
      const u = (i / segmentsU) * Math.PI * 2;
      for (let j = 0; j < segmentsV; j++) {
        const v = (j / segmentsV) * Math.PI * 2;
        const x = (R + r * Math.cos(v)) * Math.cos(u);
        const y = (R + r * Math.cos(v)) * Math.sin(u);
        const z = r * Math.sin(v);
        nodes.push({ x, y, z, ox: x, oy: y, oz: z });
      }
    }

    let angleX = 0.3;
    let angleY = 0.5;
    let mouseX = 0;
    let mouseY = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = (e.clientX - rect.left - width / 2) * 0.001;
      mouseY = (e.clientY - rect.top - height / 2) * 0.001;
    };

    canvas.addEventListener('mousemove', handleMouseMove);

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle Background Grid Lines
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
      ctx.lineWidth = 1;
      const step = 30;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += step) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Rotate Nodes
      angleX += 0.008 * rotationSpeed + mouseY;
      angleY += 0.012 * rotationSpeed + mouseX;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected: { x: number; y: number; z: number }[] = [];

      nodes.forEach((node) => {
        // Rotate Y
        let x = node.ox * cosY - node.oz * sinY;
        let z = node.ox * sinY + node.oz * cosY;

        // Rotate X
        let y = node.oy * cosX - z * sinX;
        z = node.oy * sinX + z * cosX;

        // Perspective Projection
        const distance = 320;
        const fov = distance / (distance + z);
        const px = width / 2 + x * fov;
        const py = height / 2 + y * fov;

        projected.push({ x: px, y: py, z });
      });

      // Draw Mesh Wireframes & Edges
      if (wireframeMode) {
        ctx.lineWidth = 1;
        for (let i = 0; i < segmentsU; i++) {
          for (let j = 0; j < segmentsV; j++) {
            const curr = i * segmentsV + j;
            const nextV = i * segmentsV + ((j + 1) % segmentsV);
            const nextU = ((i + 1) % segmentsU) * segmentsV + j;

            const pCurr = projected[curr];
            const pNextV = projected[nextV];
            const pNextU = projected[nextU];

            // Edge 1
            const alpha1 = Math.max(0.1, (pCurr.z + 100) / 200);
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha1 * 0.4})`;
            ctx.beginPath();
            ctx.moveTo(pCurr.x, pCurr.y);
            ctx.lineTo(pNextV.x, pNextV.y);
            ctx.stroke();

            // Edge 2
            ctx.strokeStyle = `rgba(138, 43, 226, ${alpha1 * 0.35})`;
            ctx.beginPath();
            ctx.moveTo(pCurr.x, pCurr.y);
            ctx.lineTo(pNextU.x, pNextU.y);
            ctx.stroke();
          }
        }
      }

      // Draw Glowing Vertex Points
      projected.forEach((p) => {
        const radius = Math.max(1, ((p.z + 100) / 200) * 3);
        const alpha = Math.max(0.2, (p.z + 100) / 200);

        ctx.fillStyle = p.z > 0 ? `rgba(0, 240, 255, ${alpha})` : `rgba(138, 43, 226, ${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
    };
  }, [wireframeMode, rotationSpeed]);

  return (
    <section
      style={{
        paddingTop: '8rem',
        paddingBottom: '5rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Radial Glow */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: '800px',
          height: '500px',
          background: 'radial-gradient(ellipse at center, rgba(0, 240, 255, 0.12) 0%, rgba(138, 43, 226, 0.08) 45%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0
        }}
      />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '3.5rem',
            alignItems: 'center'
          }}
          className="hero-grid"
        >
          {/* Left Column: Intro & Content */}
          <div>
            {/* Availability Badge */}
            <div className="badge badge-live" style={{ marginBottom: '1.5rem' }}>
              <span className="dot-pulse" />
              <span>Available for AI Architecture & 3D Engineering</span>
            </div>

            <h1
              style={{
                fontSize: 'clamp(2.5rem, 5vw, 3.8rem)',
                letterSpacing: '-0.03em',
                marginBottom: '1.25rem',
                lineHeight: 1.1
              }}
            >
              Hi, I'm <span className="gradient-text">Dhruv</span>.
              <br />
              Full Stack AI & 3D Systems Engineer.
            </h1>

            <p
              style={{
                fontSize: '1.125rem',
                color: 'var(--text-secondary)',
                marginBottom: '2rem',
                maxWidth: '540px'
              }}
            >
              Building real-time WebRTC AI transformations (<code style={{ color: 'var(--accent-cyan)' }}>vot-decart</code>),
              automated 3D Blender mesh pipelines (<code style={{ color: 'var(--accent-violet)' }}>bpy</code>), and high-performance intelligent web applications.
            </p>

            {/* CTA Action Buttons */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                marginBottom: '3rem'
              }}
            >
              <a href="#projects" className="btn btn-primary">
                Explore Projects <ArrowRight size={16} />
              </a>

              <a href="#lab" className="btn btn-secondary">
                <Sparkles size={16} style={{ color: 'var(--accent-cyan)' }} />
                Interactive Lab
              </a>

              <button onClick={onOpenTerminal} className="btn btn-outline">
                <Terminal size={16} /> CLI Terminal
              </button>
            </div>

            {/* Quick Spec Metrics Bar */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '1.5rem',
                paddingTop: '1.5rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
              className="hero-metrics"
            >
              <div>
                <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-cyan)' }}>
                  &lt;150ms
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>WebRTC Stream Latency</div>
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-violet)' }}>
                  100%
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Automated 3D Pipeline</div>
              </div>

              <div>
                <div className="font-mono" style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--accent-emerald)' }}>
                  100+
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Live AI Avatar Sessions</div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive 3D Canvas Preview */}
          <div className="glass-card" style={{ padding: '1.25rem' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '0.75rem',
                fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-cyan)' }}>
                <Activity size={14} />
                <span>3D GARMENT MESH INTERACTION</span>
              </div>
              <div style={{ color: 'var(--text-muted)' }}>
                {fps} FPS | ROTATION: {rotationSpeed.toFixed(1)}x
              </div>
            </div>

            {/* Canvas Viewport */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'var(--radius-sm)',
                background: '#04060a',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                overflow: 'hidden'
              }}
            >
              <canvas ref={canvasRef} style={{ width: '100%', height: '380px', display: 'block', cursor: 'grab' }} />
              
              <div
                style={{
                  position: 'absolute',
                  bottom: '10px',
                  left: '12px',
                  fontSize: '0.75rem',
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-mono)',
                  pointerEvents: 'none'
                }}
              >
                [Move cursor to orbit 3D Mesh]
              </div>
            </div>

            {/* Canvas Controls */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border-subtle)'
              }}
            >
              <button
                onClick={() => setWireframeMode(!wireframeMode)}
                className="btn btn-outline"
                style={{ padding: '0.35rem 0.75rem', fontSize: '0.78rem' }}
              >
                <Layers size={13} /> {wireframeMode ? 'Wireframe: ON' : 'Wireframe: OFF'}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem' }}>
                <Zap size={13} style={{ color: 'var(--accent-cyan)' }} />
                <span style={{ color: 'var(--text-muted)' }}>Speed:</span>
                <input
                  type="range"
                  min="0"
                  max="3"
                  step="0.5"
                  value={rotationSpeed}
                  onChange={(e) => setRotationSpeed(parseFloat(e.target.value))}
                  style={{ width: '80px', accentColor: 'var(--accent-cyan)' }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
        @media (max-width: 480px) {
          .hero-metrics {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </section>
  );
};
