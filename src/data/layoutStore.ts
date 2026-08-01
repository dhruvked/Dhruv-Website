import { ASYMMETRICAL_GRID_TILES, type TileData } from './portfolioData';

const PERSISTENT_STORAGE_KEY = 'dhruv_portfolio_user_layout';

export class LayoutStore {
  private static cachedTiles: TileData[] | null = null;

  public static getLayout(): TileData[] {
    if (this.cachedTiles && this.cachedTiles.length > 0) {
      return this.cachedTiles;
    }

    try {
      const saved = localStorage.getItem(PERSISTENT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          this.cachedTiles = parsed;
          return parsed;
        }
      }
    } catch (e) {
      console.warn('Failed to load layout from localStorage', e);
    }

    this.cachedTiles = ASYMMETRICAL_GRID_TILES;
    return ASYMMETRICAL_GRID_TILES;
  }

  public static updateLayout(newTiles: TileData[]): void {
    this.cachedTiles = newTiles;
    try {
      localStorage.setItem(PERSISTENT_STORAGE_KEY, JSON.stringify(newTiles));
    } catch (e) {
      console.warn('Failed to save layout to localStorage', e);
    }
  }

  public static exportJSON(): string {
    const tiles = this.getLayout();
    return JSON.stringify(tiles, null, 2);
  }

  public static resetToDefault(): TileData[] {
    this.cachedTiles = ASYMMETRICAL_GRID_TILES;
    try {
      localStorage.removeItem(PERSISTENT_STORAGE_KEY);
    } catch (e) {}
    return ASYMMETRICAL_GRID_TILES;
  }
}
