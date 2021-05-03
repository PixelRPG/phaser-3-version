import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { AssetMapComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";
import { mapObjectTopic } from "../topics";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserTilesetEffectState {}

export const phaserMapObjectEffect = createEffect<
  PhaserTilesetEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserTilesetEffectState = {};
  const phaserService = PhaserService.getInstance();

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      for (const [entities, [assetMaps]] of query(AssetMapComponent)) {
        for (let i = 0; i < entities.length; i++) {
          const map = phaserService.getMap(entities[i]);

          // Object layers in Tiled let you embed extra info into a map - like a spawn point or custom
          // collision shapes. In the tmx file, there's an object layer with a point named "Spawn Point"
          const currSpawnPoint = map.findObject(
            "Objects",
            (obj) => obj.name === "Spawn Point"
          );
          mapObjectTopic.push(currSpawnPoint);
        }
      }
    }

    return state;
  };
}, effectOptions);
