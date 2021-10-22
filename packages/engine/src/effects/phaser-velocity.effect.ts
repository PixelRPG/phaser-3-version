import { createEffect, EffectOptions, createQuery } from "@javelin/ecs";
import { Velocity, Position } from "../components";
import { WorldSceneData, PhaserSceneMethod, EmptyObject } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

type PhaserVelocityEffectState = EmptyObject;

export const phaserVelocityEffect = createEffect<
  PhaserVelocityEffectState,
  WorldSceneData[],
  WorldSceneData
>((world) => {
  const state: PhaserVelocityEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [velocitys, positions]] of createQuery(
      Velocity,
      Position
    )) {
      for (let i = 0; i < entities.length; i++) {
        const gameObject: any = phaserService.tryGetGameObject(entities[i]);
        if (!gameObject || typeof gameObject.setVelocity !== "function") {
          console.warn(
            `The entry ${entities[i]} has no matching phaser object which can have a velocitys`
          );
        } else {
          gameObject.setVelocity(velocitys[i].x, velocitys[i].y);

          // Normalize and scale the velocity so that player can't move faster along a diagonal
          gameObject.body.velocity.normalize().scale(velocitys[i].speed);

          // Sync position
          if (gameObject?.body?.position) {
            positions[i].x = gameObject.body.position.x;
            positions[i].y = gameObject.body.position.y;
          }
        }
      }
    }
  };

  return () => {
    if (world.latestTickData.step === PhaserSceneMethod.update) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
