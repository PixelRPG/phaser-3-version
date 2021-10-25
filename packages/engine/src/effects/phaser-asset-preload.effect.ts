import { createEffect, createQuery, EffectOptions } from "@javelin/ecs";
import {
  AssetAtlas,
  AssetTileset,
  AssetImage,
  AssetMap,
} from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";

const effectOptions: EffectOptions = { shared: true };

export const phaserAssetPreloadEffect = createEffect<any, WorldSceneData[], WorldSceneData>(
  (world) => {
    const state = {};

    const onPreload = () => {
      const scene = world.latestTickData.scene;
      const assetAtlasQuery = createQuery(AssetAtlas).bind(world);
      const assetImageQuery = createQuery(AssetImage).bind(world);
      const assetTilesetQuery = createQuery(AssetTileset).bind(world);
      const asssetMapQuery = createQuery(AssetMap).bind(world);

      for (const [, [tilesets]] of assetTilesetQuery) {
        for (const tileset of tilesets) {
          scene.load.image(tileset.key, tileset.url);
          tileset.tilesetLoaded = true;
        }
      }

      for (const [, [atlases]] of assetAtlasQuery) {
        for (const atlas of atlases) {
          scene.load.atlas(atlas.key, atlas.url, atlas.xhrSettingsJsonUrl);
          atlas.atlasLoaded = true;
        }
      }

      for (const [, [images]] of assetImageQuery) {
        for (const image of images) {
          scene.load.image(
            image.key,
            image.url,
            image.xhrSettings as any as
              | Phaser.Types.Loader.XHRSettingsObject
              | undefined
          );
          image.imageLoaded = true;
        }
      }

      for (const [, [maps]] of asssetMapQuery) {
        for (const map of maps) {
          scene.load.tilemapTiledJSON(map.key, map.url);
          map.assetMapLoaded = true;
        }
      }
    };

    return () => {
      if (world.latestTickData.step === PhaserSceneMethod.preload) {
        onPreload();
      }
      return state;
    };
  },
  effectOptions
);
