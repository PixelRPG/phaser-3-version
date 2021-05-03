import { ComponentProps } from "@javelin/ecs";

export interface MapLayer extends ComponentProps {
  /**  layer name (or index) from Tiled */
  name: string;
  collides?: boolean;
  x: number;
  y: number;
  assetMapEntry: number;
  tilesetEntry: number;
}
