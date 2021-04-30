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

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      for (const [entities, [texts]] of query(TextComponent)) {
        for (let i = 0; i < entities.length; i++) {
          console.debug("afterPreload TextComponent", entities[i], texts[i]);
          phaserService.createText(
            world.state.currentTickData.scenes[0],
            entities[i],
            texts[i]
          );
        }
      }
    }

    return state;
  };
}, effectOptions);
