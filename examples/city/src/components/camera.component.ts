import { createComponentType, number, boolean, string } from "@javelin/ecs";
import { ComponentType, Camera } from "../types";

/**
 *
 */
export const CameraComponent = createComponentType({
  type: ComponentType.Camera,
  schema: {
    followEntry: number,
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
    width: number,
    height: number,
    name: { type: string, defaultValue: "" },
    isMain: { type: boolean, defaultValue: false },
  },
  initialize(camera, data: Camera) {
    if (data.followEntry) {
      camera.followEntry = data.followEntry;
    }
    if (data.x) {
      camera.x = data.x;
    }
    if (data.y) {
      camera.y = data.y;
    }
    if (data.width) {
      camera.width = data.width;
    }
    if (data.height) {
      camera.height = data.height;
    }
    if (data.name) {
      camera.name = data.name;
    }
    if (data.isMain) {
      camera.isMain = data.isMain;
    }
  },
});
