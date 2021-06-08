import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { TextComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserTextEffectState = EmptyObject;

export const phaserTextEffect = createEffect<
  PhaserTextEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserTextEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [texts]] of query(TextComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createText(
          world,
          world.state.currentTickData.scene,
          entities[i],
          texts[i]
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
