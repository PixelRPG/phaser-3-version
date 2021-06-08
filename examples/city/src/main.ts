import { GameWorld, MenuWorld } from "./worlds";

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

config.scene = [];

const game = new Phaser.Game(config);
const menuWorld = new MenuWorld(config);
const gameWorld = new GameWorld(config);

game.scene.add(menuWorld.key, menuWorld);
game.scene.add(gameWorld.key, gameWorld);

game.scene.start("start-menu");
