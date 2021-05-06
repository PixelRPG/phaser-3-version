import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { TilesetComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserTilesetEffectState {}

export const phaserTilesetEffect = createEffect<
  PhaserTilesetEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
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
