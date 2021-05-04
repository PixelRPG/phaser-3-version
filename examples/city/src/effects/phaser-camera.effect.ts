import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { CameraComponent, PlayerComponent } from "../components";
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
  const phaserScene = world.state.currentTickData.scenes[0];
  const phaserCameras = phaserScene.cameras;

  const onCreate = () => {
    // TODO
    const map = Array.from(
      phaserService.getAllMaps(),
      ([, value]) => value
    )[0];

    // Create a camera for each player
    for (const [playerEntities, [players]] of query(PlayerComponent)) {
      for (let i = 0; i < playerEntities.length; i++) {
        const cameraComponent = world.component(CameraComponent, {
          followEntry: playerEntities[i],
          x: 0,
          y: 0,
          width: map.widthInPixels,
          height: map.heightInPixels,
          isMain: i === 0,
        });

        const cameraEntry = world.spawn(cameraComponent);

        phaserService.createCamera(
          phaserCameras,
          cameraEntry,
          cameraComponent,
        );
      }
    }
  };

  const eachUpdate = () => {
    //
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
