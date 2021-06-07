import { World } from "@javelin/ecs";
import { WorldSceneData, PhaserSceneMethod } from "../types";

export abstract class PhaserSceneWorld extends Phaser.Scene {
  abstract world: World<WorldSceneData>;
  phaserGameConfig: Phaser.Types.Core.GameConfig;

  constructor(phaserGameConfig: Phaser.Types.Core.GameConfig) {
    super(phaserGameConfig);
    this.phaserGameConfig = phaserGameConfig;
  }

  init() {
    this.world.tick({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.init,
    });
  }

  preload() {
    this.world.tick({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.preload,
    });
  }

  create() {
    this.world.tick({
      time: 0,
      delta: 0,
      scene: this,
      step: PhaserSceneMethod.create,
    });
  }

  update(time: number, delta: number) {
    this.world.tick({
      time,
      delta,
      scene: this,
      step: PhaserSceneMethod.update,
    });
  }
}
