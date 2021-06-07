import { createEffect, query, EffectOptions, World } from "@javelin/ecs";
import {
  AssetAtlasComponent,
  AssetTilesetComponent,
  AssetImageComponent,
  AssetMapComponent,
} from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";

const effectOptions: EffectOptions = { global: true };

export const phaserAssetPreloadEffect = createEffect<any, WorldSceneData[]>(
  (world: World<WorldSceneData>) => {
    const state = {};

    const onPreload = () => {
      const scene = world.state.currentTickData.scene;
      const assetAtlasQuery = query(AssetAtlasComponent);
      const assetImageQuery = query(AssetImageComponent);
      const assetTilesetQuery = query(AssetTilesetComponent);
      const asssetMapQuery = query(AssetMapComponent);

      for (const [, [tilesets]] of assetTilesetQuery) {
        for (const tileset of tilesets) {
          scene.load.image(tileset.key, tileset.url);
          tileset.loaded = true;
        }
      }

      for (const [, [atlases]] of assetAtlasQuery) {
        for (const atlas of atlases) {
          scene.load.atlas(atlas.key, atlas.url, atlas.xhrSettingsJsonUrl);
          atlas.loaded = true;
        }
      }

      for (const [, [images]] of assetImageQuery) {
        for (const image of images) {
          scene.load.image(
            image.key,
            image.url,
            image.xhrSettings as
              | Phaser.Types.Loader.XHRSettingsObject
              | undefined
          );
          image.loaded = true;
        }
      }

      for (const [, [maps]] of asssetMapQuery) {
        for (const map of maps) {
          scene.load.tilemapTiledJSON(map.key, map.url);
          map.loaded = true;
        }
      }
    };

    return () => {
      if (world.state.currentTickData.step === PhaserSceneMethod.preload) {
        onPreload();
      }
      return state;
    };
  },
  effectOptions
);
