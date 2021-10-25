import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { TILE_COLLSION_LAYER } from "../constants";
import { Collision, Velocity, MapLayer } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

/**
 * - Should be called after the map layers effect
 * - Should be called after the sprite effect
 */
export const phaserCollisionEffect = createEffect<
  any,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state = {};
  const phaserService = PhaserService.getInstance();
  const mapLayersQuery = createQuery(MapLayer, Collision);
  const velocitiesQuery = createQuery(Velocity, Collision);

  const onCreate = () => {
    const phaserCollisionLayers: Phaser.Tilemaps.TilemapLayer[] = [];
    const scene = world.latestTickData.scene;

    // Set collision for map layers
    for (const [entities] of mapLayersQuery) {
      for (let i = 0; i < entities.length; i++) {
        const phaserCollisionLayer = phaserService.getLayer(entities[i]);
        phaserCollisionLayer.setCollisionByProperty({
          [TILE_COLLSION_LAYER]: true,
        });
        phaserCollisionLayers.push(phaserCollisionLayer);
      }
    }

    // Set collision for sprites
    for (const [entities] of velocitiesQuery) {
      for (let i = 0; i < entities.length; i++) {
        const phaserGameObject = phaserService.getGameObject(entities[i]);
        for (const phaserCollisionLayer of phaserCollisionLayers) {
          scene.physics.add.collider(phaserGameObject, phaserCollisionLayer);
        }
      }
    }
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
