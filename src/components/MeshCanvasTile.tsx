import React, { useEffect, useRef, useState } from 'react';
import { Activity, Layers } from 'lucide-react';

export const MeshCanvasTile: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [wireframe, setWireframe] = useState(true);
  const [fps, setFps] = useState(60);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || 400);
    let height = (canvas.height = 240);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = 240;
    };

    window.addEventListener('resize', handleResize);

    const nodes: { x: number; y: number; z: number; ox: number; oy: number; oz: number }[] = [];
    const R = 80;
    const r = 35;
    const segmentsU = 14;
    const segmentsV = 10;

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

    let angleX = 0.4;
    let angleY = 0.6;
    let lastTime = performance.now();
    let frameCount = 0;

    const render = (time: number) => {
      frameCount++;
      if (time - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      angleX += 0.008;
      angleY += 0.012;

      const cosX = Math.cos(angleX);
      const sinX = Math.sin(angleX);
      const cosY = Math.cos(angleY);
      const sinY = Math.sin(angleY);

      const projected: { x: number; y: number; z: number }[] = [];

      nodes.forEach((node) => {
        let x = node.ox * cosY - node.oz * sinY;
        let z = node.ox * sinY + node.oz * cosY;

        let y = node.oy * cosX - z * sinX;
        z = node.oy * sinX + z * cosX;

        const distance = 280;
        const fov = distance / (distance + z);
        const px = width / 2 + x * fov;
        const py = height / 2 + y * fov;

        projected.push({ x: px, y: py, z });
      });

      if (wireframe) {
        ctx.lineWidth = 1;
        for (let i = 0; i < segmentsU; i++) {
          for (let j = 0; j < segmentsV; j++) {
            const curr = i * segmentsV + j;
            const nextV = i * segmentsV + ((j + 1) % segmentsV);
            const pCurr = projected[curr];
            const pNextV = projected[nextV];

            const alpha = Math.max(0.1, (pCurr.z + 100) / 200);
            ctx.strokeStyle = `rgba(255, 107, 0, ${alpha * 0.45})`;
            ctx.beginPath();
            ctx.moveTo(pCurr.x, pCurr.y);
            ctx.lineTo(pNextV.x, pNextV.y);
            ctx.stroke();
          }
        }
      }

      projected.forEach((p) => {
        const radius = Math.max(1, ((p.z + 100) / 200) * 2.5);
        const alpha = Math.max(0.25, (p.z + 100) / 200);
        ctx.fillStyle = p.z > 0 ? `rgba(255, 107, 0, ${alpha})` : `rgba(255, 255, 255, ${alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [wireframe]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem', fontFamily: 'var(--font-mono)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--accent-orange)' }}>
          <Activity size={14} />
          <span>3D GARMENT CANVAS</span>
        </div>
        <span style={{ color: 'var(--text-muted)' }}>{fps} FPS</span>
      </div>

      <div style={{ position: 'relative', height: '220px', background: '#020305', border: '1px solid var(--border-hairline)', borderRadius: '4px', overflow: 'hidden' }}>
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.78rem' }}>
        <span className="tech-badge">3D Pipeline</span>
        <button
          onClick={() => setWireframe(!wireframe)}
          style={{ background: 'none', border: 'none', color: 'var(--accent-orange)', cursor: 'pointer', fontFamily: 'var(--font-mono)', display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.76rem' }}
        >
          <Layers size={13} /> {wireframe ? 'Wireframe: ON' : 'Wireframe: OFF'}
        </button>
      </div>
    </div>
  );
};
