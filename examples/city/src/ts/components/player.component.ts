import { createComponentType } from "@javelin/ecs";
import { ComponentType } from "../types";

/**
 *
 */
export const PlayerComponent = createComponentType({
  type: ComponentType.Player,
  schema: {},
  // initialize(position) {},
});
