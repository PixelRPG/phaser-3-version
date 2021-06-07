import { GameWorld } from "./worlds";

import "phaser";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
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

config.scene = [new GameWorld(config)];

/*const game = */ new Phaser.Game(config);
