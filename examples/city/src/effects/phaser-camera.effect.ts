import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { CameraComponent, PlayerComponent } from "../components";
import { WorldGameData, PhaserSceneMethod, Camera } from "../types";
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

  const createSplitscreen = () => {
    // TODO
    const map = Array.from(phaserService.getAllMaps(), ([, value]) => value)[0];

    // Create a camera for each player
    for (const [playerEntities, [players]] of query(PlayerComponent)) {
      const playerCount = playerEntities.length;
      if (playerCount > 4) {
        throw new Error(
          `Currently only a maximum of 4 players are supported, but you have ${playerCount}!`
        );
      }

      const bounds: Camera["bounds"] = {
        width: map.widthInPixels,
        height: map.heightInPixels,
        x: 0,
        y: 0,
      };
      let width = phaserScene.game.renderer.width;
      let height = phaserScene.game.renderer.height;
      let borderX = 0;
      let borderY = 0;

      if (playerCount >= 2) {
        width = width / 2;
        borderX = 2;
      }

      if (playerCount >= 3) {
        height = height / 2;
        borderY = 2;
      }

      for (let i = 0; i < playerEntities.length; i++) {
        const playerComponent = players[i];
        const viewport = {
          x: 0,
          y: 0,
          width: width - borderX,
          height: height - borderY,
        };

        switch (playerComponent.playerNumber) {
          case 2:
            viewport.x = width + borderX;
            break;
          case 3:
            viewport.y = height + borderY;
            break;
          case 4:
            viewport.x = width + borderX;
            viewport.y = height + borderY;
            break;
        }

        const cameraComponent = world.component(CameraComponent, {
          followEntry: playerEntities[i],
          isMain: i === 0,
          name: playerComponent.name,
          bounds,
          x: viewport.x,
          y: viewport.y,
          width: viewport.width,
          height: viewport.height,
        });

        const cameraEntry = world.spawn(cameraComponent);

        phaserService.createCamera(phaserCameras, cameraEntry, cameraComponent);
      }
    }
  };

  const onCreate = () => {
    createSplitscreen();
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
