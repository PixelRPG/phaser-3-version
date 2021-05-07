import { ComponentProps } from "@javelin/ecs";
import { Coordinates2D } from "./coordinates-2d";

export interface Position extends Coordinates2D, ComponentProps {}
