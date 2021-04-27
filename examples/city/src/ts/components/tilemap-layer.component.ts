import { createComponentType, boolean, number, string } from "@javelin/ecs";
import { ComponentType, TilemapLayer } from "../types";

/**
 *
 */
export const TilemapLayerComponent = createComponentType({
  type: ComponentType.TilemapLayer,
  schema: {
    name: string,
    collides: boolean,
    x: number,
    y: number,
    depth: number,
  },
  initialize(tilemapLayer, data: TilemapLayer) {
    tilemapLayer.name = data.name;
    tilemapLayer.collides = data.collides || false;
    tilemapLayer.depth = data.depth || 0;
    tilemapLayer.x = data.x || 0;
    tilemapLayer.y = data.y || 0;
  },
});
