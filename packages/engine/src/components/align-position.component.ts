import { createComponentType, number } from "@javelin/ecs";
import { ComponentType, AlignPosition } from "../types";
import { extend } from "../helper";

/**
 * Set's the position of an entry directly
 */
export const AlignPositionComponent = createComponentType({
  type: ComponentType.AlignPosition,
  schema: {
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
  },
  initialize(position, data: AlignPosition) {
    extend({ deep: true }, position, data);
  },
});
