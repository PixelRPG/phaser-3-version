import { component } from "@javelin/ecs";
import { ComponentType, Debug } from "../types";
import { extend } from "../helper";

/**
 * Add this component to any entry or world for which you want to enable debugging
 */
export const DebugComponent = component({
  type: ComponentType.Debug,
  schema: {},
  initialize(debug, data: Debug = {}) {
    extend({ deep: true }, debug, data);
  },
});
