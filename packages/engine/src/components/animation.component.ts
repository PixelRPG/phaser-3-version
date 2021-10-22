import { component, string, number } from "@javelin/ecs";

export const Animation = {
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
};

/**
 *
 */
export const AnimationComponent = component(Animation);
