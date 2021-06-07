import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { AnimationComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserAnimationEffectState {}

export const phaserAnimationEffect = createEffect<
  PhaserAnimationEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserAnimationEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [animations]] of query(AnimationComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createAnimation(
          world.state.currentTickData.scene.anims,
          entities[i],
          animations[i]
        );
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
