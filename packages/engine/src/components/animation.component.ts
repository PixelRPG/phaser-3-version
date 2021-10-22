import { component, string, number } from "@javelin/ecs";
import { ComponentType, Animation } from "../types";

/**
 *
 */
export const AnimationComponent = component({
  type: ComponentType.Animation,
  schema: {
    key: string,
    frames: {
      atlasKey: string,
      prefix: string,
      start: number,
      end: number,
      zeroPad: number,
    },
    frameRate: number,
    repeat: number,
  },
  initialize(animation, data: Animation) {
    animation.key = data.key;
    animation.frames = data.frames;
    animation.frameRate = data.frameRate;
    animation.repeat = data.repeat;
  },
});
