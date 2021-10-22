import { component, number, string } from "@javelin/ecs";

export const Player = {
  name: string,
  playerNumber: number,
};

/**
 *
 */
export const PlayerComponent = component(Player);
