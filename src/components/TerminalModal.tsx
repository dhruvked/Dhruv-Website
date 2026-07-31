import React, { useState, useRef, useEffect } from 'react';
import { Terminal, X, CornerDownLeft } from 'lucide-react';

interface TerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandLog {
  input?: string;
  output: string | React.ReactNode;
  type?: 'cmd' | 'output' | 'error' | 'success';
}

export const TerminalModal: React.FC<TerminalModalProps> = ({ isOpen, onClose }) => {
  const [inputVal, setInputVal] = useState('');
  const [logs, setLogs] = useState<CommandLog[]>([
    {
      output: (
        <div>
          <span style={{ color: 'var(--accent-cyan)' }}>Dhruv Interactive CLI Terminal [v1.0.4]</span>
          <br />
          <span>Type <code style={{ color: 'var(--accent-cyan)' }}>help</code> or <code style={{ color: 'var(--accent-cyan)' }}>projects</code> to execute commands.</span>
        </div>
      ),
      type: 'output'
    }
  ]);

  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  if (!isOpen) return null;

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    const cmd = inputVal.trim().toLowerCase();
    if (!cmd) return;

    const newLogs: CommandLog[] = [...logs, { input: inputVal, output: '', type: 'cmd' }];

    switch (cmd) {
      case 'help':
      case '?':
        newLogs.push({
          output: (
            <div style={{ lineHeight: 1.6 }}>
              <strong>Available CLI Commands:</strong>
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>projects</code> — View active project architecture specs.
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>skills</code> — List technical competencies & stack.
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>contact</code> — Get email & social links.
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>whoami</code> — Display developer identity summary.
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>clear</code> — Clear terminal buffer.
              <br />
              • <code style={{ color: 'var(--accent-cyan)' }}>sudo hire</code> — Unlock contact prompt.
            </div>
          ),
          type: 'output'
        });
        break;

      case 'projects':
        newLogs.push({
          output: (
            <div>
              <span style={{ color: 'var(--accent-cyan)' }}>[1] vot-decart</span> — Realtime WebRTC AI Virtual Try-On (Decart AI Realtime API)
              <br />
              <span style={{ color: 'var(--accent-violet)' }}>[2] clothing</span> — Headless Blender 5.0 (bpy) 3D Mesh Processing Pipeline
              <br />
              <span style={{ color: 'var(--accent-emerald)' }}>[3] Seam</span> — ABDM Ecosystem AI Healthcare Platform & EHR RAG Context Engine
              <br />
              <span style={{ color: 'var(--accent-blue)' }}>[4] Choreo</span> — AI Avatars Platform (OpenAI, Gemini, HeyGen, EKS)
            </div>
          ),
          type: 'output'
        });
        break;

      case 'skills':
        newLogs.push({
          output: (
            <div>
              <strong>Tech Stack Summary:</strong>
              <br />
              • Languages & Web: TypeScript, Python, Next.js, React, Node.js, Express
              <br />
              • AI & Realtime: Decart AI, WebRTC, RAG, Vector Search, LLM Fine-Tuning
              <br />
              • 3D Engineering: Blender 5.0 (bpy), Three.js, WebGL, GLB Asset Pipeline
              <br />
              • Cloud: Docker, Kubernetes (AWS EKS), ECR, PostgreSQL, Drizzle
            </div>
          ),
          type: 'output'
        });
        break;

      case 'whoami':
        newLogs.push({
          output: 'Dhruv — Full Stack AI & 3D Systems Engineer specializing in low-latency WebRTC streams, automated 3D mesh pipelines, and intelligent agent web architectures.',
          type: 'output'
        });
        break;

      case 'contact':
        newLogs.push({
          output: (
            <div>
              📧 Email: <a href="mailto:dhruv@example.com" style={{ color: 'var(--accent-cyan)' }}>Contact via Email</a>
              <br />
              💼 LinkedIn: Full Stack AI Engineer
              <br />
              🐙 GitHub: <a href="https://github.com" target="_blank" rel="noreferrer" style={{ color: 'var(--accent-cyan)' }}>GitHub Profile</a>
            </div>
          ),
          type: 'output'
        });
        break;

      case 'clear':
        setLogs([]);
        setInputVal('');
        return;

      case 'sudo hire':
        newLogs.push({
          output: (
            <div style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>
              🎉 Access Granted! Let's build something exceptional together. Email me directly to schedule a technical chat.
            </div>
          ),
          type: 'success'
        });
        break;

      default:
        newLogs.push({
          output: `Command not found: "${cmd}". Type "help" for a list of valid commands.`,
          type: 'error'
        });
        break;
    }

    setLogs(newLogs);
    setInputVal('');
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 250,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        background: 'rgba(4, 6, 10, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)'
      }}
      onClick={onClose}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: '680px',
          height: '460px',
          display: 'flex',
          flexDirection: 'column',
          border: '1px solid var(--accent-cyan)',
          padding: 0,
          background: '#04060a'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Terminal Title Bar */}
        <div
          style={{
            padding: '0.75rem 1rem',
            background: 'rgba(255, 255, 255, 0.04)',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--accent-cyan)' }}>
            <Terminal size={16} />
            <span>dhruv@developer-shell:~ (zsh)</span>
          </div>

          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-muted)',
              cursor: 'pointer'
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Output Log Area */}
        <div
          style={{
            flex: 1,
            padding: '1.25rem',
            overflowY: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.88rem'
          }}
        >
          {logs.map((log, i) => (
            <div key={i} style={{ marginBottom: '0.85rem' }}>
              {log.input && (
                <div style={{ color: 'var(--accent-cyan)', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span>$</span>
                  <span>{log.input}</span>
                </div>
              )}
              <div
                style={{
                  color: log.type === 'error' ? '#f87171' : log.type === 'success' ? 'var(--accent-emerald)' : 'var(--text-secondary)',
                  paddingLeft: log.input ? '0.8rem' : 0
                }}
              >
                {log.output}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>

        {/* Input Form Bar */}
        <form
          onSubmit={handleCommand}
          style={{
            padding: '0.75rem 1rem',
            borderTop: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(255, 255, 255, 0.02)'
          }}
        >
          <span style={{ color: 'var(--accent-cyan)', fontFamily: 'var(--font-mono)' }}>$</span>
          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            placeholder="Type 'help' or command..."
            style={{
              flex: 1,
              background: 'none',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.9rem'
            }}
            autoFocus
          />
          <button type="submit" style={{ background: 'none', border: 'none', color: 'var(--accent-cyan)', cursor: 'pointer' }}>
            <CornerDownLeft size={16} />
          </button>
        </form>
      </div>
    </div>
  );
};
