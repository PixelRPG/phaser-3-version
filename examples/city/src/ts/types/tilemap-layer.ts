export interface TilemapLayer {
  /**  layer name (or index) from Tiled */
  name: string;
  collides?: boolean;
  x: number;
  y: number;
  depth: number;
}
