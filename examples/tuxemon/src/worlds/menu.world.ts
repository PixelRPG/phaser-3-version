import { createWorld, component } from "@javelin/ecs";
import {
  WorldSceneData,
  phaserSystem,
  PhaserSceneWorld,
  Text,
  Position,
  Depth,
} from "@pixelrpg/engine";

export class MenuWorld extends PhaserSceneWorld {
  key = "start-menu";

  world = createWorld<WorldSceneData>({
    topics: [],
    systems: [phaserSystem],
  });

  spawnMenuText(text: string) {
    // Help text that has a "fixed" position on the screen
    const textComponent = component(Text, {
      text: text,
      style: {
        font: "18px monospace",
        color: "#ffffff",
        padding: { x: 20, y: 10 } as any, // TODO
        // backgroundColor: "#ffffff",
      } as any, // TODO
    });
    const textPositionComponent = component(Position, {
      x: 16,
      y: 16,
    });
    // const scrollfactorComponent = component(ScrollfactorComponent, {
    //   x: 0,
    //   y: 0,
    // });
    const textDepthComponent = component(Depth, { depth: 30 });
    const depthEntity = this.world.create(
      textComponent,
      textPositionComponent,
      //scrollfactorComponent,
      textDepthComponent
    );
    this.world.attach(depthEntity);
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    this.spawnMenuText("Hello World");
  }

  override create() {
    super.create();

    // TODO convert to entries / components
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
