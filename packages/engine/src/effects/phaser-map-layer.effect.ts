import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { MapLayerComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserMapLayerEffectState = EmptyObject;

export const phaserMapLayerEffect = createEffect<
  PhaserMapLayerEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserMapLayerEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [mapLayers]] of query(MapLayerComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createLayer(entities[i], mapLayers[i]);
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
