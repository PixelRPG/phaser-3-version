import { component, number } from "@javelin/ecs";

export const Depth = {
  depth: number,
};

/**
 * Calles phaser's setDepth method on phaser Game Objects
 */
export const DepthComponent = component(Depth);
