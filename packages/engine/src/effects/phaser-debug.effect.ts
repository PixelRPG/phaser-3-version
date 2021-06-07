import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { DebugComponent, MapLayerComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

export const phaserDebugEffect = createEffect<
  { debug: boolean },
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state = {
    debug: false,
  };
  const phaserService = PhaserService.getInstance();
  const scene = world.state.currentTickData.scene;
  const keyboard = world.state.currentTickData.scene.input.keyboard;
  const debugKey = keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F1);

  /**
   * Create worldLayer collision graphic above the player, but below the text
   */
  const createDebugMapLayerGraphics = () => {
    const phaserDebugCollisionGraphics = scene.add
      .graphics()
      .setAlpha(0.75)
      .setDepth(20);

    for (const [entities, [mapLayers]] of query(MapLayerComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const mapLayerComponent = mapLayers[i];
        if (mapLayerComponent.collides) {
          const entity = entities[i];
          const layer = phaserService.getLayer(entity);
          layer.renderDebug(phaserDebugCollisionGraphics, {
            tileColor: null, // Color of non-colliding tiles
            collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
            faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
          });
        }
      }
    }
  };

  const createDebugGraphic = () => {
    scene.physics.world.createDebugGraphic();
  };

  const onDebugkeyDown = () => {
    state.debug = true;
    createDebugGraphic();
    createDebugMapLayerGraphics();
  };

  const onCreate = () => {
    const debugs = query(DebugComponent);
    if (debugs.length) {
      debugKey.once("down", onDebugkeyDown);
    }
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }
    return state;
  };
}, effectOptions);
