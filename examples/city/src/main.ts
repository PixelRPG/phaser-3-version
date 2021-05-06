import { PhaserSceneMethod } from "./types";
import { GameWorld } from "./worlds";

import "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  // width: 800,
  // height: 600,
  parent: "game-container",
  pixelArt: true,
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 0 },
    },
  },
  scale: {
    mode: Phaser.Scale.RESIZE,
  },
  scene: [],
};
class Scene extends Phaser.Scene {
  world = new GameWorld();

  // constructor() {}

  init() {
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      phaserGameConfig: config,
      step: PhaserSceneMethod.init,
    });
  }

  preload() {
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      phaserGameConfig: config,
      step: PhaserSceneMethod.preload,
    });
  }

  create() {
    this.world.world.tick({
      time: 0,
      delta: 0,
      scenes: [this],
      phaserGameConfig: config,
      step: PhaserSceneMethod.create,
    });
  }

  update(time: number, delta: number) {
    this.world.world.tick({
      time,
      delta,
      scenes: [this],
      phaserGameConfig: config,
      step: PhaserSceneMethod.update,
    });
  }
}

config.scene = [Scene];

/*const game = */ new Phaser.Game(config);
