import { createComponentType, number } from "@javelin/ecs";
import { ComponentType, Coordinates2D, Size } from "../types";

/**
 *
 */
export const BodyComponent = createComponentType({
  type: ComponentType.Body,
  schema: {
    scale: {
      x: { type: number, defaultValue: 1 },
      y: { type: number, defaultValue: 1 },
    },
    size: {
      width: number,
      height: number,
    },
    offset: {
      x: { type: number, defaultValue: 0 },
      y: { type: number, defaultValue: 0 },
    },
  },
  initialize(body, scale: Coordinates2D, size: Size, offset: Coordinates2D) {
    body.scale = scale;
    body.size = size;
    body.offset = offset;
  },
});
