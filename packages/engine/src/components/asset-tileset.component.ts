import { component, boolean, string } from "@javelin/ecs";
import { ComponentType, AssetTileset } from "../types";

/**
 * The tileset used in tiledmaps
 */
export const AssetTilesetComponent = component({
  type: ComponentType.AssetTileset,
  schema: {
    key: string,
    url: string,
    loaded: { type: boolean, defaultValue: false },
  },
  initialize(atlas, data: AssetTileset) {
    atlas.key = data.key;
    atlas.url = data.url;
    atlas.loaded = false;
  },
});
