import { component, number, string } from "@javelin/ecs";

export const Tileset = {
  key: string,
  name: string,
  assetMapEntity: number,
}

/**
 * The tileset image used in tiledmaps
 */
export const TilesetComponent = component(Tileset);
