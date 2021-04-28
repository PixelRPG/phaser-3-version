import { createComponentType, boolean, string, number } from "@javelin/ecs";
import { ComponentType, Tileset } from "../types";

/**
 * The tileset used in tiledmaps
 */
export const TilesetComponent = createComponentType({
  type: ComponentType.Tileset,
  schema: {
    key: string,
    name: string,
    assetMapEntry: number,
  },
  initialize(atlas, data: Tileset) {
    atlas.key = data.key;
    atlas.name = data.name;
    atlas.assetMapEntry = data.assetMapEntry;
  },
});
