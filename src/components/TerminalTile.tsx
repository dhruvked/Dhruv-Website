import React, { useState, useRef, useEffect } from 'react';
import { Terminal, CornerDownLeft } from 'lucide-react';

interface TerminalTileProps {
  accentColor: string;
}

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

export const TerminalTile: React.FC<TerminalTileProps> = ({ accentColor }) => {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'dhruv-kedia --info',
      output: (
        <div style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
          <div>Dhruv Kedia | Full-Stack & AI Systems Engineer</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.2rem' }}>
            Type <span style={{ color: accentColor, fontWeight: 'bold' }}>'help'</span> to see all available commands.
          </div>
        </div>
      )
    }
  ]);

  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1);
  const [enteredCmds, setEnteredCmds] = useState<string[]>(['dhruv-kedia --info']);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-scroll inside terminal container ONLY when user enters new commands (prevents page jump on load)
  useEffect(() => {
    if (history.length > 1) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim().toLowerCase();
    if (!trimmed) return;

    let responseNode: React.ReactNode = null;

    switch (trimmed) {
      case 'help':
      case '?':
        responseNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            <div>Available Commands:</div>
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', gap: '0.4rem', fontSize: '0.72rem', marginLeft: '0.5rem' }}>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>skills</span>
              <span style={{ color: 'var(--text-muted)' }}>View programming languages & AI stack</span>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>projects</span>
              <span style={{ color: 'var(--text-muted)' }}>List flagship engineering applications</span>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>contact</span>
              <span style={{ color: 'var(--text-muted)' }}>Display email & social connect links</span>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>about</span>
              <span style={{ color: 'var(--text-muted)' }}>Read bio summary</span>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>whoami</span>
              <span style={{ color: 'var(--text-muted)' }}>Show current visitor session identity</span>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>clear</span>
              <span style={{ color: 'var(--text-muted)' }}>Clear terminal screen history</span>
            </div>
          </div>
        );
        break;

      case 'skills':
        responseNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div><span style={{ color: accentColor }}>[Programming]:</span> TypeScript, JavaScript, Python, SQL, HTML, CSS</div>
            <div><span style={{ color: '#38bdf8' }}>[Backend/Data]:</span> Node.js, Express, React, React Native, Next.js, PostgreSQL, MongoDB</div>
            <div><span style={{ color: '#10b981' }}>[AI & Realtime]:</span> Decart AI Realtime API, WebRTC, OpenAI, Gemini, HeyGen, RAG</div>
            <div><span style={{ color: '#a855f7' }}>[Cloud/DevOps]:</span> AWS (EKS/ECR), Docker, Kubernetes, CI/CD, Headless Blender (bpy)</div>
          </div>
        );
        break;

      case 'projects':
        responseNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <div><span style={{ color: accentColor, fontWeight: 'bold' }}>1. Seam:</span> AI Healthcare Platform (ABDM Ecosystem Integration & EMR Pipelines)</div>
            <div><span style={{ color: '#38bdf8', fontWeight: 'bold' }}>2. Sampler Project:</span> MIDI Hardware Audio Sampler (Manning CICS Best Project 2022 Award)</div>
            <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>3. 3D Asset Pipeline:</span> Automated Blender mesh recalculation & GLB alignment</div>
          </div>
        );
        break;

      case 'contact':
        responseNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
            <div><span style={{ color: accentColor }}>Email:</span> dhruvkedia2@gmail.com</div>
            <div><span style={{ color: '#38bdf8' }}>GitHub:</span> github.com/dhruvked</div>
            <div><span style={{ color: '#10b981' }}>LinkedIn:</span> linkedin.com/in/dhruvkedia</div>
          </div>
        );
        break;

      case 'about':
        responseNode = (
          <div style={{ lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.85)' }}>
            Full-Stack & Distributed AI Systems Engineer. Specializing in high-performance web platforms, scalable microservices, and real-time AI agent architectures.
          </div>
        );
        break;

      case 'whoami':
        responseNode = (
          <div style={{ color: '#10b981' }}>
            guest@dhruv-kedia-matrix [AUTHENTICATED VISITOR]
          </div>
        );
        break;

      case 'sudo':
        responseNode = (
          <div style={{ color: '#ef4444' }}>
            Permission denied: Dhruv Kedia is root administrator here! 🚀
          </div>
        );
        break;

      case 'clear':
      case 'cls':
        setHistory([]);
        setInputVal('');
        return;

      default:
        responseNode = (
          <div style={{ color: '#ef4444' }}>
            Command not recognized: '{trimmed}'. Type <span style={{ color: accentColor, fontWeight: 'bold' }}>'help'</span> for available commands.
          </div>
        );
        break;
    }

    setHistory((prev) => [...prev, { command: inputVal, output: responseNode }]);
    setEnteredCmds((prev) => [...prev, inputVal]);
    setCmdHistoryIndex(-1);
    setInputVal('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (enteredCmds.length === 0) return;
      const nextIdx = cmdHistoryIndex === -1 ? enteredCmds.length - 1 : Math.max(0, cmdHistoryIndex - 1);
      setCmdHistoryIndex(nextIdx);
      setInputVal(enteredCmds[nextIdx] || '');
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cmdHistoryIndex === -1) return;
      const nextIdx = cmdHistoryIndex + 1;
      if (nextIdx >= enteredCmds.length) {
        setCmdHistoryIndex(-1);
        setInputVal('');
      } else {
        setCmdHistoryIndex(nextIdx);
        setInputVal(enteredCmds[nextIdx] || '');
      }
    }
  };

  return (
    <div
      onClick={handleTerminalClick}
      style={{
        width: '100%',
        height: '100%',
        background: '#07090e',
        border: '1px solid rgba(255, 255, 255, 0.04)',
        borderRadius: '8px',
        padding: '0',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        fontFamily: 'var(--font-mono)',
        position: 'relative'
      }}
    >
      {/* Clean Minimal Terminal Window Header Bar (No Red/Yellow/Green Dots) */}
      <div
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
          padding: '0.55rem 0.9rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          userSelect: 'none'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.68rem', color: 'var(--text-muted)' }}>
          <Terminal size={12} style={{ color: accentColor }} />
          <span>bash — dhruv-kedia@terminal</span>
        </div>

        <div style={{ fontSize: '0.6rem', color: accentColor, fontWeight: 600 }}>
          LIVE CLI
        </div>
      </div>

      {/* Terminal Output Stream Area with Custom Scrollbar */}
      <div
        className="terminal-stream-scroll"
        style={{
          flex: 1,
          padding: '0.9rem 1.1rem',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '0.65rem',
          fontSize: '0.75rem'
        }}
      >
        {history.map((item, idx) => (
          <div key={`cmd-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ color: accentColor, fontWeight: 'bold' }}>$</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{item.command}</span>
            </div>
            <div style={{ paddingLeft: '0.85rem' }}>{item.output}</div>
          </div>
        ))}

        {/* Live Input Command Prompt Line */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.2rem' }}>
          <span style={{ color: accentColor, fontWeight: 'bold' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or command..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              caretColor: accentColor
            }}
          />
          <CornerDownLeft size={11} style={{ color: 'var(--text-muted)', opacity: 0.5 }} />
        </form>

        <div ref={terminalEndRef} />
      </div>

      <style>{`
        .terminal-stream-scroll::-webkit-scrollbar {
          width: 4px;
        }
        .terminal-stream-scroll::-webkit-scrollbar-track {
          background: rgba(4, 4, 6, 0.5);
        }
        .terminal-stream-scroll::-webkit-scrollbar-thumb {
          background: rgba(255, 107, 0, 0.3);
          border-radius: 3px;
        }
        .terminal-stream-scroll::-webkit-scrollbar-thumb:hover {
          background: #ff6b00;
        }
      `}</style>
    </div>
  );
};
