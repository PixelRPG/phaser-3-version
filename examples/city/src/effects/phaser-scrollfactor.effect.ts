import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { ScrollfactorComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserScrollfactorEffectState {}

export const phaserScrollfactorEffect = createEffect<
  PhaserScrollfactorEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserScrollfactorEffectState = {};
  const phaserService = PhaserService.getInstance();

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
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
    }

    return state;
  };
}, effectOptions);