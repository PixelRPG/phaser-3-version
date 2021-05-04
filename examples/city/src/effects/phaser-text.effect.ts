import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { TextComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserTextEffectState {}

export const phaserTextEffect = createEffect<
  PhaserTextEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserTextEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [texts]] of query(TextComponent)) {
      for (let i = 0; i < entities.length; i++) {
        console.debug("afterPreload TextComponent", entities[i], texts[i]);

        const phaserText = phaserService.createText(
          world,
          world.state.currentTickData.scenes[0],
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
