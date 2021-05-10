import {
  createEffect,
  EffectOptions,
  World,
  query,
  Component,
  ComponentProps,
} from "@javelin/ecs";
import {
  VelocityComponent,
  SpriteComponent,
  PlayerComponent,
} from "../components";
import {
  WorldGameData,
  PhaserSceneMethod,
  Player,
  PlayerInput,
} from "../types";
import { PhaserService } from "../services";

const effectOptions: EffectOptions = { global: true };

export const phaserInputEffect = createEffect<null, WorldGameData[]>(
  (world: World<WorldGameData>) => {
    const state = null;
    const phaserService = PhaserService.getInstance();

    const getPlayerInput = (
      playerComponent: Component<Player & ComponentProps>
    ): PlayerInput | null => {
      const keyboard = world.state.currentTickData.scenes[0].input.keyboard;
      if (playerComponent.playerNumber === 1) {
        const cursors = keyboard.createCursorKeys();
        return {
          left: cursors.left,
          right: cursors.right,
          up: cursors.up,
          down: cursors.down,
        };
      }
      if (playerComponent.playerNumber === 2) {
        return {
          left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
          right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
          up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
          down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
        };
      }
      if (playerComponent.playerNumber === 3) {
        return {
          left: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_ONE),
          right: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_THREE),
          up: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_FIVE),
          down: keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.NUMPAD_TWO),
        };
      }
      if (playerComponent.playerNumber === 4) {
        // TODO
      }
      return null;
    };

    const eachUpdate = () => {
      for (const [entities, [velocitys, players]] of query(
        VelocityComponent,
        PlayerComponent,
        SpriteComponent
      )) {
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
          velocitys[i].x = 0;
          velocitys[i].y = 0;

          // Horizontal movement
          if (playerInput.left.isDown) {
            velocitys[i].x = -speed;
          } else if (playerInput.right.isDown) {
            velocitys[i].x = speed;
          }

          // Vertical movement
          if (playerInput.up.isDown) {
            velocitys[i].y = -speed;
          } else if (playerInput.down.isDown) {
            velocitys[i].y = speed;
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
      if (world.state.currentTickData.step === PhaserSceneMethod.update) {
        eachUpdate();
      }

      return state;
    };
  },
  effectOptions
);
