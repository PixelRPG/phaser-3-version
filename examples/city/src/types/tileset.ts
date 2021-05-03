import { ComponentProps } from "@javelin/ecs";

export interface Tileset extends ComponentProps {
  /** The key used for asset preloading */
  key: string;
  /** The name used in tiled */
  name: string;
  assetMapEntry: number;
}
