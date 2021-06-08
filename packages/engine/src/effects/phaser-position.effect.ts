import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { PositionComponent, VelocityComponent } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

type PhaserPositionEffectState = EmptyObject;

export const phaserPositionEffect = createEffect<
  PhaserPositionEffectState,
  WorldSceneData[]
>((world: World<WorldSceneData>) => {
  const state: PhaserPositionEffectState = {};
  const phaserService = PhaserService.getInstance();

  const initDirectPositions = () => {
    for (const [entities, [positions]] of query(PositionComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setPosition !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a position`
          );
        } else {
          gameObject.setPosition(positions[i].x, positions[i].y);
        }
      }
    }
  };

  const updatePositions = () => {
    // const velocityEntities: number[] = [];
    // query(VelocityComponent).forEach((entity) => {
    //   velocityEntities.push(entity);
    // });

    for (const [entities, [positions]] of query(PositionComponent)) {
      for (let i = 0; i < entities.length; i++) {
        const entry = entities[i];
        // Ignore position if velocity is set because in this case phaser set's the position by itself
        if (world.has(entry, VelocityComponent)) {
          continue;
        }

        const gameObject: any = phaserService.tryGetGameObject(entry);
        if (!gameObject || typeof gameObject.setPosition !== "function") {
          console.warn(
            `The entry ${entry} has no matching phaser object which can have a position`
          );
        } else {
          gameObject.setPosition(positions[i].x, positions[i].y);
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
    if (world.state.currentTickData.step === PhaserSceneMethod.create) {
      onCreate();
    }

    if (world.state.currentTickData.step === PhaserSceneMethod.update) {
      eachUpdate();
    }

    return state;
  };
}, effectOptions);
