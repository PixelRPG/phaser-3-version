import { ComponentProps } from "@javelin/ecs";

export interface Camera extends ComponentProps {
  followEntry?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  name?: string;
  isMain?: boolean;
}
