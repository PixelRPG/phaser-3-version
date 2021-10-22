import { component, number } from "@javelin/ecs";
import { ComponentType, AlignPosition, AlignType } from "../types";
import { extend } from "../helper";

/**
 * TODO not used in any system yet
 * Set's the position of an entry relative to another entry.
 */
export const AlignPositionComponent = component({
  type: ComponentType.AlignPosition,
  schema: {
    type: { type: number, defaultValue: AlignType.In },
    toEntry: { type: number },
  },
  initialize(position, data: AlignPosition) {
    extend({ deep: true }, position, data);
  },
});
