import { PhaserSceneMethod } from "./phaser-scene-method";
import { PhaserSceneWorld } from "../worlds/phaser-scene.world";

export type WorldSceneData = {
  time: number;
  delta: number;
  scene: PhaserSceneWorld;
  step: PhaserSceneMethod;
};
