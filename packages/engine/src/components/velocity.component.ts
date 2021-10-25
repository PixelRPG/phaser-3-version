import { component, number } from "@javelin/ecs";

export const Velocity = {
  speed: number,
  vx: number,
  vy: number
}

/**
 *
 */
export const VelocityComponent = component(Velocity);
