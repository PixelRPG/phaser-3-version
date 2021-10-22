import { component, boolean, number, string } from "@javelin/ecs";
import { ComponentType, MapLayer } from "../types";
import { extend } from "../helper";

/**
 *
 */
export const MapLayerComponent = component({
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
