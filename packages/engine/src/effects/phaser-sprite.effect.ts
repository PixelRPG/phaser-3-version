import { createEffect, EffectOptions, World, createQuery } from "@javelin/ecs";
import { SpriteComponent, PositionComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";
import { mapObjectTopic } from "../topics";

const effectOptions: EffectOptions = { shared: true };

export const phaserSpriteEffect = createEffect<any, WorldSceneData[], WorldSceneData>(
  (world: World<WorldSceneData>) => {
    const state = {};
    const phaserService = PhaserService.getInstance();

    const setSpawnPoint = (spawnPoint: Phaser.Types.Tilemaps.TiledObject) => {
      // Create a sprite with physics enabled via the physics system. The image used for the sprite has
      // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
      if (
        typeof spawnPoint.x !== "number" ||
        typeof spawnPoint.y !== "number"
      ) {
        throw new Error("A spawn point must have coordinates!");
      }

      for (const [entities, [, positions]] of createQuery(
        SpriteComponent,
        PositionComponent
      )) {
        for (let i = 0; i < entities.length; i++) {
          const position = positions[i];

          position.x = spawnPoint.x;
          position.y = spawnPoint.y;

          const sprite = phaserService.getSprite(entities[i]);
          // TODO move to position effect
          sprite.setPosition(position.x, position.y);
        }
      }
    };

    const onCreate = () => {
      for (const [entities, [sprites]] of createQuery(SpriteComponent)) {
        for (let i = 0; i < entities.length; i++) {
          phaserService.createSprite(
            world.latestTickData.scene.physics,
            entities[i],
            sprites[i]
          );
        }
      }
    };

    const eachTick = () => {
      for (const mapObject of mapObjectTopic) {
        if (mapObject.name === "Spawn Point") {
          setSpawnPoint(mapObject);
        }
      }
    };

    return () => {
      if (world.latestTickData.step === PhaserSceneMethod.create) {
        onCreate();
      }

      eachTick();

      return state;
    };
  },
  effectOptions
);
