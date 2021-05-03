import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { PositionComponent, VelocityComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserPositionEffectState {}

export const phaserPositionEffect = createEffect<
  PhaserPositionEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserPositionEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
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

  const eachUpdate = () => {
    const velocityEntities: number[] = [];
    query(VelocityComponent).forEach((entity) => {
      velocityEntities.push(entity);
    });

    for (const [entities, [positions]] of query(PositionComponent)) {
      for (let i = 0; i < entities.length; i++) {
        // Ignore position if velocity is set because in this case phaser set's the position by itself
        if (velocityEntities.includes(entities[i])) {
          continue;
        }
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
