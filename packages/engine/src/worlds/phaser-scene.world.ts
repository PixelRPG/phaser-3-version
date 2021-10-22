import { World, WorldSnapshot } from "@javelin/ecs";
import { WorldSceneData, PhaserSceneMethod } from "../types";

export abstract class PhaserSceneWorld extends Phaser.Scene {
  abstract world: World<WorldSceneData>;
  phaserGameConfig: Phaser.Types.Core.GameConfig;
  snapshot?: WorldSnapshot;

  constructor(phaserGameConfig: Phaser.Types.Core.GameConfig) {
    super(phaserGameConfig);
    this.phaserGameConfig = phaserGameConfig;
  }

  init() {
    this.world.step({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.init,
    });
  }

  preload() {
    this.world.step({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.preload,
    });
  }

  create() {
    this.world.step({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.create,
    });
  }

  update(time: number, delta: number) {
    this.world.step({
      time,
      delta,
      scene: this,
      step: PhaserSceneMethod.update,
    });
  }

  switch(key: string | PhaserSceneWorld) {
    this.snapshot = this.world.createSnapshot();
    super.scene.switch(key);
  }
}
