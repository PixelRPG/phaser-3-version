import { component, number, string } from "@javelin/ecs";
import { Schema } from "@javelin/core";
import { Tileset } from "../types";

/**
 * The tileset image used in tiledmaps
 */
export const TilesetComponent = component<Tileset & Schema>({
  key: number,
  name: string,
  assetMapEntity: number,
});
