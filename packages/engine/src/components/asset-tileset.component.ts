import { component, boolean, string } from "@javelin/ecs";

export const AssetTileset = {
  key: string,
  url: string,
  tilesetLoaded: boolean,
}

/**
 * The tileset used in tiledmaps
 */
export const AssetTilesetComponent = component(AssetTileset, {tilesetLoaded: false});
