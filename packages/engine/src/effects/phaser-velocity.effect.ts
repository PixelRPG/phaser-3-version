import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import { VelocityComponent, PositionComponent } from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserVelocityEffectState {}

export const phaserVelocityEffect = createEffect<
  PhaserVelocityEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserVelocityEffectState = {};
  const phaserService = PhaserService.getInstance();

  const onCreate = () => {
    for (const [entities, [velocitys, positions]] of query(
      VelocityComponent,
      PositionComponent
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
    if (world.state.currentTickData.step === PhaserSceneMethod.update) {
      onCreate();
    }

    return state;
  };
}, effectOptions);
