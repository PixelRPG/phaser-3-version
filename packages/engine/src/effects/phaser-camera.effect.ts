import {
  createEffect,
  EffectOptions,
  createQuery,
} from "@javelin/ecs";
import { Schema } from "@javelin/core";
import { CameraComponent, PlayerComponent, Player, Camera } from "../components";
import {
  WorldSceneData,
  PhaserSceneMethod,
  EmptyObject,
  Camera as TCamera
} from "../types";
import { PhaserService } from "../services";
import { extend, getViewportDimensions } from "../helper";

const effectOptions: EffectOptions = { shared: true };

type PhaserCameraEffectState = EmptyObject;

export const phaserCameraEffect = createEffect<
  PhaserCameraEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserCameraEffectState = {};
  const phaserService = PhaserService.getInstance();
  const phaserScene = world.latestTickData.scene;
  const phaserGameConfig = phaserScene.phaserGameConfig;
  const phaserCameras = phaserScene.cameras;

  /**
   * Calcualtes the splitscreen viewport position and size
   * @param playerComponent
   * @param playerCount
   * @returns
   */
  const calcPlayerCamera = (
    playerComponent: typeof PlayerComponent,
    playerCount: number
  ): TCamera => {
    const map = phaserService.getActiveMap();

    let width: number;
    let height: number;

    let borderX = 0;
    let borderY = 0;

    const bounds: TCamera["bounds"] = {
      width: map.widthInPixels,
      height: map.heightInPixels,
      x: 0,
      y: 0,
    };
    if (phaserGameConfig.scale?.mode === Phaser.Scale.RESIZE) {
      const vp = getViewportDimensions();
      width = vp.w;
      height = vp.h;
    } else {
      width = phaserScene.game.renderer.width;
      height = phaserScene.game.renderer.height;
    }

    if (playerCount >= 2) {
      width = width / 2;
      borderX = 2;
    }

    if (playerCount >= 3) {
      height = height / 2;
      borderY = 2;
    }
    const viewport: TCamera["viewport"] = {
      x: 0,
      y: 0,
      width: width - borderX,
      height: height - borderY,
    };

    switch (playerComponent.playerNumber) {
      case 1:
        viewport.x = 0;
        viewport.y = 0;
        break;
      case 2:
        viewport.x = width + borderX;
        viewport.y = 0;
        break;
      case 3:
        viewport.x = 0;
        viewport.y = height + borderY;
        break;
      case 4:
        viewport.x = width + borderX;
        viewport.y = height + borderY;
        break;
      default:
        throw new Error(
          "Player number must be between 1 and 4, but is " +
            playerComponent.playerNumber
        );
    }

    return {
      viewport,
      bounds,
    };
  };

  /**
   * Attach camera to player
   * - Creates split screens / cameras for multi player or a single camera for single player
   */
  const attachCamerasToPlayers = () => {
    // Create a camera for each player
    for (const [playerEntities, [players]] of createQuery(Player)) {
      const playerCount = playerEntities.length;
      if (playerCount > 4) {
        throw new Error(
          `Currently only a maximum of 4 players are supported, but you have ${playerCount}!`
        );
      }

      for (let i = 0; i < playerEntities.length; i++) {
        const playerComponent = players[i];
        const playerEntity = playerEntities[i];
        const phaserGameObject = phaserService.getGameObject(playerEntity);
        const data = calcPlayerCamera(playerComponent, playerCount);

        const cameraComponent = world.get<typeof Camera>(CameraComponent, {
          isMain: playerComponent.playerNumber === 1,
          name: playerComponent.name,
          ...data,
        });

        world.attach(playerEntity, cameraComponent);

        const phaserCamera = phaserService.createCamera(
          phaserCameras,
          playerEntity,
          cameraComponent
        );

        // Follow the player
        phaserCamera.startFollow(phaserGameObject);
      }
    }
  };

  const resizePlayerCameras = () => {
    for (const [cameraEntities, [cameras, players]] of createQuery(
      Camera,
      Player
    )) {
      const playerCount = cameraEntities.length;
      for (let i = 0; i < cameraEntities.length; i++) {
        const cameraEntity = cameraEntities[i];
        const cameraComponent = cameras[i];
        const playerComponent = players[i];
        const data = calcPlayerCamera(playerComponent, playerCount);

        // Update component
        extend({ deep: true }, cameraComponent, data);

        // Update phaser camera object
        phaserService.updateCamera(cameraEntity, cameraComponent);
      }
    }
  };

  const onResize = () => {
    resizePlayerCameras();
  };

  const onCreate = () => {
    attachCamerasToPlayers();
    phaserScene.scale.on("resize", onResize /*, this*/);
  };

  const eachUpdate = () => {
    //
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    if (world.latestTickData.step === PhaserSceneMethod.update) {
      eachUpdate();
    }

    return state;
  };
}, effectOptions);
