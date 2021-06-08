import { createWorld } from "@javelin/ecs";
import {
  WorldSceneData,
  phaserSystem,
  PhaserSceneWorld,
  TextComponent,
  PositionComponent,
  DepthComponent,
} from "@pixelrpg/engine";

export class MenuWorld extends PhaserSceneWorld {
  key = "start-menu";

  world = createWorld<WorldSceneData>({
    topics: [],
    systems: [phaserSystem],
  });

  spawnMenuText(text: string) {
    // Help text that has a "fixed" position on the screen
    const textComponent = this.world.component(TextComponent, {
      text: text,
      style: {
        font: "18px monospace",
        color: "#ffffff",
        padding: { x: 20, y: 10 },
        // backgroundColor: "#ffffff",
      },
    });
    const textPositionComponent = this.world.component(PositionComponent, {
      x: 16,
      y: 16,
    });
    // const scrollfactorComponent = this.world.component(ScrollfactorComponent, {
    //   x: 0,
    //   y: 0,
    // });
    const textDepthComponent = this.world.component(DepthComponent, 30);
    this.world.spawn(
      textComponent,
      textPositionComponent,
      //scrollfactorComponent,
      textDepthComponent
    );
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.spawnMenuText("Hello World");
  }

  override create() {
    super.create();

    // see https://labs.phaser.io/edit.html?src=src/physics/matterjs/restart%20physics%20scene.js&v=3.55.2
    const bg = this.add.image(0, 0, "buttonBG");
    const text = this.add.image(0, 0, "buttonText");

    this.add.container(400, 300, [bg, text]);

    bg.setInteractive();

    bg.once(
      "pointerup",
      () => {
        this.scene.start("game");
      },
      this
    );
  }
}
