import { component, boolean } from "@javelin/ecs";

export const Debug = {
  debug: boolean,
};

/**
 * Add this component to any entry or world for which you want to enable debugging
 */
export const DebugComponent = component(Debug, { debug: true });
