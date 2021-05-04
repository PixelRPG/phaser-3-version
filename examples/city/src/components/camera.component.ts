import { createComponentType, number, boolean, string } from "@javelin/ecs";
import { ComponentType, Camera } from "../types";
import { extend } from "@ribajs/utils";

/**
 *
 */
export const CameraComponent = createComponentType({
  type: ComponentType.Camera,
  schema: {
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
    width: number,
    height: number,
    name: { type: string, defaultValue: "" },
    isMain: { type: boolean, defaultValue: false },
  },
  initialize(camera, data: Camera) {
    extend({ deep: true }, camera, data);
  },
});
