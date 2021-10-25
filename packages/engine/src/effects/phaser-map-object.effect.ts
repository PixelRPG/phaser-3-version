import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { AssetMap } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";
import { mapObjectTopic } from "../topics";

const effectOptions: EffectOptions = { shared: true };

type PhaserTilesetEffectState = EmptyObject;

export const phaserMapObjectEffect = createEffect<
  PhaserTilesetEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserTilesetEffectState = {};
  const phaserService = PhaserService.getInstance();
  const mapAssetsQuery = createQuery(AssetMap);

  const onCreate = () => {
    for (const [entities, []] of mapAssetsQuery) {
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
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
