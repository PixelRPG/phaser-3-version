import { createComponentType, number, string } from "@javelin/ecs";
import { ComponentType, Tileset } from "../types";

/**
 * The tileset image used in tiledmaps
 */
export const TilesetComponent = createComponentType({
  type: ComponentType.Tileset,
  schema: {
    key: string,
    name: string,
    assetMapEntity: number,
  },
  initialize(atlas, data: Tileset) {
    atlas.key = data.key;
    atlas.name = data.name;
    atlas.assetMapEntity = data.assetMapEntity;
  },
});
