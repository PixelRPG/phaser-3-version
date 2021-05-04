import { PhaserSceneMethod } from "./types";
import { GameWorld } from "./worlds";

import "phaser";

/**
 * Credits:
 *  - Michael Hadley, https://github.com/mikewesthad/phaser-3-tilemap-blog-posts
 *  - Tuxemon, https://github.com/Tuxemon/Tuxemon
 */
class Scene extends Phaser.Scene {

  world = new GameWorld();

  // constructor() {}

  init() {
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      step: PhaserSceneMethod.init,
    });
  }

  preload() {
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      step: PhaserSceneMethod.preload,
    });
  }

  create() {
    console.debug("create");
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      step: PhaserSceneMethod.create,
    });

    // Debug graphics
    this.input.keyboard.once("keydown-D", (/*event*/) => {
      // Turn on physics debugging to show player's hitbox
      this.physics.world.createDebugGraphic();

      // Create worldLayer collision graphic above the player, but below the help text
      // const graphics = this.add.graphics().setAlpha(0.75).setDepth(20);
      // worldLayer.renderDebug(graphics, {
      //   tileColor: null, // Color of non-colliding tiles
      //   collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
      //   faceColor: new Phaser.Display.Color(40, 39, 37, 255), // Color of colliding face edges
      // });
    });
  }

  update(time: number, delta: number) {
    this.world.world.tick({
      time,
      delta,
      scenes: [this],
      step: PhaserSceneMethod.update,
    });
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scene: [Scene],
};

/*const game = */ new Phaser.Game(config);
