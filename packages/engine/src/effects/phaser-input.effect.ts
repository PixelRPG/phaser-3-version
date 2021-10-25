import {
  createEffect,
  EffectOptions,
  createQuery,
} from "@javelin/ecs";
import {
  PlayerComponent,
  Velocity,
  Sprite,
  Player,
} from "../components";
import {
  WorldSceneData,
  PhaserSceneMethod,
  PlayerInput,
} from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { shared: true };

export const phaserInputEffect = createEffect<null, WorldSceneData[], WorldSceneData>(
  (world) => {
    const state = null;
    const phaserService = PhaserService.getInstance();
    const movingPlayersQuery = createQuery(
      Velocity,
      Player,
      Sprite
    );

    const getPlayerInput = (
      playerComponent: typeof PlayerComponent
    ): PlayerInput | null => {
      const keyboard = world.latestTickData.scene.input.keyboard;
      const cursors = keyboard.createCursorKeys();
      switch (playerComponent.playerNumber) {
        case 1:
          return {
            left: cursors.left,
            right: cursors.right,
            up: cursors.up,
            down: cursors.down,
          };
        case 2:
          return {
            left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
          };
        case 3:
          return {
            left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
            right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
            up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
            down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
          };
        case 4:
          // TODO
          break;
        default:
          console.warn(
            `Only 1-4 player numbers  are supported but player number ${playerComponent.playerNumber} detected!\nThis player number will be ignored.`
          );
          break;
      }
      return null;
    };

    const eachUpdate = () => {
      for (const [entities, [velocitys, players]] of movingPlayersQuery) {
        for (let i = 0; i < entities.length; i++) {
          const sprite = phaserService.getSprite(entities[i]);
          const speed = velocitys[i].speed;
          const playerComponent = players[i];
          const playerInput = getPlayerInput(playerComponent);

          if (!playerInput) {
            continue;
          }

          const prevVelocity = sprite.body.velocity.clone();

          // Stop any previous movement from the last frame
          velocitys[i].vx = 0;
          velocitys[i].vy = 0;

          // Horizontal movement
          if (playerInput.left.isDown) {
            velocitys[i].vx = -speed;
          } else if (playerInput.right.isDown) {
            velocitys[i].vx = speed;
          }

          // Vertical movement
          if (playerInput.up.isDown) {
            velocitys[i].vy = -speed;
          } else if (playerInput.down.isDown) {
            velocitys[i].vy = speed;
          }

          // Update the animation last and give left/right animations precedence over up/down animations
          if (playerInput.left.isDown) {
            sprite.anims.play("misa-left-walk", true);
          } else if (playerInput.right.isDown) {
            sprite.anims.play("misa-right-walk", true);
          } else if (playerInput.up.isDown) {
            sprite.anims.play("misa-back-walk", true);
          } else if (playerInput.down.isDown) {
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
      if (world.latestTickData.step === PhaserSceneMethod.update) {
        eachUpdate();
      }

      return state;
    };
  },
  effectOptions
);
