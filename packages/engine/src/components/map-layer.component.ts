import { component, boolean, number, string } from "@javelin/ecs";

export const MapLayer = {
  name: string,
  x: number,
  y: number,
  assetMapEntity: number,
  tilesetEntity: number,
  collides: boolean,
  collisionProperty: string,
};

/**
 *
 */
export const MapLayerComponent = component(MapLayer);
