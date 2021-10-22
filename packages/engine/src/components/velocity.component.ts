import { component, number } from "@javelin/ecs";

export const Velocity = {
  speed: number,
  x: number,
  y: number
}

/**
 *
 */
export const VelocityComponent = component(Velocity);
