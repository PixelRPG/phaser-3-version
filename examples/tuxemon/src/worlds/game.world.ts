import { createWorld, ComponentOf, component } from "@javelin/ecs";
import {
  WorldSceneData,
  Player,
  createAssetAtlasComponent,
  AssetMap,
  AssetTileset,
  Tileset,
  Position,
  Sprite,
  MapLayer,
  Animation,
  Velocity,
  Depth,
  Text,
  Scrollfactor,
  Collision,
  Debug,
  phaserSystem,
  mapObjectTopic,
  PhaserSceneWorld,
} from "@pixelrpg/engine";

export class GameWorld extends PhaserSceneWorld {
  key = "game";

  world = createWorld<WorldSceneData>({
    topics: [mapObjectTopic],
    systems: [phaserSystem],
  });

  spawnPlayer(playerData: ComponentOf<typeof Player>) {
    const playerAssetAtlasComponent = createAssetAtlasComponent({
      key: "tuxemon-misa",
      url: "./assets/atlas/tuxemon-misa/tuxemon-misa.png",
      xhrSettingsJsonUrl: "./assets/atlas/tuxemon-misa/tuxemon-misa.json",
    });
    // const playerAssetAtlasComponent = component(
    //   AssetAtlasComponent
    //   "tuxemon-misa",
    //   "./assets/atlas/tuxemon-misa/tuxemon-misa.png",
    //   "./assets/atlas/tuxemon-misa/tuxemon-misa.json"
    // );
    const playerSpriteComponent = component(Sprite, {
      key: "tuxemon-misa",
      frame: "misa-front",
      scale: { x: 1, y: 1 },
      size: { height: 15, width: 12 },
      offset: { x: 0, y: 20 },
    });

    const playerPositionComponent = component(Position);

    const playerVelocityComponent = component(Velocity, {
      speed: 70,
      vx: 0,
      vy: 0,
    });

    const playerCollisionVelocityComponent = component(Collision);

    const playerComponent = component(Player, playerData);

    const playerEntity = this.world.create(
      playerAssetAtlasComponent,
      playerSpriteComponent,
      playerPositionComponent,
      playerVelocityComponent,
      playerCollisionVelocityComponent,
      playerComponent
    );
    this.world.attach(playerEntity);

    return {
      playerEntity,
      playerAssetAtlasComponent,
      playerSpriteComponent,
      playerPositionComponent,
      playerVelocityComponent,
      playerCollisionVelocityComponent,
      playerComponent,
    };
  }

  spawnPlayerText(playerEntity: number, text: string) {
    // Help text that has a "fixed" position on the screen
    const textComponent = component(Text, {
      text: text,
      playerEntity: playerEntity,
      style: {
        font: "18px monospace",
        color: "#000000",
        padding: { x: 20, y: 10 } as any, // TODO
        backgroundColor: "#ffffff",
      } as any, // TODO,
    });
    const textPositionComponent = component(Position, {
      px: 16,
      py: 16,
    });
    const scrollfactorComponent = component(Scrollfactor, {
      sx: 0,
      sy: 0,
    });
    const textDepthComponent = component(Depth, {
      depth: 30,
    });
    const textEntry = this.world.create(
      textComponent,
      textPositionComponent,
      scrollfactorComponent,
      textDepthComponent
    );
    this.world.attach(textEntry);
  }

  constructor(config: Phaser.Types.Core.GameConfig) {
    super(config);

    // MAP

    const assetMapComponent = component(AssetMap, {
      key: "map",
      url: "./assets/tilemaps/tuxemon-town.json",
    });
    const assetMapEntity = this.world.create(assetMapComponent);
    this.world.attach(assetMapEntity);

    const assetTilesetComponent = component(AssetTileset, {
      key: "tiles",
      url: "./assets/tilesets/tuxemon-sample.png",
    });
    const tileSetEntity = this.world.create(assetTilesetComponent);
    this.world.attach(tileSetEntity);

    const tilesetComponent = component(Tileset, {
      key: "tiles",
      name: "tuxemon-sample",
      assetMapEntity: assetMapEntity,
    });
    const tilesetEntity = this.world.create(tilesetComponent);
    this.world.attach(tileSetEntity);

    const mapLayer1Component = component(MapLayer, {
      name: "Below Player",
      x: 0,
      y: 0,
      assetMapEntity,
      tilesetEntity,
    });
    const mapLayer1DepthComponent = component(Depth, {
      depth: -10,
    });
    const mapLayer1Entity = this.world.create(
      mapLayer1Component,
      mapLayer1DepthComponent
    );
    this.world.attach(mapLayer1Entity);

    const mapLayerWorldComponent = component(MapLayer, {
      name: "World",
      x: 0,
      y: 0,
      assetMapEntity,
      tilesetEntity,
      collides: true,
      collisionProperty: "collides",
    });
    const mapLayerWorldDepthComponent = component(Depth, {
      depth: 0,
    });
    const mapLayerWorldCollisionComponent = component(Collision);
    const mapLayerWorldEntity = this.world.create(
      mapLayerWorldComponent,
      mapLayerWorldDepthComponent,
      mapLayerWorldCollisionComponent
    );
    this.world.attach(mapLayerWorldEntity);

    const mapLayer3Component = component(MapLayer, {
      name: "Above Player",
      x: 0,
      y: 0,
      assetMapEntity,
      tilesetEntity,
    });
    const mapLayer3DepthComponent = component(Depth, { depth: 10 });
    const mapLayer3Entity = this.world.create(
      mapLayer3Component,
      mapLayer3DepthComponent
    );
    this.world.attach(mapLayer3Entity);

    // ANIMATIONS

    // Create the player's walking animations from the texture atlas. These are stored in the global
    // animation manager so any sprite can access them.
    const animationLeftWalk = component(Animation, {
      key: "misa-left-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-left-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    const animationLeftWalkEntity = this.world.create(animationLeftWalk);
    this.world.attach(animationLeftWalkEntity);

    const animationRightWalk = component(Animation, {
      key: "misa-right-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-right-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    const animationRightWalkEntity = this.world.create(animationRightWalk);
    this.world.attach(animationRightWalkEntity);

    const animationFrontWalk = component(Animation, {
      key: "misa-front-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-front-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    const animationFrontWalkEntity = this.world.create(animationFrontWalk);
    this.world.attach(animationFrontWalkEntity);

    const animationBackWalk = component(Animation, {
      key: "misa-back-walk",
      frames: {
        atlasKey: "tuxemon-misa",
        prefix: "misa-back-walk.",
        start: 0,
        end: 3,
        zeroPad: 3,
      },
      frameRate: 10,
      repeat: -1,
    });
    const animationBackWalkEntity = this.world.create(animationBackWalk);
    this.world.attach(animationBackWalkEntity);

    // PLAYER

    const { playerEntity: p1Entity } = this.spawnPlayer({
      name: "Player 1",
      playerNumber: 1,
    });
    const { playerEntity: p2Entity, playerComponent: p2Component } =
      this.spawnPlayer({ name: "Player 2", playerNumber: 2 });
    this.spawnPlayer({ name: "Player 3", playerNumber: 3 });
    this.spawnPlayer({ name: "Player 4", playerNumber: 4 });

    // TEXT

    this.spawnPlayerText(
      p1Entity,
      'Arrow keys to move\nPress "F1" to show hitboxes'
    );

    this.spawnPlayerText(p2Entity, p2Component.name);

    // Enable Debugging for this world
    const debugEntity = this.world.create(component(Debug));
    this.world.attach(debugEntity);
  }
}
