import { PhaserSceneMethod } from "./phaser-scene-method";

export type WorldGameData = {
  time: number;
  delta: number;
  scenes: Phaser.Scene[];
  step: PhaserSceneMethod;
};
