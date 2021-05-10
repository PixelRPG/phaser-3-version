export interface MapLayer {
  /**  layer name (or index) from Tiled */
  name: string;
  x: number;
  y: number;
  assetMapEntity: number;
  tilesetEntity: number;
  collides?: boolean;
  collisionProperty?: string;
}
