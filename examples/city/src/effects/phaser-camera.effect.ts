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

  const onCreate = () => {
    for (const [entities, [cameras]] of query(CameraComponent)) {
      for (let i = 0; i < entities.length; i++) {
        phaserService.createCamera(
          world.state.currentTickData.scenes[0].cameras,
          entities[i],
          cameras[i]
        );
      }
    }
  };

  const eachUpdate = () => {
    for (const [entities, [cameras]] of query(CameraComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject = phaserService.getGameObject(cameras[i].followEntry);
        const camera = phaserService.getCamera(entities[i]);
        // TODO
        const map = Array.from(
          phaserService.getAllMaps(),
          ([, value]) => value
        )[0];
        camera.startFollow(gameObject);
        camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
      }
    }
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    if (world.state.currentTickData.step === PhaserSceneMethod.update) {
      eachUpdate();
    }

    return state;
  };
}, effectOptions);
