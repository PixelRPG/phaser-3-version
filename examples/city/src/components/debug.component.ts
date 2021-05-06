import { createComponentType } from "@javelin/ecs";
import { ComponentType, Debug } from "../types";
import { extend } from "@ribajs/utils";

/**
 * Add this component to any entry or world for which you want to enable debugging
 */
export const DebugComponent = createComponentType({
  type: ComponentType.Debug,
  schema: {},
  initialize(debug, data: Debug = {}) {
    extend({ deep: true }, debug, data);
  },
});
