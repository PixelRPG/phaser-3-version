import { component, number } from "@javelin/ecs";
import { ComponentType } from "../types";

/**
 * Calles phaser's setDepth method on phaser Game Objects
 */
export const DepthComponent = component({
  type: ComponentType.Depth,
  schema: {
    depth: { type: number, defaultValue: 0 },
  },
  initialize(atlas, depth = 0) {
    atlas.depth = depth;
  },
});
