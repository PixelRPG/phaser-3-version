import { createComponentType, number } from "@javelin/ecs";
import { ComponentType } from "../types";

/**
 *
 */
export const PositionComponent = createComponentType({
  type: ComponentType.Position,
  schema: {
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
  },
  initialize(position, x = 0, y = 0) {
    position.x = x;
    position.y = y;
  },
});
