import { component, number } from "@javelin/ecs";

export const AlignPosition = {
  type: number,
  toEntry: number,
};

/**
 * TODO not used in any system yet
 * Set's the position of an entry relative to another entry.
 */
export const AlignPositionComponent = component(AlignPosition);
