import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { DepthComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserDepthEffectState = EmptyObject;

export const phaserDepthEffect = createEffect<
  PhaserDepthEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserDepthEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [depths]] of createQuery(DepthComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setDepth !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a depth`
          );
        } else {
          gameObject.setDepth(depths[i].depth);
        }
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
