import { createEffect, EffectOptions, World, query } from "@javelin/ecs";
import {
  VelocityComponent,
  SpriteComponent,
  PlayerComponent,
} from "../components";
import { WorldGameData, PhaserSceneMethod } from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface PhaserInputEffectState {}

export const phaserInputEffect = createEffect<
  PhaserInputEffectState,
  WorldGameData[]
>((world: World<WorldGameData>) => {
  const state: PhaserInputEffectState = {};
  const phaserService = PhaserService.getInstance();
  const cursors = world.state.currentTickData.scenes[0].input.keyboard.createCursorKeys();

  const eachUpdate = () => {
    for (const [entities, [velocitys]] of query(
      VelocityComponent,
      SpriteComponent,
      PlayerComponent
    )) {
      for (let i = 0; i < entities.length; i++) {
        const sprite = phaserService.getSprite(entities[i]);
        const speed = velocitys[i].speed;

        const prevVelocity = sprite.body.velocity.clone();

        // Stop any previous movement from the last frame
        velocitys[i].x = 0;
        velocitys[i].y = 0;

        // Horizontal movement
        if (cursors.left.isDown) {
          velocitys[i].x = -speed;
        } else if (cursors.right.isDown) {
          velocitys[i].x = speed;
        }

        // Vertical movement
        if (cursors.up.isDown) {
          velocitys[i].y = -speed;
        } else if (cursors.down.isDown) {
          velocitys[i].y = speed;
        }

        // Update the animation last and give left/right animations precedence over up/down animations
        if (cursors.left.isDown) {
          sprite.anims.play("misa-left-walk", true);
        } else if (cursors.right.isDown) {
          sprite.anims.play("misa-right-walk", true);
        } else if (cursors.up.isDown) {
          sprite.anims.play("misa-back-walk", true);
        } else if (cursors.down.isDown) {
          sprite.anims.play("misa-front-walk", true);
        } else {
          sprite.anims.stop();

          // If we were moving, pick and idle frame to use
          if (prevVelocity.x < 0)
            sprite.setTexture("tuxemon-misa", "misa-left");
          else if (prevVelocity.x > 0)
            sprite.setTexture("tuxemon-misa", "misa-right");
          else if (prevVelocity.y < 0)
            sprite.setTexture("tuxemon-misa", "misa-back");
          else if (prevVelocity.y > 0)
            sprite.setTexture("tuxemon-misa", "misa-front");
        }
      }
    }
  };

  return () => {
    if (world.state.currentTickData.step === PhaserSceneMethod.update) {
      eachUpdate();
    }

    return state;
  };
}, effectOptions);
