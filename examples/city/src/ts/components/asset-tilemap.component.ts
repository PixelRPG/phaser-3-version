import { createComponentType, string, boolean, array } from "@javelin/ecs";
import { ComponentType, AssetTileset, AssetTilemap } from "../types";
import { createObjectType } from "./schemata";

export const AssetTilemapComponent = createComponentType({
  type: ComponentType.AssetTilemap,
  schema: {
    tilemap: {
      key: string,
      url: string,
      xhrSettings: createObjectType<Phaser.Types.Loader.XHRSettingsObject>(),
      // phaserMap: createNullableObjectType<Phaser.Tilemaps.Tilemap>(),
    },
    tilesets: array<AssetTileset>(createObjectType<AssetTileset>()),
    loaded: { type: boolean, defaultValue: false },
  },
  /**
   * @param atlas
   * @param key Asset key, e.g. used on preloading
   * @param url Url to the tiled json file
   * @param xhrSettings
   */
  initialize(atlas, tilemap: AssetTilemap, tilesets: AssetTileset[]) {
    atlas.tilemap = tilemap as typeof atlas["tilemap"];
    atlas.tilesets = tilesets;
  },
});
