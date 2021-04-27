import { createComponentType, boolean, array } from "@javelin/ecs";
import { ComponentType, AssetTileset } from "../types";
import { createObjectType } from "./schemata";

/**
 * The tileset images used in tiledmaps
 */
export const AssetTilesetsComponent = createComponentType({
  type: ComponentType.AssetTileset,
  schema: {
    tilesets: array<AssetTileset>(createObjectType<AssetTileset>()),

    loaded: { type: boolean, defaultValue: false },
  },
  /**
   * @param atlas
   * @param key Asset key, e.g. used on preloading
   * @param url Url to the image file
   * @param name Name of the image tileset in tiled
   * @param xhrSettings
   */
  initialize(atlas, tilesets: AssetTileset[]) {
    atlas.tilesets = tilesets;
  },
});
