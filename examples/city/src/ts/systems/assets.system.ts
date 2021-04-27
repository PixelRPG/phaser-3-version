import { System } from "@javelin/ecs";
import { WorldGameData } from "../types";

import { phaserPreloadEffect, phaserTilesetEffect } from "../effects";

/**
 * Preload game assets
 */
export const assetsSystem: System<WorldGameData> = (world) => {
  phaserPreloadEffect();
  const phaserTileset = phaserTilesetEffect();
};
