import { createWorld } from "@javelin/ecs";
import { WorldGameData } from "../types";
import {
  AssetAtlasComponent,
  AssetMapComponent,
  AssetTilesetComponent,
  TilesetComponent,
  PlayerComponent,
  PositionComponent,
  SpriteComponent,
  MapLayerComponent,
  AnimationComponent,
  CameraComponent,
  VelocityComponent,
  DepthComponent,
  TextComponent,
  ScrollfactorComponent,
} from "../components";
import {
  phaserSystem,
  movementSystem,
  pickupsSystem,
  renderMapSystem,
  renderUiSystem,
} from "../systems";
import { mapObjectTopic } from "../topics";

const gameWorld = createWorld<WorldGameData>({
  topics: [mapObjectTopic],
  systems: [
    phaserSystem,
    movementSystem,
    pickupsSystem,
    renderMapSystem,
    renderUiSystem,
  ],
});

// MAP

const assetMapComponent = gameWorld.component(AssetMapComponent, {
  key: "map",
  url: "./assets/tilemaps/tuxemon-town.json",
});
const assetMapEntry = gameWorld.spawn(assetMapComponent);

const assetTilesetComponent = gameWorld.component(AssetTilesetComponent, {
  key: "tiles",
  url: "./assets/tilesets/tuxmon-sample-32px-extruded.png",
});
gameWorld.spawn(assetTilesetComponent);

const tilesetComponent = gameWorld.component(TilesetComponent, {
  key: "tiles",
  name: "tuxmon-sample-32px-extruded",
  assetMapEntry: assetMapEntry,
});
const tilesetEntry = gameWorld.spawn(tilesetComponent);

const mapLayer1Component = gameWorld.component(MapLayerComponent, {
  name: "Below Player",
  x: 0,
  y: 0,
  depth: -10,
  assetMapEntry,
  tilesetEntry,
});
const mapLayer1DepthComponent = gameWorld.component(DepthComponent, -10);
gameWorld.spawn(mapLayer1Component, mapLayer1DepthComponent);

const mapLayer2Component = gameWorld.component(MapLayerComponent, {
  name: "World",
  x: 0,
  y: 0,
  depth: 0,
  collides: true,
  assetMapEntry,
  tilesetEntry,
});
const mapLayer2DepthComponent = gameWorld.component(DepthComponent, 0);
gameWorld.spawn(mapLayer2Component, mapLayer2DepthComponent);

const mapLayer3Component = gameWorld.component(MapLayerComponent, {
  name: "Above Player",
  x: 0,
  y: 0,
  depth: 10,
  assetMapEntry,
  tilesetEntry,
});
const mapLayer3DepthComponent = gameWorld.component(DepthComponent, 10);
gameWorld.spawn(mapLayer3Component, mapLayer3DepthComponent);

// ANIMATIONS

// Create the player's walking animations from the texture atlas. These are stored in the global
// animation manager so any sprite can access them.
const animationLeftWalk = gameWorld.component(AnimationComponent, {
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
gameWorld.spawn(animationLeftWalk);

const animationRightWalk = gameWorld.component(AnimationComponent, {
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
gameWorld.spawn(animationRightWalk);

const animationFrontWalk = gameWorld.component(AnimationComponent, {
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
gameWorld.spawn(animationFrontWalk);

const animationBackWalk = gameWorld.component(AnimationComponent, {
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
gameWorld.spawn(animationBackWalk);

// PLAYER

const playerAssetAtlasComponent = gameWorld.component(
  AssetAtlasComponent,
  "tuxemon-misa",
  "./assets/atlas/tuxemon-misa/tuxemon-misa.png",
  "./assets/atlas/tuxemon-misa/tuxemon-misa.json"
);
const playerSpriteComponent = gameWorld.component(SpriteComponent, {
  key: "tuxemon-misa",
  frame: "misa-front",
  scale: { x: 2, y: 2 },
  size: { height: 15, width: 12 },
  offset: { x: 0, y: 20 },
});

const playerPositionComponent = gameWorld.component(PositionComponent);

const playerVelocityComponent = gameWorld.component(VelocityComponent, {
  speed: 175,
  x: 0,
  y: 0,
});

const playerComponent = gameWorld.component(PlayerComponent);

const playerEntry = gameWorld.spawn(
  playerAssetAtlasComponent,
  playerSpriteComponent,
  playerPositionComponent,
  playerVelocityComponent,
  playerComponent
);

// CAMERA

const cameraComponent = gameWorld.component(CameraComponent, {
  followEntry: playerEntry,
  isMain: true,
});
gameWorld.spawn(cameraComponent);

// TEXT

// Help text that has a "fixed" position on the screen
const textComponent = gameWorld.component(TextComponent, {
  text: 'Arrow keys to move\nPress "D" to show hitboxes',
  style: {
    font: "18px monospace",
    color: "#000000",
    padding: { x: 20, y: 10 },
    backgroundColor: "#ffffff",
  },
});
const textPositionComponent = gameWorld.component(PositionComponent, 16, 16);
const scrollfactorComponent = gameWorld.component(ScrollfactorComponent, {
  x: 0,
  y: 0,
});
const textDepthComponent = gameWorld.component(DepthComponent, 30);
gameWorld.spawn(
  textComponent,
  textPositionComponent,
  scrollfactorComponent,
  textDepthComponent
);

// this.add
//   .text(16, 16, 'Arrow keys to move\nPress "D" to show hitboxes', {
//     font: "18px monospace",
//     color: "#000000",
//     padding: { x: 20, y: 10 },
//     backgroundColor: "#ffffff",
//   })
//   .setScrollFactor(0)
//   .setDepth(30);

export { gameWorld };
