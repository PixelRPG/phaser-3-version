import { createEffect, query, EffectOptions, World } from "@javelin/ecs";
import { AssetMapComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserAssetMapEffectState = {
  /* TODO */
};

/**
 * Phaser Map Effect
 * Extracts informations from map asset file and creates components from this data
 */
export const phaserAssetMapEffect = createEffect<
  PhaserAssetMapEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserAssetMapEffectState = {
    tilesets: new Map<number, Phaser.Tilemaps.Tileset[]>(),
    maps: new Map<number, Phaser.Tilemaps.Tilemap>(),
    layers: new Map<number, Phaser.Tilemaps.TilemapLayer>(),
  };

  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [assetMaps]] of query(AssetMapComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const scene = world.state.currentTickData.scenes[0];
        console.debug(
          "afterPreload AssetMapComponent",
          entities[i],
          assetMaps[i]
        );
        phaserService.createMap(scene, entities[i], assetMaps[i]);
      }
    }
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
