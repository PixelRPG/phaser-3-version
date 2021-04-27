import { createEffect, query, EffectOptions, World } from "@javelin/ecs";
import {
  AssetAtlasComponent,
  AssetImageComponent,
  AssetTilemapComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";

const effectOptions: EffectOptions = { global: true };

export const phaserPreloadEffect = createEffect<any, WorldGameData[]>(
  (world: World<WorldGameData>) => {
    const state = {};

    return () => {
      if (world.state.currentTickData.step === PhaserSceneMethod.preload) {
        const scene = world.state.currentTickData.scenes[0];
        const atlasQuery = query(AssetAtlasComponent);
        const imageQuery = query(AssetImageComponent);
        const tilemapQuery = query(AssetTilemapComponent);

        for (const [entities, [atlasEntries]] of atlasQuery) {
          for (const atlasEntry of atlasEntries) {
            console.debug("atlasEntry", atlasEntry);
            scene.load.atlas(
              atlasEntry.key,
              atlasEntry.url,
              atlasEntry.xhrSettingsJsonUrl
            );
            atlasEntry.loaded = true;
          }
        }

        for (const [entities, [imageEntries]] of imageQuery) {
          for (const imageEntry of imageEntries) {
            console.debug("imageEntry", imageEntry);
            scene.load.image(
              imageEntry.key,
              imageEntry.url,
              imageEntry.xhrSettings as
                | Phaser.Types.Loader.XHRSettingsObject
                | undefined
            );
            imageEntry.loaded = true;
          }
        }

        for (const [entities, [tilemapEntries]] of tilemapQuery) {
          for (const tilemapEntry of tilemapEntries) {
            console.debug("tilemapEntry", tilemapEntry);
            scene.load.tilemapTiledJSON(
              tilemapEntry.tilemap.key,
              tilemapEntry.tilemap.url,
              tilemapEntry.tilemap.xhrSettings as
                | Phaser.Types.Loader.XHRSettingsObject
                | undefined
            );

            for (const tileset of tilemapEntry.tilesets) {
              scene.load.image(tileset.key, tileset.url, tileset.xhrSettings);
            }

            tilemapEntry.loaded = true;
          }
        }
      }
      return state;
    };
  },
  effectOptions
);
