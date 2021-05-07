import { createComponentType, number, string } from "@javelin/ecs";
import { ComponentType, Player } from "../types";
import { extend } from "@ribajs/utils";

/**
 *
 */
export const PlayerComponent = createComponentType({
  type: ComponentType.Player,
  schema: {
    name: string,
    playerNumber: number,
  },
  initialize(player, data: Player) {
    extend({ deep: true }, player, data);
  },
});
