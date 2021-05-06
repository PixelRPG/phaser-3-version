import { ComponentProps } from "@javelin/ecs";

export interface MapLayer extends ComponentProps {
  /**  layer name (or index) from Tiled */
  name: string;
  x: number;
  y: number;
  assetMapEntity: number;
  tilesetEntity: number;
}
