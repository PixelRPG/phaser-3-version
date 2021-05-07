import { ComponentProps } from "@javelin/ecs";

export interface Velocity extends ComponentProps {
  speed: number;
  x: number;
  y: number;
}
