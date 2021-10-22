import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { MapLayerComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserMapLayerEffectState = EmptyObject;

export const phaserMapLayerEffect = createEffect<
  PhaserMapLayerEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserMapLayerEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [mapLayers]] of createQuery(MapLayerComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createLayer(entities[i], mapLayers[i]);
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
