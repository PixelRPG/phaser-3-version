import { component, boolean } from "@javelin/ecs";

export const Collision = {
  collision: boolean,
};

/**
 * Collision Component
 * - In combination with velocity (e.g. sprites, player and other phaser game objects) this is used to set the collision for velocities
 * - In combination with map layers this is used to set the collision layer
 */
export const CollisionComponent = component(Collision, { collision: true });
