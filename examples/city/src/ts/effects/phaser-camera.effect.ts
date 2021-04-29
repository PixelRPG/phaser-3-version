import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { CameraComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserCameraEffectState {}

export const phaserCameraEffect = createEffect<
  PhaserCameraEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserCameraEffectState = {};
  const phaserService = PhaserService.getInstance();
  let preloaded = false;

  const afterPreload = () => {
    for (const [entities, [cameras]] of query(CameraComponent)) {
      for (let i = 0; i < entities.length; i++) {
        console.debug("afterPreload CameraComponent", entities[i], cameras[i]);
        phaserService.createCamera(
          world.state.currentTickData.scenes[0].cameras,
          entities[i],
          cameras[i]
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
