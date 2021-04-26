import { createWorld } from "@javelin/ecs";
import { WorldGameData } from "../types";
import { EntryService } from "../services";
import { PlayerEntry } from "../entries";
import {
  assetsSystem,
  movementSystem,
  pickupsSystem,
  renderMapSystem,
  renderUiSystem,
} from "../systems";

const gameWorld = createWorld<WorldGameData>({
  systems: [
    () => {
      /*console.log("Tick!")*/
    },
  ],
});

gameWorld.addSystem(assetsSystem);
gameWorld.addSystem(movementSystem);
gameWorld.addSystem(pickupsSystem);
gameWorld.addSystem(renderMapSystem);
gameWorld.addSystem(renderUiSystem);

gameWorld.spawn(...EntryService.create(gameWorld, PlayerEntry));

export { gameWorld };
