import React, { useState, useEffect, useRef } from 'react';
import { type TileData } from '../data/portfolioData';
import { LayoutStore } from '../data/layoutStore';
import { TileCube } from './TileCube';
import { GridBuilderStudio } from './GridBuilderStudio';

export const MonolithicGrid: React.FC = () => {
  const [tiles, setTiles] = useState<TileData[]>(() => LayoutStore.getLayout());
  const [selectedTileId, setSelectedTileId] = useState<string | null>('hero-split-bio');
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Automatically persist layout to localStorage and LayoutStore on every tile drag/resize change
  useEffect(() => {
    LayoutStore.updateLayout(tiles);
  }, [tiles]);

  const handleSaveLayout = () => {
    LayoutStore.updateLayout(tiles);
  };

  const handleResetLayout = () => {
    const defaultTiles = LayoutStore.resetToDefault();
    setTiles(defaultTiles);
  };

  const handleAddTile = () => {
    const newId = `custom-tile-${Date.now().toString().slice(-4)}`;
    const newTile: TileData = {
      id: newId,
      gridSpan: { colStart: 1, rowStart: 1, colSpan: 4, rowSpan: 4 },
      isRotating: true,
      type: 'project',
      front: {
        title: `Tile ${tiles.length + 1}`,
        subtitle: 'CUSTOM TILE',
        description: 'Drag handle top or drag bottom-right corner to resize.',
        accentColor: '#ff6b00'
      },
      side: {
        title: `Tile ${tiles.length + 1} (Side)`,
        details: ['Custom specification point']
      }
    };
    const updated = [...tiles, newTile];
    setTiles(updated);
    setSelectedTileId(newId);
  };

  const handleUpdateTile = (id: string, updatedFields: Partial<TileData>) => {
    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updatedFields } : t))
    );
  };

  const checkCollision = (targetId: string, candidateSpan: { colStart?: number; rowStart?: number; colSpan: number; rowSpan: number }) => {
    const colStart = candidateSpan.colStart || 1;
    const colEnd = colStart + candidateSpan.colSpan;
    const rowStart = candidateSpan.rowStart || 1;
    const rowEnd = rowStart + candidateSpan.rowSpan;

    return tiles.some((t) => {
      if (t.id === targetId) return false;
      const tColStart = t.gridSpan?.colStart || 1;
      const tColEnd = tColStart + (t.gridSpan?.colSpan || 4);
      const tRowStart = t.gridSpan?.rowStart || 1;
      const tRowEnd = tRowStart + (t.gridSpan?.rowSpan || 4);

      return (
        colStart < tColEnd &&
        colEnd > tColStart &&
        rowStart < tRowEnd &&
        rowEnd > tRowStart
      );
    });
  };

  const handleUpdateGridSpan = (id: string, newSpan: { colStart?: number; rowStart?: number; colSpan: number; rowSpan: number }) => {
    if (checkCollision(id, newSpan)) {
      setTiles((prev) =>
        prev.map((t) => {
          if (t.id === id) {
            return {
              ...t,
              gridSpan: {
                ...newSpan,
                colStart: newSpan.colStart,
                rowStart: newSpan.rowStart
              }
            };
          }
          return t;
        })
      );
      return;
    }

    setTiles((prev) =>
      prev.map((t) => (t.id === id ? { ...t, gridSpan: newSpan } : t))
    );
  };

  const handleDeleteTile = (id: string) => {
    const filtered = tiles.filter((t) => t.id !== id);
    setTiles(filtered);
    if (selectedTileId === id) {
      setSelectedTileId(filtered[0]?.id || null);
    }
  };

  // True 2D Column-Height Page Partitioning Engine
  const pages: TileData[][] = [];
  let currentPage: TileData[] = [];
  let columnMaxRow = new Array(12).fill(0);

  tiles.forEach((tile) => {
    const colStart = (tile.gridSpan?.colStart || 1) - 1;
    const colSpan = tile.gridSpan?.colSpan || 4;
    const rowSpan = tile.gridSpan?.rowSpan || 4;
    const colEnd = Math.min(12, colStart + colSpan);

    let currentMaxInCols = 0;
    for (let c = colStart; c < colEnd; c++) {
      currentMaxInCols = Math.max(currentMaxInCols, columnMaxRow[c]);
    }

    if (currentMaxInCols + rowSpan > 12 && currentPage.length > 0) {
      pages.push(currentPage);
      currentPage = [tile];
      columnMaxRow = new Array(12).fill(0);
      for (let c = colStart; c < colEnd; c++) {
        columnMaxRow[c] = rowSpan;
      }
    } else {
      currentPage.push(tile);
      for (let c = colStart; c < colEnd; c++) {
        columnMaxRow[c] = currentMaxInCols + rowSpan;
      }
    }
  });

  if (currentPage.length > 0) {
    pages.push(currentPage);
  }

  return (
    <main style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Floating Drag & Resize Builder Studio Tool */}
      <GridBuilderStudio
        tiles={tiles}
        selectedTileId={selectedTileId}
        onSelectTile={setSelectedTileId}
        onAddTile={handleAddTile}
        onUpdateTile={handleUpdateTile}
        onDeleteTile={handleDeleteTile}
        onResetLayout={handleResetLayout}
        onSaveLayout={handleSaveLayout}
      />

      {/* 12-Row Page Snap Container */}
      <div ref={containerRef} className="page-snap-container">
        {pages.map((pageTiles, pageIndex) => (
          <section key={`page-${pageIndex}`} className="grid-12row-page">
            <div className="monolithic-12x12-matrix">
              {pageTiles.map((tile) => (
                <TileCube
                  key={tile.id}
                  tile={tile}
                  isSelected={selectedTileId === tile.id}
                  onSelect={setSelectedTileId}
                  onUpdateGridSpan={handleUpdateGridSpan}
                />
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
};
