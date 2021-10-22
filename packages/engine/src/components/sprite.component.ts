import { component, string, number } from "@javelin/ecs";

export const Sprite = {
  key: string,
    frame: string,
    // position: {
    //   x: number,
    //   y: number,
    // },
    scale: {
      x: number,
      y: number,
    },
    size: {
      width: number,
      height: number,
    },
    offset: {
      x: number,
      y: number,
    },
};

/**
 *
 */
export const SpriteComponent = component(Sprite);
