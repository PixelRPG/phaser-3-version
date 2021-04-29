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

const mapLayerComponent1 = gameWorld.component(MapLayerComponent, {
  name: "Below Player",
  x: 0,
  y: 0,
  depth: -10,
  assetMapEntry,
  tilesetEntry,
});
gameWorld.spawn(mapLayerComponent1);

const mapLayerComponent2 = gameWorld.component(MapLayerComponent, {
  name: "World",
  x: 0,
  y: 0,
  depth: 0,
  collides: true,
  assetMapEntry,
  tilesetEntry,
});
gameWorld.spawn(mapLayerComponent2);

const mapLayerComponent3 = gameWorld.component(MapLayerComponent, {
  name: "Above Player",
  x: 0,
  y: 0,
  depth: 10,
  assetMapEntry,
  tilesetEntry,
});
gameWorld.spawn(mapLayerComponent3);

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

const playerComponent = gameWorld.component(PlayerComponent);

const playerEntry = gameWorld.spawn(
  playerAssetAtlasComponent,
  playerSpriteComponent,
  playerPositionComponent,
  playerComponent
);

const cameraComponent = gameWorld.component(CameraComponent, {
  followEntry: playerEntry,
  isMain: false,
});
gameWorld.spawn(cameraComponent);

// const camera = this.cameras.add();
// camera.startFollow(player);
// camera.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

export { gameWorld };
