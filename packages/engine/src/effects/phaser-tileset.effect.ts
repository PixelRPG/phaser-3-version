import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { TilesetComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserTilesetEffectState = EmptyObject;

export const phaserTilesetEffect = createEffect<
  PhaserTilesetEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserTilesetEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [tilesets]] of query(TilesetComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createTileset(entities[i], tilesets[i]);
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
