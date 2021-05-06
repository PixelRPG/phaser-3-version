import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { TILE_COLLSION_LAYER } from "../constants";
import {
  CollisionComponent,
  VelocityComponent,
  MapLayerComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

/**
 * - Should be called after the map layers effect
 * - Should be called after the sprite effect
 */
export const phaserCollisionEffect = createEffect<any, WorldGameData[]>(
  (world: World<WorldGameData>) => {
    const state = {};
    const phaserService = PhaserService.getInstance();

    const onCreate = () => {
      const phaserCollisionLayers: Phaser.Tilemaps.TilemapLayer[] = [];
      const scene = world.state.currentTickData.scenes[0];

      // Set collision for map layers
      for (const [entities] of query(MapLayerComponent, CollisionComponent)) {
        for (let i = 0; i < entities.length; i++) {
          const phaserCollisionLayer = phaserService.getLayer(entities[i]);
          phaserCollisionLayer.setCollisionByProperty({
            [TILE_COLLSION_LAYER]: true,
          });
          phaserCollisionLayers.push(phaserCollisionLayer);
        }
      }

      // Set collision for sprites
      for (const [entities] of query(VelocityComponent, CollisionComponent)) {
        for (let i = 0; i < entities.length; i++) {
          const phaserGameObject = phaserService.getGameObject(entities[i]);
          for (const phaserCollisionLayer of phaserCollisionLayers) {
            scene.physics.add.collider(phaserGameObject, phaserCollisionLayer);
          }
        }
      }
    };

    return () => {
      if (world.state.currentTickData.step === PhaserSceneMethod.create) {
        onCreate();
      }

      return state;
    };
  },
  effectOptions
);
