import { component, number } from "@javelin/ecs";
import { ComponentType, Position } from "../types";
import { extend } from "../helper";

/**
 * Set's the position of an entry directly.
 * If you want to align an entry to another one use the AlignPositionComponent instead.
 */
export const PositionComponent = component({
  type: ComponentType.Position,
  schema: {
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
  },
  initialize(position, data: Position = { x: 0, y: 0 }) {
    extend({ deep: true }, position, data);
  },
});
