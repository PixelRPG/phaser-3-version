import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { DepthComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserDepthEffectState {}

export const phaserDepthEffect = createEffect<
  PhaserDepthEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserDepthEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [depths]] of query(DepthComponent)) {
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
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
