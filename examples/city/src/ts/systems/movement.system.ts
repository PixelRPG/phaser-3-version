import { System } from "@javelin/ecs";

/**
 * Transform controller input to movement actions
 */
export const movementSystem: System<any> = (world) => {
  console.debug("movementSystem: currentTickData", world.state.currentTickData);
};
