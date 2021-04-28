import { createComponentType, boolean, number, string } from "@javelin/ecs";
import { ComponentType, MapLayer } from "../types";

/**
 *
 */
export const MapLayerComponent = createComponentType({
  type: ComponentType.MapLayer,
  schema: {
    name: string,
    collides: boolean,
    x: number,
    y: number,
    depth: number,
    assetMapEntry: number,
    tilesetEntry: number,
  },
  initialize(mapLayer, data: MapLayer) {
    mapLayer.name = data.name;
    mapLayer.collides = data.collides || false;
    mapLayer.depth = data.depth || 0;
    mapLayer.x = data.x || 0;
    mapLayer.y = data.y || 0;
    mapLayer.assetMapEntry = data.assetMapEntry;
    mapLayer.tilesetEntry = data.tilesetEntry;
  },
});
