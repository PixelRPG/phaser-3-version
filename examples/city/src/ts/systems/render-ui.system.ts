import { System } from "@javelin/ecs";

/**
 * Render user interface
 */
export const renderUiSystem: System<any> = (world) => {
  console.debug("renderUiSystem: world", world);
};
