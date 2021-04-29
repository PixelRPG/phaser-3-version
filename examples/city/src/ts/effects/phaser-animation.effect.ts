import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { AnimationComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserAnimationEffectState {}

export const phaserAnimationEffect = createEffect<
  PhaserAnimationEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserAnimationEffectState = {};
  const phaserService = PhaserService.getInstance();
  let preloaded = false;

  const afterPreload = () => {
    for (const [entities, [animations]] of query(AnimationComponent)) {
      for (let i = 0; i < entities.length; i++) {
        console.debug(
          "afterPreload createAnimation",
          entities[i],
          animations[i]
        );
        phaserService.createAnimation(
          world.state.currentTickData.scenes[0].anims,
          entities[i],
          animations[i]
        );
      }
    }
  };

  return () => {
    if (
      world.state.currentTickData.step === PhaserSceneMethod.update &&
      !preloaded
    ) {
      afterPreload();
      preloaded = true;
    }

    return state;
  };
}, effectOptions);
