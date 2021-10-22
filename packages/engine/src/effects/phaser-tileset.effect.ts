import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Tileset } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserTilesetEffectState = EmptyObject;

export const phaserTilesetEffect = createEffect<
  PhaserTilesetEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserTilesetEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [tilesets]] of createQuery(Tileset)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createTileset(entities[i], tilesets[i]);
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
