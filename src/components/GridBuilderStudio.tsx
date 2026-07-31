import React, { useState } from 'react';
import { Plus, Trash2, Copy, Check, Sliders, ChevronRight, ChevronLeft, RotateCcw } from 'lucide-react';
import type { TileData } from '../data/portfolioData';

interface GridBuilderStudioProps {
  tiles: TileData[];
  selectedTileId: string | null;
  onSelectTile: (id: string | null) => void;
  onAddTile: () => void;
  onUpdateTile: (id: string, updatedTile: Partial<TileData>) => void;
  onDeleteTile: (id: string) => void;
  onResetLayout: () => void;
}

export const GridBuilderStudio: React.FC<GridBuilderStudioProps> = ({
  tiles,
  selectedTileId,
  onSelectTile,
  onAddTile,
  onUpdateTile,
  onDeleteTile,
  onResetLayout
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const [copied, setCopied] = useState(false);

  const activeTile = tiles.find((t) => t.id === selectedTileId);

  const handleExportJSON = () => {
    const jsonString = JSON.stringify(tiles, null, 2);
    navigator.clipboard.writeText(jsonString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        right: '20px',
        zIndex: 9999,
        fontFamily: 'var(--font-body)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.5rem'
      }}
    >
      {/* Toggle Studio Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          background: '#0e1017',
          border: '1px solid var(--border-orange)',
          color: 'var(--accent-orange)',
          padding: '0.6rem 0.85rem',
          borderRadius: '6px',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.4rem',
          fontSize: '0.82rem',
          fontWeight: 600,
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.6)'
        }}
      >
        <Sliders size={15} />
        <span>{isOpen ? 'Hide Studio' : 'Tile Builder'}</span>
        {isOpen ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
      </button>

      {/* Editor Panel Drawer */}
      {isOpen && (
        <div
          style={{
            width: '320px',
            maxHeight: '85vh',
            overflowY: 'auto',
            background: '#090b10',
            border: '1px solid var(--border-hairline)',
            borderRadius: '8px',
            padding: '1.1rem',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.8)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--border-hairline)', paddingBottom: '0.65rem' }}>
            <div>
              <h3 style={{ fontSize: '0.95rem', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
                TILE BUILDER STUDIO
              </h3>
              <span style={{ fontSize: '0.68rem', color: '#10b981', fontFamily: 'var(--font-mono)' }}>
                ● EDITS AUTO-SAVED
              </span>
            </div>

            <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              {tiles.length} TILES
            </span>
          </div>

          {/* Quick Action Buttons */}
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={onAddTile}
              className="btn btn-primary"
              style={{ flex: 1, fontSize: '0.74rem', padding: '0.4rem', justifyContent: 'center' }}
            >
              <Plus size={13} />
              <span>Add Tile</span>
            </button>

            <button
              onClick={handleExportJSON}
              className="btn btn-outline"
              style={{ fontSize: '0.74rem', padding: '0.4rem', borderColor: 'var(--border-hairline)' }}
              title="Copy JSON Layout to Clipboard"
            >
              {copied ? <Check size={13} style={{ color: '#10b981' }} /> : <Copy size={13} />}
              <span>{copied ? 'Copied!' : 'Export'}</span>
            </button>

            <button
              onClick={onResetLayout}
              className="btn btn-outline"
              style={{ fontSize: '0.74rem', padding: '0.4rem', borderColor: 'var(--border-hairline)', color: '#ef4444' }}
              title="Reset Layout to Default"
            >
              <RotateCcw size={13} />
              <span>Reset</span>
            </button>
          </div>

          {/* Selected Tile Inspector Form */}
          {activeTile ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', background: 'rgba(255,255,255,0.02)', padding: '0.85rem', borderRadius: '6px', border: '1px solid var(--border-hairline)' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)', color: 'var(--accent-orange)' }}>
                  EDITING: {activeTile.id}
                </span>

                <button
                  onClick={() => onDeleteTile(activeTile.id)}
                  style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '0.2rem' }}
                  title="Delete Tile"
                >
                  <Trash2 size={14} />
                </button>
              </div>

              {/* Title Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>TITLE</label>
                <input
                  type="text"
                  value={activeTile.front?.title || ''}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      front: { ...activeTile.front, title: e.target.value }
                    })
                  }
                  style={inputStyle}
                  placeholder="Tile Title"
                />
              </div>

              {/* Subtitle Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>SUBTITLE / CATEGORY</label>
                <input
                  type="text"
                  value={activeTile.front?.subtitle || ''}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      front: { ...activeTile.front, subtitle: e.target.value }
                    })
                  }
                  style={inputStyle}
                  placeholder="Subtitle"
                />
              </div>

              {/* Description Input */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>DESCRIPTION</label>
                <textarea
                  value={activeTile.front?.description || ''}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      front: { ...activeTile.front, description: e.target.value }
                    })
                  }
                  style={{ ...inputStyle, minHeight: '54px', resize: 'vertical' }}
                  placeholder="Description text"
                />
              </div>

              {/* Position Coordinates (Col Start & Row Start) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>COL START (1-12)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={activeTile.gridSpan?.colStart || 1}
                    onChange={(e) =>
                      onUpdateTile(activeTile.id, {
                        gridSpan: { ...activeTile.gridSpan, colSpan: activeTile.gridSpan?.colSpan || 4, rowSpan: activeTile.gridSpan?.rowSpan || 4, colStart: parseInt(e.target.value, 10) }
                      })
                    }
                    style={inputStyle}
                  />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <label style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ROW START (1-12)</label>
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={activeTile.gridSpan?.rowStart || 1}
                    onChange={(e) =>
                      onUpdateTile(activeTile.id, {
                        gridSpan: { ...activeTile.gridSpan, colSpan: activeTile.gridSpan?.colSpan || 4, rowSpan: activeTile.gridSpan?.rowSpan || 4, rowStart: parseInt(e.target.value, 10) }
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>

              {/* Column Span Slider (1 to 12 Cols) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>WIDTH (COLUMN SPAN)</span>
                  <span style={{ color: 'var(--accent-orange)' }}>{activeTile.gridSpan?.colSpan || 4} Cols</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={activeTile.gridSpan?.colSpan || 4}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      gridSpan: { ...activeTile.gridSpan, colSpan: parseInt(e.target.value, 10), rowSpan: activeTile.gridSpan?.rowSpan || 4 }
                    })
                  }
                  style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                />
              </div>

              {/* Row Span Slider (1 to 12 Rows) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontFamily: 'var(--font-mono)' }}>
                  <span style={{ color: 'var(--text-muted)' }}>HEIGHT (ROW SPAN)</span>
                  <span style={{ color: 'var(--accent-orange)' }}>{activeTile.gridSpan?.rowSpan || 4} Rows</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="12"
                  value={activeTile.gridSpan?.rowSpan || 4}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      gridSpan: { ...activeTile.gridSpan, colSpan: activeTile.gridSpan?.colSpan || 4, rowSpan: parseInt(e.target.value, 10) }
                    })
                  }
                  style={{ width: '100%', accentColor: 'var(--accent-orange)' }}
                />
              </div>

              {/* Accent Color Picker */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>ACCENT COLOR</label>
                <input
                  type="color"
                  value={activeTile.front?.accentColor || '#ff6b00'}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      front: { ...activeTile.front, accentColor: e.target.value }
                    })
                  }
                  style={{ width: '32px', height: '26px', border: 'none', background: 'transparent', cursor: 'pointer' }}
                />
              </div>

              {/* 3D Rotation Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>3D FLIP ROTATION</label>
                <input
                  type="checkbox"
                  checked={!!activeTile.isRotating}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      isRotating: e.target.checked
                    })
                  }
                  style={{ accentColor: 'var(--accent-orange)', cursor: 'pointer' }}
                />
              </div>

              {/* Is Blank Tile Checkbox */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <label style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>BLANK SPACE TILE</label>
                <input
                  type="checkbox"
                  checked={!!activeTile.isBlank}
                  onChange={(e) =>
                    onUpdateTile(activeTile.id, {
                      isBlank: e.target.checked
                    })
                  }
                  style={{ accentColor: 'var(--accent-orange)', cursor: 'pointer' }}
                />
              </div>
            </div>
          ) : (
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', textAlign: 'center', padding: '1rem 0' }}>
              Click any tile or drag its handle to reposition and resize visually.
            </div>
          )}

          {/* Tiles List Selector */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
              GRID TILES LIST
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem', maxHeight: '160px', overflowY: 'auto' }}>
              {tiles.map((t) => (
                <button
                  key={t.id}
                  onClick={() => onSelectTile(t.id)}
                  style={{
                    background: selectedTileId === t.id ? 'rgba(255, 107, 0, 0.18)' : 'rgba(255, 255, 255, 0.02)',
                    border: `1px solid ${selectedTileId === t.id ? 'var(--accent-orange)' : 'var(--border-hairline)'}`,
                    color: selectedTileId === t.id ? 'var(--accent-orange)' : 'var(--text-secondary)',
                    padding: '0.35rem 0.6rem',
                    borderRadius: '4px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between'
                  }}
                >
                  <span>{t.front?.title || t.id}</span>
                  <span style={{ opacity: 0.6 }}>[{t.gridSpan?.colStart || 'a'},{t.gridSpan?.rowStart || 'a'}] {t.gridSpan?.colSpan || 4}c/{t.gridSpan?.rowSpan || 4}r</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const inputStyle: React.CSSProperties = {
  background: '#12141c',
  border: '1px solid var(--border-hairline)',
  color: '#ffffff',
  padding: '0.4rem 0.6rem',
  borderRadius: '4px',
  fontSize: '0.8rem',
  outline: 'none'
};
