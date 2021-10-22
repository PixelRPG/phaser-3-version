import { component, number } from "@javelin/ecs";
import { ComponentType, Velocity } from "../types";

/**
 *
 */
export const VelocityComponent = component({
  type: ComponentType.Velocity,
  schema: {
    speed: { type: number, defaultValue: 0 },
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
  },
  initialize(velocity, data: Velocity) {
    velocity.speed = data.speed;
    velocity.x = data.x;
    velocity.y = data.y;
  },
});
