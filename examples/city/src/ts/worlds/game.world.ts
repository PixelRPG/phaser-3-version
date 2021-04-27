import { createWorld } from "@javelin/ecs";
import { WorldGameData } from "../types";
// import { EntryService } from "../services";
import {
  AssetAtlasComponent,
  AssetTilemapComponent,
  PositionComponent,
  PlayerComponent,
  BodyComponent,
} from "../components";
import {
  assetsSystem,
  movementSystem,
  pickupsSystem,
  renderMapSystem,
  renderUiSystem,
} from "../systems";
// import { PlayerEntry } from "../entries";

const gameWorld = createWorld<WorldGameData>({
  systems: [
    () => {
      /*console.log("Tick!")*/
    },
  ],
});

// const tilesetImageComponent = gameWorld.component(AssetTilesetsComponent, [
//   {
//     key: "tiles",
//     url: "./assets/tilesets/tuxmon-sample-32px-extruded.png",
//     name: "tuxmon-sample-32px-extruded",
//   },
// ]);

const assetTilemapComponent = gameWorld.component(
  AssetTilemapComponent,
  {
    key: "map",
    url: "./assets/tilemaps/tuxemon-town.json",
  },
  [
    {
      key: "tiles",
      url: "./assets/tilesets/tuxmon-sample-32px-extruded.png",
      name: "tuxmon-sample-32px-extruded",
    },
  ]
);

const mapEntry = gameWorld.spawn(assetTilemapComponent);

const playerAssetAtlasComponent = gameWorld.component(
  AssetAtlasComponent,
  "tuxemon-misa",
  "./assets/atlas/tuxemon-misa/tuxemon-misa.png",
  "./assets/atlas/tuxemon-misa/tuxemon-misa.json"
);
const playerBodyComponent = gameWorld.component(
  BodyComponent,
  { x: 2, y: 2 },
  { height: 15, width: 12 },
  { x: 0, y: 20 }
);
const playerComponent = gameWorld.component(PlayerComponent);

const playerEntry = gameWorld.spawn(
  playerAssetAtlasComponent,
  playerBodyComponent,
  playerComponent
);

gameWorld.addSystem(assetsSystem);
gameWorld.addSystem(movementSystem);
gameWorld.addSystem(pickupsSystem);
gameWorld.addSystem(renderMapSystem);
gameWorld.addSystem(renderUiSystem);

// const player = gameWorld.spawn(
//   ...EntryService.create(gameWorld, [PlayerEntry])
// );

export { gameWorld };
