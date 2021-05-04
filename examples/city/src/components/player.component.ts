import { createComponentType,string } from "@javelin/ecs";
import { ComponentType, Player } from "../types";

/**
 *
 */
export const PlayerComponent = createComponentType({
  type: ComponentType.Player,
  schema: {
    name: string,
  },
  initialize(player, data: Player) {
    player.name = data.name;
  },
});
