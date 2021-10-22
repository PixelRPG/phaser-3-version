import { component } from "@javelin/ecs";
import { ComponentType } from "../types";

/**
 * Collision Component
 * - In combination with velocity (e.g. sprites, player and other phaser game objects) this is used to set the collision for velocities
 * - In combination with map layers this is used to set the collision layer
 */
export const CollisionComponent = component({
  type: ComponentType.Collision,
  schema: {},
  // initialize(mapLayer, data: Collision) {},
});
