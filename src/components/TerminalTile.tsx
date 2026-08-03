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
  const [currentAccent, setCurrentAccent] = useState(accentColor);
  const [isMatrixMode, setIsMatrixMode] = useState(false);
  const [history, setHistory] = useState<CommandHistory[]>([
    {
      command: 'dhruv-kedia --info',
      output: (
        <div style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.5 }}>
          <div>Dhruv Kedia | Full-Stack & AI Systems Engineer</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', marginTop: '0.25rem' }}>
            Type <span style={{ color: accentColor, fontWeight: 'bold' }}>'help'</span> to see all available CLI commands.
          </div>
        </div>
      )
    }
  ]);

  const [cmdHistoryIndex, setCmdHistoryIndex] = useState<number>(-1);
  const [enteredCmds, setEnteredCmds] = useState<string[]>(['dhruv-kedia --info']);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Sync prop accentColor if updated externally
  useEffect(() => {
    setCurrentAccent(accentColor);
  }, [accentColor]);

  // Auto-scroll inside terminal container ONLY when user enters new commands
  useEffect(() => {
    if (history.length > 1) {
      terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const changeGlobalTheme = (colorName: string): { success: boolean; hex: string; message: string } => {
    const themes: Record<string, string> = {
      orange: '#ff6b00',
      cyan: '#00f0ff',
      emerald: '#10b981',
      violet: '#a855f7',
      magenta: '#ff007f',
      gold: '#eab308'
    };

    const targetHex = themes[colorName.toLowerCase()];
    if (targetHex) {
      document.documentElement.style.setProperty('--accent-orange', targetHex);
      setCurrentAccent(targetHex);
      return {
        success: true,
        hex: targetHex,
        message: `[THEME CHANGED] Switched portfolio theme to ${colorName.toUpperCase()} (${targetHex})`
      };
    }
    return {
      success: false,
      hex: '',
      message: `Theme '${colorName}' not found. Available themes: orange, cyan, emerald, violet, magenta, gold.`
    };
  };

  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputVal.trim();
    if (!trimmed) return;

    const lower = trimmed.toLowerCase();
    let responseNode: React.ReactNode = null;

    // Command Parser
    if (lower === 'help' || lower === '?') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', color: 'rgba(255, 255, 255, 0.85)' }}>
          <div style={{ fontWeight: 'bold', color: currentAccent }}>AVAILABLE CLI COMMANDS:</div>

          <div style={{ display: 'grid', gridTemplateColumns: '130px 1fr', gap: '0.35rem 0.6rem', fontSize: '0.72rem', marginLeft: '0.4rem' }}>
            <span style={{ color: currentAccent, fontWeight: 'bold' }}>ask &lt;query&gt;</span>
            <span style={{ color: 'var(--text-muted)' }}>Ask AI agent questions about Dhruv's background & experience</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>resume</span>
            <span style={{ color: 'var(--text-muted)' }}>View 1-page ASCII CV overview in terminal</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>download</span>
            <span style={{ color: 'var(--text-muted)' }}>Download official PDF resume (Dhruv_Kedia_Resume.pdf)</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>theme &lt;color&gt;</span>
            <span style={{ color: 'var(--text-muted)' }}>Switch site theme (orange, cyan, emerald, violet, magenta, gold)</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>ls</span>
            <span style={{ color: 'var(--text-muted)' }}>List virtual filesystem documents</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>cat &lt;file&gt;</span>
            <span style={{ color: 'var(--text-muted)' }}>Print file content (about.md, experience.log, projects.json)</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>skills</span>
            <span style={{ color: 'var(--text-muted)' }}>View programming languages & AI stack breakdown</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>projects</span>
            <span style={{ color: 'var(--text-muted)' }}>List flagship engineering applications & awards</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>ping</span>
            <span style={{ color: 'var(--text-muted)' }}>Test network latency telemetry to production server</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>status</span>
            <span style={{ color: 'var(--text-muted)' }}>Display system health, region, and uptime</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>matrix</span>
            <span style={{ color: 'var(--text-muted)' }}>Toggle 8-bit digital rain visualizer stream</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>contact</span>
            <span style={{ color: 'var(--text-muted)' }}>Display email, phone & social connect links</span>

            <span style={{ color: currentAccent, fontWeight: 'bold' }}>clear</span>
            <span style={{ color: 'var(--text-muted)' }}>Clear terminal screen history</span>
          </div>
        </div>
      );
    } else if (lower.startsWith('ask ')) {
      const query = lower.replace('ask ', '').trim();
      let answerText = '';

      if (query.includes('hire') || query.includes('why')) {
        answerText = 'Dhruv combines deep AI engineering (Decart AI, WebRTC, LLMs, RAG) with production-grade full-stack delivery (React 19, TypeScript, AWS EKS). He builds systems focused on sub-100ms task routing, 60 FPS video pipelines, and high reliability.';
      } else if (query.includes('choreo') || query.includes('work') || query.includes('experience')) {
        answerText = 'Full Stack AI Engineer at Choreo, LLC (Remote). Engineered real-time AI Virtual Try-On (Decart AI + WebRTC), 3D Blender (bpy) automation pipelines, interactive AI avatars (OpenAI, Gemini, HeyGen for 100+ live sessions), and AWS EKS cloud infrastructure.';
      } else if (query.includes('webrtc') || query.includes('realtime') || query.includes('try-on')) {
        answerText = 'Architected a 60 FPS WebRTC video stream processing pipeline integrated with Decart AI Realtime API for live camera video-to-video garment transformation.';
      } else if (query.includes('umass') || query.includes('education') || query.includes('degree')) {
        answerText = 'BS in Computer Science from University of Massachusetts, Amherst (Sep 2019 – May 2023). Recipient of the Best Project Award 2022 at Manning CICS.';
      } else if (query.includes('skills') || query.includes('tech')) {
        answerText = 'TypeScript, React 19, Next.js, Node.js, Python, Decart AI Realtime API, WebRTC, PyTorch, OpenAI/Gemini APIs, RAG, AWS (EKS/ECR), Docker, Kubernetes, & Headless Blender (bpy).';
      } else {
        answerText = `AI Agent Query Response: Dhruv Kedia is a Full-Stack & Distributed AI Systems Engineer based in Kolkata, India. He holds a BS in Computer Science from UMass Amherst and specializes in realtime AI agent architectures & WebRTC streaming.`;
      }

      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div style={{ color: currentAccent, fontWeight: 'bold' }}>🤖 AI AGENT RESPONSE:</div>
          <div style={{ color: 'rgba(255, 255, 255, 0.9)', lineHeight: 1.5, paddingLeft: '0.5rem' }}>{answerText}</div>
        </div>
      );
    } else if (lower.startsWith('theme ')) {
      const colorName = lower.replace('theme ', '').trim();
      const res = changeGlobalTheme(colorName);
      responseNode = (
        <div style={{ color: res.success ? res.hex : '#ef4444', fontWeight: 600 }}>
          {res.message}
        </div>
      );
    } else if (lower === 'resume' || lower === 'cat resume.txt' || lower === 'cat resume.pdf') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', background: 'rgba(255, 255, 255, 0.02)', padding: '0.75rem', borderRadius: '4px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
          <div style={{ color: currentAccent, fontWeight: 'bold' }}>DHRUV KEDIA — CURRICULUM VITAE (2026)</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Full-Stack & Distributed AI Systems Engineer | Kolkata, WB, India</div>
          <div style={{ margin: '0.2rem 0', color: 'rgba(255, 255, 255, 0.85)' }}>
            <div>• <strong style={{ color: currentAccent }}>Choreo, LLC (Aug 2025 – Present):</strong> Full Stack AI Engineer</div>
            <div style={{ fontSize: '0.7rem', paddingLeft: '0.8rem', color: 'var(--text-muted)' }}>Real-time AI Virtual Try-On (Decart AI + WebRTC), 3D Blender (bpy) pipelines, interactive AI avatars (100+ live sessions), AWS EKS/ECR.</div>

            <div>• <strong style={{ color: '#38bdf8' }}>Consync Infra (Aug 2023 – Aug 2025):</strong> Manager in Information Systems</div>
            <div style={{ fontSize: '0.7rem', paddingLeft: '0.8rem', color: 'var(--text-muted)' }}>Construction site ERP labor & inventory tracking across 4+ sites, reducing reporting latency by 85%.</div>

            <div>• <strong style={{ color: '#10b981' }}>Gamut Systems (May 2022 – Aug 2022):</strong> Database Management Intern</div>
            <div style={{ fontSize: '0.7rem', paddingLeft: '0.8rem', color: 'var(--text-muted)' }}>Automated ERP data migration pipelines for 5+ client projects (&lt;1% downtime).</div>

            <div>• <strong style={{ color: '#a855f7' }}>UMass Amherst (Sep 2019 – May 2023):</strong> BS in Computer Science</div>
            <div style={{ fontSize: '0.7rem', paddingLeft: '0.8rem', color: 'var(--text-muted)' }}>Awarded Best Project 2022 in Manning CICS for MIDI Hardware Audio Sampler.</div>
          </div>
          <div style={{ fontSize: '0.7rem', color: currentAccent }}>Type 'download' to download full PDF resume.</div>
        </div>
      );
    } else if (lower === 'download' || lower === 'download resume') {
      const link = document.createElement('a');
      link.href = '/Dhruv_Kedia_Resume.pdf';
      link.download = 'Dhruv_Kedia_Resume.pdf';
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      responseNode = (
        <div style={{ color: '#10b981', fontWeight: 600 }}>
          [SUCCESS] Download initiated for 'Dhruv_Kedia_Resume.pdf' 📥
        </div>
      );
    } else if (lower === 'ls' || lower === 'dir') {
      responseNode = (
        <div style={{ display: 'flex', gap: '1.2rem', color: '#38bdf8', fontWeight: 600 }}>
          <span>about.md</span>
          <span>experience.log</span>
          <span>projects.json</span>
          <span>skills.txt</span>
          <span>contact.cfg</span>
          <span>resume.pdf</span>
        </div>
      );
    } else if (lower.startsWith('cat ')) {
      const fileName = lower.replace('cat ', '').trim();
      if (fileName === 'about.md') {
        responseNode = (
          <div style={{ color: 'rgba(255, 255, 255, 0.85)', lineHeight: 1.45 }}>
            Full-Stack & Distributed AI Systems Engineer based in Kolkata, India. Specializing in high-performance web platforms, scalable microservices, and real-time AI agent architectures. BS in Computer Science from UMass Amherst.
          </div>
        );
      } else if (fileName === 'experience.log') {
        responseNode = (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem', color: 'rgba(255, 255, 255, 0.85)' }}>
            <div><span style={{ color: currentAccent }}>[2025-PRES]</span> Full Stack AI Engineer @ Choreo, LLC (Decart AI, WebRTC, Blender bpy, AWS EKS)</div>
            <div><span style={{ color: '#38bdf8' }}>[2023-2025]</span> IS Manager @ Consync Infra (ERP labor/inventory tracking across 4+ sites)</div>
            <div><span style={{ color: '#10b981' }}>[2022-2022]</span> DB Intern @ Gamut Systems (ERP migration pipelines & query tuning)</div>
          </div>
        );
      } else if (fileName === 'projects.json') {
        responseNode = (
          <pre style={{ color: '#10b981', fontFamily: 'var(--font-mono)', fontSize: '0.7rem' }}>
{JSON.stringify([
  { id: "p1", name: "SEAM", type: "AI Healthcare Platform (ABDM Integration)" },
  { id: "p2", name: "SAMPLER", type: "MIDI Hardware Audio Sampler (Manning CICS Best Project Award)" },
  { id: "p3", name: "3D PIPELINE", type: "Headless Blender Python bpy Automation" }
], null, 2)}
          </pre>
        );
      } else if (fileName === 'skills.txt') {
        responseNode = (
          <div style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            TypeScript, JavaScript, Python, React Native, React 19, Next.js, Node.js, FastAPI, PostgreSQL, MongoDB, Decart AI Realtime, WebRTC, PyTorch, AWS EKS, Docker, Kubernetes.
          </div>
        );
      } else if (fileName === 'contact.cfg') {
        responseNode = (
          <div style={{ color: 'rgba(255, 255, 255, 0.85)' }}>
            Email: dhruvkedia2@gmail.com | Phone: +91 9007153222 | GitHub: github.com/dhruvked | LinkedIn: linkedin.com/in/dhruvkedia
          </div>
        );
      } else {
        responseNode = <div style={{ color: '#ef4444' }}>cat: {fileName}: No such file or directory. Try 'ls'.</div>;
      }
    } else if (lower === 'ping') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
          <div>PING dhruv-kedia.dev (76.76.21.21): 56 data bytes</div>
          <div>64 bytes from 76.76.21.21: icmp_seq=1 ttl=116 time=34.2 ms</div>
          <div>64 bytes from 76.76.21.21: icmp_seq=2 ttl=116 time=31.8 ms</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem', marginTop: '0.2rem' }}>
            --- dhruv-kedia.dev ping statistics --- 2 packets transmitted, 2 received, 0.0% packet loss, rtt min/avg/max = 31.8/33.0/34.2 ms
          </div>
        </div>
      );
    } else if (lower === 'status') {
      const nowUtc = new Date().toUTCString();
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', color: 'rgba(255, 255, 255, 0.85)' }}>
          <div style={{ color: currentAccent, fontWeight: 'bold' }}>[SYSTEM TELEMETRY STATUS]</div>
          <div>Status: <span style={{ color: '#10b981', fontWeight: 'bold' }}>🟢 ONLINE (99.98% Uptime)</span></div>
          <div>Server Region: <span style={{ color: '#38bdf8' }}>Washington, D.C., USA (iad1)</span></div>
          <div>Production Build: <span style={{ color: 'var(--text-muted)' }}>v2.6.0-main (Vercel Edge)</span></div>
          <div>UTC Telemetry Time: <span style={{ color: 'var(--text-muted)' }}>{nowUtc}</span></div>
        </div>
      );
    } else if (lower === 'matrix') {
      setIsMatrixMode(!isMatrixMode);
      responseNode = (
        <div style={{ color: '#10b981', fontWeight: 600 }}>
          {isMatrixMode ? '[MATRIX RAIN DISABLED]' : '[MATRIX RAIN STREAM LAUNCHED 🟢] Type matrix again to exit.'}
        </div>
      );
    } else if (lower === 'skills') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          <div><span style={{ color: currentAccent }}>[Programming]:</span> TypeScript, JavaScript, Python, SQL, HTML, CSS</div>
          <div><span style={{ color: '#38bdf8' }}>[Backend/Data]:</span> Node.js, Express, React, React Native, Next.js, PostgreSQL, MongoDB</div>
          <div><span style={{ color: '#10b981' }}>[AI & Realtime]:</span> Decart AI Realtime API, WebRTC, OpenAI, Gemini, HeyGen, RAG</div>
          <div><span style={{ color: '#a855f7' }}>[Cloud/DevOps]:</span> AWS (EKS/ECR), Docker, Kubernetes, CI/CD, Headless Blender (bpy)</div>
        </div>
      );
    } else if (lower === 'projects') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
          <div><span style={{ color: currentAccent, fontWeight: 'bold' }}>1. Seam:</span> AI Healthcare Platform (ABDM Ecosystem Integration & EMR Pipelines)</div>
          <div><span style={{ color: '#38bdf8', fontWeight: 'bold' }}>2. Sampler Project:</span> MIDI Hardware Audio Sampler (Manning CICS Best Project 2022 Award)</div>
          <div><span style={{ color: '#10b981', fontWeight: 'bold' }}>3. 3D Asset Pipeline:</span> Automated Blender mesh recalculation & GLB alignment</div>
        </div>
      );
    } else if (lower === 'contact') {
      responseNode = (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          <div><span style={{ color: currentAccent }}>Email:</span> dhruvkedia2@gmail.com</div>
          <div><span style={{ color: '#38bdf8' }}>Phone:</span> +91 9007153222</div>
          <div><span style={{ color: '#10b981' }}>GitHub:</span> github.com/dhruvked</div>
          <div><span style={{ color: '#a855f7' }}>LinkedIn:</span> linkedin.com/in/dhruvkedia</div>
        </div>
      );
    } else if (lower === 'about') {
      responseNode = (
        <div style={{ lineHeight: 1.45, color: 'rgba(255, 255, 255, 0.85)' }}>
          Full-Stack & Distributed AI Systems Engineer based in Kolkata, India. Specializing in high-performance web platforms, scalable microservices, and real-time AI agent architectures. BS in Computer Science from UMass Amherst.
        </div>
      );
    } else if (lower === 'whoami') {
      responseNode = (
        <div style={{ color: '#10b981' }}>
          guest@dhruv-kedia-matrix [AUTHENTICATED VISITOR]
        </div>
      );
    } else if (lower === 'sudo') {
      responseNode = (
        <div style={{ color: '#ef4444' }}>
          Permission denied: Dhruv Kedia is root administrator here! 🚀 Try 'ask', 'resume', or 'theme cyan'.
        </div>
      );
    } else if (lower === 'clear' || lower === 'cls') {
      setHistory([]);
      setInputVal('');
      return;
    } else {
      responseNode = (
        <div style={{ color: '#ef4444' }}>
          Command not recognized: '{trimmed}'. Type <span style={{ color: currentAccent, fontWeight: 'bold' }}>'help'</span> or <span style={{ color: currentAccent, fontWeight: 'bold' }}>'ask &lt;question&gt;'</span> for available commands.
        </div>
      );
    }

    setHistory((prev) => [...prev, { command: trimmed, output: responseNode }]);
    setEnteredCmds((prev) => [...prev, trimmed]);
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
      {/* Clean Minimal Terminal Window Header Bar */}
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
          <Terminal size={12} style={{ color: currentAccent }} />
          <span>bash — dhruv-kedia@terminal</span>
        </div>

        <div style={{ fontSize: '0.6rem', color: currentAccent, fontWeight: 600 }}>
          {isMatrixMode ? 'MATRIX STREAMING' : 'LIVE CLI'}
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
          fontSize: '0.75rem',
          position: 'relative'
        }}
      >
        {/* Matrix Digital Rain Animation Overlay */}
        {isMatrixMode && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background: 'rgba(4, 4, 6, 0.85)',
              color: '#10b981',
              fontSize: '0.65rem',
              overflow: 'hidden',
              padding: '0.5rem',
              lineHeight: 1.2,
              opacity: 0.8,
              zIndex: 5
            }}
          >
            <div>01000100 01001000 01010010 01010101 01010110 // DHRUV KEDIA MATRIX</div>
            <div>01010111 01000101 01000010 01010010 01010100 01000011 // WEBRTC STREAM OK</div>
            <div>01000100 01000101 01000011 01000001 01010010 01010100 // DECART AI REALTIME READY</div>
            <div style={{ color: currentAccent }}>&gt;&gt; SYSTEM ACTIVE // Type 'matrix' to toggle off &lt;&lt;</div>
          </div>
        )}

        {history.map((item, idx) => (
          <div key={`cmd-${idx}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ color: currentAccent, fontWeight: 'bold' }}>$</span>
              <span style={{ color: '#ffffff', fontWeight: 600 }}>{item.command}</span>
            </div>
            <div style={{ paddingLeft: '0.85rem' }}>{item.output}</div>
          </div>
        ))}

        {/* Live Input Command Prompt Line */}
        <form onSubmit={handleCommandSubmit} style={{ display: 'flex', alignItems: 'center', gap: '0.45rem', marginTop: '0.2rem' }}>
          <span style={{ color: currentAccent, fontWeight: 'bold' }}>$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type 'help' or 'ask why hire'..."
            style={{
              flex: 1,
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: '#ffffff',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              caretColor: currentAccent
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
