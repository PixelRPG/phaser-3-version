import { createEffect, createQuery, EffectOptions } from "@javelin/ecs";
import { AssetMap } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserAssetMapEffectState = {
  /* TODO */
};

/**
 * Phaser Map Effect
 * Extracts informations from map asset file and creates components from this data
 */
export const phaserAssetMapEffect = createEffect<
  PhaserAssetMapEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserAssetMapEffectState = {
    tilesets: new Map<number, Phaser.Tilemaps.Tileset[]>(),
    maps: new Map<number, Phaser.Tilemaps.Tilemap>(),
    layers: new Map<number, Phaser.Tilemaps.TilemapLayer>(),
  };

  const phaserService = PhaserService.getInstance();
  const assetMapsQuery = createQuery(AssetMap);

  const onCreate = () => {
    for (const [entities, [assetMaps]] of assetMapsQuery) {
      for (let i = 0; i < entities.length; i++) {
        const scene = world.latestTickData.scene;
        phaserService.createMap(scene, entities[i], assetMaps[i]);
      }
    }
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
