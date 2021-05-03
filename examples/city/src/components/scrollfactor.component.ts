import { createComponentType, number } from "@javelin/ecs";
import { ComponentType, Scrollfactor } from "../types";
import { extend } from "@ribajs/utils";

/**
 * Sets the scroll factor of a entry Game Object.
 * The scroll factor controls the influence of the movement of a Camera upon this Game Object.
 * When a camera scrolls it will change the location at which this Game Object is rendered on-screen. It does not change the Game Objects actual position values.
 * A value of 1 means it will move exactly in sync with a camera. A value of 0 means it will not move at all, even if the camera moves. Other values control the degree to which the camera movement is mapped to this Game Object.
 * Please be aware that scroll factor values other than 1 are not taken in to consideration when calculating physics collisions. Bodies always collide based on their world position, but changing the scroll factor is a visual adjustment to where the textures are rendered, which can offset them from physics bodies if not accounted for in your code.
 */
export const ScrollfactorComponent = createComponentType({
  type: ComponentType.Scrollfactor,
  schema: {
    x: { type: number, defaultValue: 1 },
    y: { type: number, defaultValue: 1 },
  },
  initialize(scrollfactor, data: Scrollfactor) {
    extend({ deep: true }, scrollfactor, data);
  },
});