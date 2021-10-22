import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Text } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserTextEffectState = EmptyObject;

export const phaserTextEffect = createEffect<
  PhaserTextEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserTextEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [texts]] of createQuery(Text)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createText(
          world,
          world.latestTickData.scene,
          entities[i],
          texts[i]
        );
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
