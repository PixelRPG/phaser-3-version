import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Scrollfactor } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserScrollfactorEffectState = EmptyObject;

export const phaserScrollfactorEffect = createEffect<
  PhaserScrollfactorEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserScrollfactorEffectState = {};
  const phaserService = PhaserService.getInstance();
  const scrollfactorsQuery = createQuery(Scrollfactor).bind(world);

  const onUpdate = () => {
    for (const [entities, [scrollfactor]] of scrollfactorsQuery) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setScrollFactor !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a scrollfactor`
          );
        } else {
          gameObject.setScrollFactor(scrollfactor[i].sx, scrollfactor[i].sy);
        }
      }
    }
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onUpdate();
    }

    return state;
  };
}, effectOptions);
