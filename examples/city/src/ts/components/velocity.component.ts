import { createComponentType, number } from "@javelin/ecs";
import { ComponentType, Velocity } from "../types";

/**
 *
 */
export const VelocityComponent = createComponentType({
  type: ComponentType.Velocity,
  schema: {
    speed: number,
  },
  initialize(velocity, data: Velocity) {
    velocity.speed = data.speed;
  },
});
