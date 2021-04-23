import { System } from "@javelin/ecs";

/**
 * Render game map
 */
export const renderMapSystem: System<any> = (world) => {
  console.debug("renderMapSystem: world", world);
};
