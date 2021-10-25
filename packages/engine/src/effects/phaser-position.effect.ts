import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Position, Velocity } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserPositionEffectState = EmptyObject;

export const phaserPositionEffect = createEffect<
  PhaserPositionEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserPositionEffectState = {};
  const phaserService = PhaserService.getInstance();
  const positionsQuery = createQuery(Position);

  const initDirectPositions = () => {
    for (const [entities, [positions]] of positionsQuery) {
      for (let i = 0; i < entities.length; i++) {
        const position = positions[i];
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setPosition !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a position`
          );
        } else {
          gameObject.setPosition(position.px, position.py);
        }
      }
    }
  };

  const updatePositions = () => {
    for (const [entities, [positions]] of positionsQuery) {
      for (let i = 0; i < entities.length; i++) {
        const entry = entities[i];
        const position = positions[i];
        // Ignore position if velocity is set because in this case phaser set's the position by itself
        if (world.has(entry, Velocity)) {
          continue;
        }

        const gameObject: any = phaserService.tryGetGameObject(entry);
        if (!gameObject || typeof gameObject.setPosition !== "function") {
          console.warn(
            `The entry ${entry} has no matching phaser object which can have a position`
          );
        } else {
          gameObject.setPosition(position.px, position.py);
        }
      }
    }
  };

  const onCreate = () => {
    initDirectPositions();
  };

  const eachUpdate = () => {
    updatePositions();
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
