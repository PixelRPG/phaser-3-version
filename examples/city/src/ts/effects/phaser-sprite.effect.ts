import {
  createEffect,
  EffectOptions,
  World,
  query,
  Component,
} from "@javelin/ecs";
import {
  SpriteComponent,
  AssetAtlasComponent,
  PlayerComponent,
  PositionComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod, Position } from "../types";
import { PhaserService } from "../services";
import { mapObjectTopic } from "../topics";

const effectOptions: EffectOptions = { global: true };

export const phaserSpriteEffect = createEffect<any, WorldGameData[]>(
  (world: World<WorldGameData>) => {
    const state = {};
    const phaserService = PhaserService.getInstance();
    let preloaded = false;

    const setSpawnPoint = (spawnPoint: Phaser.Types.Tilemaps.TiledObject) => {
      // Create a sprite with physics enabled via the physics system. The image used for the sprite has
      // a bit of whitespace, so I'm using setSize & setOffset to control the size of the player's body.
      if (
        typeof spawnPoint.x !== "number" ||
        typeof spawnPoint.y !== "number"
      ) {
        throw new Error("A spawn point must have coordinates!");
      }

      for (const [entities, [sprites, positions]] of query(
        SpriteComponent,
        PositionComponent
      )) {
        for (let i = 0; i < entities.length; i++) {
          const position = positions[i];

          position.x = spawnPoint.x;
          position.y = spawnPoint.y;

          console.debug("Set Spawn Point", position);
          onPositionChanged(entities[i], position);
        }
      }
    };

    const afterPreload = () => {
      for (const [entities, [sprites]] of query(SpriteComponent)) {
        for (let i = 0; i < entities.length; i++) {
          console.debug("Create Sprite");
          phaserService.createSprite(
            world.state.currentTickData.scenes[0].physics,
            entities[i],
            sprites[i]
          );
        }
      }
    };

    const onPositionChanged = (
      entity: number,
      position: Component<Position>
    ) => {
      const sprite = phaserService.getSprite(entity);
      sprite.setPosition(position.x, position.y);
      console.debug("Position changed", position);
    };

    return () => {
      if (
        world.state.currentTickData.step === PhaserSceneMethod.update &&
        !preloaded
      ) {
        afterPreload();
        preloaded = true;
      }

      for (const mapObject of mapObjectTopic) {
        if (mapObject.name === "Spawn Point") {
          setSpawnPoint(mapObject);
        }
      }

      return state;
    };
  },
  effectOptions
);
