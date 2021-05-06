import { createComponentType, boolean, number, string } from "@javelin/ecs";
import { ComponentType, MapLayer } from "../types";
import { extend } from "@ribajs/utils";

/**
 *
 */
export const MapLayerComponent = createComponentType({
  type: ComponentType.MapLayer,
  schema: {
    name: string,
    x: { type: number, defaultValue: 0 },
    y: { type: number, defaultValue: 0 },
    assetMapEntity: number,
    tilesetEntity: number,
    collides: boolean,
    collisionProperty: string,
  },
  initialize(mapLayer, data: MapLayer) {
    data.x = data.x || 0;
    data.y = data.y || 0;
    extend({ deep: true }, mapLayer, data);
  },
});
