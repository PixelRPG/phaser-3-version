import { createComponentType, boolean, number, string } from "@javelin/ecs";
import { ComponentType, MapLayer } from "../types";

/**
 *
 */
export const MapLayerComponent = createComponentType({
  type: ComponentType.MapLayer,
  schema: {
    name: string,
    x: number,
    y: number,
    assetMapEntry: number,
    tilesetEntry: number,
    collides: boolean,
    collisionProperty: string,
  },
  initialize(mapLayer, data: MapLayer) {
    mapLayer.name = data.name;
    mapLayer.x = data.x || 0;
    mapLayer.y = data.y || 0;
    mapLayer.assetMapEntry = data.assetMapEntry;
    mapLayer.tilesetEntry = data.tilesetEntry;
  },
});
