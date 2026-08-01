import React, { useState } from 'react';
import { ArrowLeft, GripVertical } from 'lucide-react';
import type { TileData } from '../data/portfolioData';
import { HeroTile } from './HeroTile';
import { CareerTimelineTile } from './CareerTimelineTile';
import { SocialConnectTile } from './SocialConnectTile';
import { ClockTile } from './ClockTile';
import { TerminalTile } from './TerminalTile';
import { ProjectsTile } from './ProjectsTile';
import { TechStackTile } from './TechStackTile';
import { DeveloperDeskTile } from './DeveloperDeskTile';

interface TileCubeProps {
  tile: TileData;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
  onUpdateGridSpan?: (id: string, newSpan: { colStart?: number; rowStart?: number; colSpan: number; rowSpan: number }) => void;
}

export const TileCube: React.FC<TileCubeProps> = ({
  tile,
  isSelected,
  onSelect,
  onUpdateGridSpan
}) => {
  const [isRotated, setIsRotated] = useState(false);
  const accentColor = tile.front?.accentColor || 'var(--accent-orange)';

  const colStart = tile.gridSpan?.colStart;
  const rowStart = tile.gridSpan?.rowStart;
  const colSpan = Math.max(1, tile.gridSpan?.colSpan || 4);
  const rowSpan = Math.max(1, tile.gridSpan?.rowSpan || 4);

  const handleTileClick = () => {
    if (onSelect) {
      onSelect(tile.id);
    }
  };

  // Extract X, Y coordinates from Mouse or Touch event
  const getCoords = (e: MouseEvent | TouchEvent | React.MouseEvent | React.TouchEvent) => {
    if ('touches' in e && e.touches.length > 0) {
      return { clientX: e.touches[0].clientX, clientY: e.touches[0].clientY };
    }
    const mouseEvt = e as MouseEvent | React.MouseEvent;
    return { clientX: mouseEvt.clientX, clientY: mouseEvt.clientY };
  };

  // Drag Handle Start Handler (Supports Mouse and Touch)
  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect(tile.id);

    const { clientX: startX, clientY: startY } = getCoords(e);
    const initialColStart = colStart || 1;
    const initialRowStart = rowStart || 1;

    const matrixElement = document.querySelector('.monolithic-12x12-matrix') as HTMLElement;
    if (!matrixElement) return;

    const rect = matrixElement.getBoundingClientRect();
    const cellWidth = Math.max(70, rect.width / 12);
    const cellHeight = Math.max(50, rect.height / 12);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();
      const { clientX, clientY } = getCoords(moveEvent);

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const colDelta = Math.round(deltaX / cellWidth);
      const rowDelta = Math.round(deltaY / cellHeight);

      const newColStart = Math.max(1, Math.min(13 - colSpan, initialColStart + colDelta));
      const newRowStart = Math.max(1, Math.min(13 - rowSpan, initialRowStart + rowDelta));

      if (onUpdateGridSpan) {
        onUpdateGridSpan(tile.id, {
          colStart: newColStart,
          rowStart: newRowStart,
          colSpan,
          rowSpan
        });
      }
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove as any);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove as any, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  // Resize Corner Start Handler (Supports Mouse and Touch)
  const handleResizeStart = (e: React.MouseEvent | React.TouchEvent) => {
    e.stopPropagation();
    if (onSelect) onSelect(tile.id);

    const { clientX: startX, clientY: startY } = getCoords(e);
    const initialColSpan = colSpan;
    const initialRowSpan = rowSpan;

    const matrixElement = document.querySelector('.monolithic-12x12-matrix') as HTMLElement;
    if (!matrixElement) return;

    const rect = matrixElement.getBoundingClientRect();
    const cellWidth = Math.max(70, rect.width / 12);
    const cellHeight = Math.max(50, rect.height / 12);

    const handleMove = (moveEvent: MouseEvent | TouchEvent) => {
      if (moveEvent.cancelable) moveEvent.preventDefault();
      const { clientX, clientY } = getCoords(moveEvent);

      const deltaX = clientX - startX;
      const deltaY = clientY - startY;

      const colSpanDelta = Math.round(deltaX / cellWidth);
      const rowSpanDelta = Math.round(deltaY / cellHeight);

      const newColSpan = Math.max(1, Math.min(12, initialColSpan + colSpanDelta));
      const newRowSpan = Math.max(1, Math.min(12, initialRowSpan + rowSpanDelta));

      if (onUpdateGridSpan) {
        onUpdateGridSpan(tile.id, {
          colStart,
          rowStart,
          colSpan: newColSpan,
          rowSpan: newRowSpan
        });
      }
    };

    const handleEnd = () => {
      window.removeEventListener('mousemove', handleMove as any);
      window.removeEventListener('mouseup', handleEnd);
      window.removeEventListener('touchmove', handleMove as any);
      window.removeEventListener('touchend', handleEnd);
    };

    window.addEventListener('mousemove', handleMove as any);
    window.addEventListener('mouseup', handleEnd);
    window.addEventListener('touchmove', handleMove as any, { passive: false });
    window.addEventListener('touchend', handleEnd);
  };

  // Dedicated Hero Tile Renderer
  if (tile.id === 'hero-split-bio') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <HeroTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Career Timeline Renderer
  if (tile.id === 'career-timeline') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <CareerTimelineTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Social Connect Matrix Renderer
  if (tile.id === 'social-connect') {
    return (
      <div
        className={`cube-wrapper cube-wrapper-social-connect ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <SocialConnectTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Clock Tile Renderer
  if (tile.id === 'clock-tile') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <ClockTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Developer Desk Stream Renderer
  if (tile.id === 'developer-desk') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <DeveloperDeskTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Interactive CLI Terminal Sandbox Renderer
  if (tile.id === 'terminal-sandbox') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <TerminalTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Featured Projects Bento Renderer
  if (tile.id === 'featured-projects') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <ProjectsTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Dedicated Tech Stack Matrix Renderer
  if (tile.id === 'tech-stack-matrix') {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div
          onMouseDown={handleDragStart}
          onTouchStart={handleDragStart}
          className="tile-drag-handle"
          title="Touch & Drag to reposition tile"
        >
          <GripVertical size={13} style={{ color: accentColor }} />
          <span>DRAG TILE</span>
        </div>

        <TechStackTile accentColor={accentColor} />

        <div
          onMouseDown={handleResizeStart}
          onTouchStart={handleResizeStart}
          className="tile-resize-handle"
          title="Touch & Drag to resize width/height"
        >
          ◢
        </div>

        <style>{`
          .tile-drag-handle {
            position: absolute;
            top: 4px;
            left: 6px;
            z-index: 80;
            display: flex;
            align-items: center;
            gap: 4px;
            background: rgba(8, 10, 15, 0.85);
            border: 1px solid var(--border-hairline);
            padding: 2px 8px;
            border-radius: 4px;
            font-family: var(--font-mono);
            font-size: 0.65rem;
            color: var(--text-secondary);
            cursor: grab;
            transition: opacity 0.25s ease;
            user-select: none;
            touch-action: none;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-drag-handle,
          .selected-tile-active .tile-drag-handle {
            opacity: 1;
          }
          .tile-drag-handle:active {
            cursor: grabbing;
            border-color: var(--accent-orange);
            background: rgba(255, 107, 0, 0.2);
          }
          .tile-resize-handle {
            position: absolute;
            bottom: 3px;
            right: 4px;
            z-index: 80;
            font-size: 0.8rem;
            color: var(--accent-orange);
            cursor: se-resize;
            user-select: none;
            touch-action: none;
            padding: 4px 6px;
            transition: opacity 0.25s ease, transform 0.2s ease;
            opacity: 0.15;
          }
          .cube-wrapper:hover .tile-resize-handle,
          .selected-tile-active .tile-resize-handle {
            opacity: 1;
          }
          .tile-resize-handle:hover {
            transform: scale(1.3);
            color: var(--accent-orange-bright);
          }
          .selected-tile-active {
            border-color: var(--accent-orange) !important;
            box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
            z-index: 50;
          }
        `}</style>
      </div>
    );
  }

  // Blank Negative Space Tile
  if (tile.isBlank) {
    return (
      <div
        className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
        onClick={handleTileClick}
        style={{
          gridColumnStart: colStart || 'auto',
          gridColumnEnd: `span ${colSpan}`,
          gridRowStart: rowStart || 'auto',
          gridRowEnd: `span ${rowSpan}`,
          cursor: 'pointer'
        }}
      >
        <div className="cube-face cube-face-front cube-face-blank">
          <span style={{ fontSize: '1rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
            [ BLANK ]
          </span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`cube-wrapper ${isSelected ? 'selected-tile-active' : ''}`}
      onClick={handleTileClick}
      onMouseEnter={() => tile.isRotating && setIsRotated(true)}
      onMouseLeave={() => tile.isRotating && setIsRotated(false)}
      style={{
        gridColumnStart: colStart || 'auto',
        gridColumnEnd: `span ${colSpan}`,
        gridRowStart: rowStart || 'auto',
        gridRowEnd: `span ${rowSpan}`,
        cursor: 'pointer'
      }}
    >
      <div
        onMouseDown={handleDragStart}
        onTouchStart={handleDragStart}
        className="tile-drag-handle"
        title="Touch & Drag to reposition tile"
      >
        <GripVertical size={13} style={{ color: accentColor }} />
        <span>DRAG TILE</span>
      </div>

      <div className={`cube-inner ${isRotated ? 'is-rotated' : ''}`}>
        {/* Front Face */}
        <div
          className="cube-face cube-face-front"
          style={{
            borderTop: `2px solid ${accentColor}`,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '2.2rem 1.25rem 1.25rem 1.25rem',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.4rem' }}>
            {tile.front?.subtitle && (
              <span className="tech-badge" style={{ color: accentColor, borderColor: `${accentColor}40` }}>
                {tile.front.subtitle}
              </span>
            )}
          </div>

          <div style={{ margin: 'auto 0' }}>
            <h2 style={{ fontSize: '1.35rem', fontFamily: 'var(--font-heading)', color: '#ffffff', letterSpacing: '0.02em', marginBottom: '0.2rem' }}>
              {tile.front?.title || tile.id}
            </h2>
            {tile.front?.description && (
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                {tile.front.description}
              </p>
            )}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: 'var(--text-muted)' }}>
              POS: [{colStart || 'auto'},{rowStart || 'auto'}] | {colSpan}C × {rowSpan}R
            </span>
            {tile.isRotating && (
              <span style={{ fontSize: '0.68rem', fontFamily: 'var(--font-mono)', color: accentColor }}>
                3D ROTATABLE
              </span>
            )}
          </div>
        </div>

        {/* Side/Back Face */}
        <div
          className="cube-face cube-face-side"
          style={{
            borderTop: `3px solid ${accentColor}`,
            padding: '2.2rem 1.5rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            background: '#07090e'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '0.85rem' }}>
              <div>
                <span style={{ fontSize: '0.7rem', fontFamily: 'var(--font-mono)', color: accentColor, letterSpacing: '0.08em' }}>
                  {tile.side?.subtitle || 'ENGINEERING ARCHITECTURE'}
                </span>
                <h2 style={{ fontSize: '1.4rem', fontFamily: 'var(--font-heading)', color: '#ffffff', fontWeight: 800, margin: '0.1rem 0' }}>
                  {tile.side?.title || `${tile.front?.title || tile.id}`}
                </h2>
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRotated(false);
                }}
                className="back-btn-side"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-hairline)',
                  color: 'var(--text-primary)',
                  fontSize: '0.74rem',
                  fontFamily: 'var(--font-mono)',
                  padding: '0.3rem 0.75rem',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  transition: 'all 0.25s ease'
                }}
              >
                <ArrowLeft size={13} style={{ color: accentColor }} />
                <span>Back</span>
              </button>
            </div>

            {tile.side?.details && (
              <ul style={{ paddingLeft: '1.1rem', display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
                {tile.side.details.map((detail, idx) => (
                  <li key={idx} style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', lineHeight: 1.4 }}>
                    {detail}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <div
        onMouseDown={handleResizeStart}
        onTouchStart={handleResizeStart}
        className="tile-resize-handle"
        title="Touch & Drag to resize width/height"
      >
        ◢
      </div>

      <style>{`
        .tile-drag-handle {
          position: absolute;
          top: 4px;
          left: 6px;
          z-index: 80;
          display: flex;
          align-items: center;
          gap: 4px;
          background: rgba(8, 10, 15, 0.85);
          border: 1px solid var(--border-hairline);
          padding: 2px 8px;
          border-radius: 4px;
          font-family: var(--font-mono);
          font-size: 0.65rem;
          color: var(--text-secondary);
          cursor: grab;
          transition: opacity 0.25s ease;
          user-select: none;
          touch-action: none;
          opacity: 0.15;
        }
        .cube-wrapper:hover .tile-drag-handle,
        .selected-tile-active .tile-drag-handle {
          opacity: 1;
        }
        .tile-drag-handle:active {
          cursor: grabbing;
          border-color: var(--accent-orange);
          background: rgba(255, 107, 0, 0.2);
        }
        .tile-resize-handle {
          position: absolute;
          bottom: 3px;
          right: 4px;
          z-index: 80;
          font-size: 0.8rem;
          color: var(--accent-orange);
          cursor: se-resize;
          user-select: none;
          touch-action: none;
          padding: 4px 6px;
          transition: opacity 0.25s ease, transform 0.2s ease;
          opacity: 0.15;
        }
        .cube-wrapper:hover .tile-resize-handle,
        .selected-tile-active .tile-resize-handle {
          opacity: 1;
        }
        .tile-resize-handle:hover {
          transform: scale(1.3);
          color: var(--accent-orange-bright);
        }
        .selected-tile-active {
          border-color: var(--accent-orange) !important;
          box-shadow: inset 0 0 20px rgba(255, 107, 0, 0.15), 0 0 25px rgba(255, 107, 0, 0.3) !important;
          z-index: 50;
        }
      `}</style>
    </div>
  );
};
