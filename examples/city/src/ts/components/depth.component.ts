import { createComponentType, number } from "@javelin/ecs";
import { ComponentType } from "../types";

/**
 * Calles phaser's setDepth method on phaser Game Objects
 */
export const DepthComponent = createComponentType({
  type: ComponentType.Depth,
  schema: {
    depth: { type: number, defaultValue: 0 },
  },
  initialize(atlas, depth = 0) {
    atlas.depth = depth;
  },
});
