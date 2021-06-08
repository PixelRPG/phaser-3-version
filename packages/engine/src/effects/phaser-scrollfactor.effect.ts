import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { ScrollfactorComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserScrollfactorEffectState = EmptyObject;

export const phaserScrollfactorEffect = createEffect<
  PhaserScrollfactorEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserScrollfactorEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onUpdate = () => {
    for (const [entities, [depths]] of query(ScrollfactorComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setScrollFactor !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a scrollfactor`
          );
        } else {
          gameObject.setScrollFactor(depths[i].x, depths[i].y);
        }
      }
    }
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onUpdate();
    }

    return state;
  };
}, effectOptions);
