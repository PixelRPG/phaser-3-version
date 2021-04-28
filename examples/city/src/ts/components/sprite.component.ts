import { createComponentType, string, number } from "@javelin/ecs";
import { ComponentType, Sprite } from "../types";

/**
 *
 */
export const SpriteComponent = createComponentType({
  type: ComponentType.Sprite,
  schema: {
    key: string,
    frame: string,
    // position: {
    //   x: { type: number, defaultValue: 0 },
    //   y: { type: number, defaultValue: 0 },
    // },
    scale: {
      x: { type: number, defaultValue: 1 },
      y: { type: number, defaultValue: 1 },
    },
    size: {
      width: number,
      height: number,
    },
    offset: {
      x: { type: number, defaultValue: 0 },
      y: { type: number, defaultValue: 0 },
    },
  },
  initialize(sprite, data: Sprite) {
    sprite.key = data.key;
    if (data.frame) {
      sprite.frame = data.frame;
    }
    // if (data.position) {
    //   sprite.position = data.position;
    // }
    if (data.scale) {
      sprite.scale = data.scale;
    }
    if (data.size) {
      sprite.size = data.size;
    }
    if (data.offset) {
      sprite.offset = data.offset;
    }
  },
});
