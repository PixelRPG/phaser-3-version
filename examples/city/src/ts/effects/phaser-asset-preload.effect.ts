import { createEffect, query, EffectOptions, World } from "@javelin/ecs";
import {
  AssetAtlasComponent,
  AssetTilesetComponent,
  AssetImageComponent,
  AssetMapComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";

const effectOptions: EffectOptions = { global: true };

export const phaserAssetPreloadEffect = createEffect<any, WorldGameData[]>(
  (world: World<WorldGameData>) => {
    const state = {};

    return () => {
      if (world.state.currentTickData.step === PhaserSceneMethod.preload) {
        console.debug("phaserAssetPreloadEffect");
        const scene = world.state.currentTickData.scenes[0];
        const assetAtlasQuery = query(AssetAtlasComponent);
        const assetImageQuery = query(AssetImageComponent);
        const assetTilesetQuery = query(AssetTilesetComponent);
        const asssetMapQuery = query(AssetMapComponent);

        for (const [entities, [tilesets]] of assetTilesetQuery) {
          for (const tileset of tilesets) {
            console.debug("tileset", tileset);
            scene.load.image(tileset.key, tileset.url);
            tileset.loaded = true;
          }
        }

        for (const [entities, [atlases]] of assetAtlasQuery) {
          for (const atlas of atlases) {
            console.debug("atlas", atlas);
            scene.load.atlas(atlas.key, atlas.url, atlas.xhrSettingsJsonUrl);
            atlas.loaded = true;
          }
        }

        for (const [entities, [images]] of assetImageQuery) {
          for (const image of images) {
            console.debug("image", image);
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

        for (const [entities, [maps]] of asssetMapQuery) {
          for (const map of maps) {
            console.debug("map", map);
            scene.load.tilemapTiledJSON(map.key, map.url);
            map.loaded = true;
          }
        }
      }
      return state;
    };
  },
  effectOptions
);
