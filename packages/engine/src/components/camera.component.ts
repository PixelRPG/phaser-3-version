import { createComponentType, number, boolean, string } from "@javelin/ecs";
import { ComponentType, Camera } from "../types";
import { extend } from "../helper";

/**
 *
 */
export const CameraComponent = createComponentType({
  type: ComponentType.Camera,
  schema: {
    name: { type: string, defaultValue: "" },
    isMain: { type: boolean, defaultValue: false },
    viewport: {
      x: { type: number, defaultValue: 0 },
      y: { type: number, defaultValue: 0 },
      width: number,
      height: number,
    },
    zoom: { type: number, defaultValue: 2 },
  },
  initialize(camera, data: Camera) {
    data.viewport.x = data.viewport.x || 0;
    data.viewport.y = data.viewport.y || 0;
    data.zoom = data.zoom || 2;
    extend({ deep: true }, camera, data);
  },
});
