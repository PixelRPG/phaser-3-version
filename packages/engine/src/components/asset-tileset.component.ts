import { component, boolean, string } from "@javelin/ecs";

export const AssetTileset = {
  key: string,
  url: string,
  loaded: boolean,
}

/**
 * The tileset used in tiledmaps
 */
export const AssetTilesetComponent = component(AssetTileset, {loaded: false});
