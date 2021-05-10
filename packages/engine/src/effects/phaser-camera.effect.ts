import {
  createEffect,
  EffectOptions,
  World,
  query,
  Component,
} from "@javelin/ecs";
import { CameraComponent, PlayerComponent } from "../components";
import { WorldGameData, PhaserSceneMethod, Camera, Player } from "../types";
import { PhaserService } from "../services";
import { extend, getViewportDimensions } from "@ribajs/utils";

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
  const phaserGameConfig = world.state.currentTickData.phaserGameConfig;
  const phaserCameras = phaserScene.cameras;

  /**
   * Calcualtes the splitscreen viewport position and size
   * @param playerComponent
   * @param playerCount
   * @returns
   */
  const calcPlayerCamera = (
    playerComponent: Component<Player>,
    playerCount: number
  ): Camera => {
    const map = phaserService.getActiveMap();

    let width: number;
    let height: number;

    let borderX = 0;
    let borderY = 0;

    const bounds: Camera["bounds"] = {
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
    const viewport: Camera = {
      x: 0,
      y: 0,
      width: width - borderX,
      height: height - borderY,
      bounds,
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

    return viewport;
  };

  /**
   * Attach camera to player
   * - Creates split screens / cameras for multi player or a single camera for single player
   */
  const attachCamerasToPlayers = () => {
    // Create a camera for each player
    for (const [playerEntities, [players]] of query(PlayerComponent)) {
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

        const cameraComponent = world.component(CameraComponent, {
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
    for (const [cameraEntities, [cameras, players]] of query(
      CameraComponent,
      PlayerComponent
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
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    if (world.state.currentTickData.step === PhaserSceneMethod.update) {
      eachUpdate();
    }

    return state;
  };
}, effectOptions);